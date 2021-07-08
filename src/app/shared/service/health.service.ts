import {Inject, Injectable} from '@angular/core';
import {Api} from "../api";
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";
import {map} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {RequestUtils} from "../request/request-utils";
import {ToastService} from "./toast.service";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private downTimer?: Subscription;
  private upTimer?: Subscription;
  private static HEALTH_URI = "/manage/health"
  private readonly _healthy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  readonly healthy$: Observable<boolean> = this._healthy$.asObservable()
  currentHealth: boolean = true

  private static DOWN_PERIOD = 3000
  private static UP_PERIOD = 30000

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly toastService: ToastService,
  ) { }

  private isHealthy(): Observable<boolean> {
    return this.api.json(HealthService.HEALTH_URI, new HttpParams(), RequestUtils.hideLoadingHeader())
      .pipe(map(it => it["status"] == "UP"))
  }

  clearDownTimer() {
    if(this.downTimer !== undefined) {
      this.log.debug("Clearing DOWN timer")
      this.downTimer?.unsubscribe()
      this.downTimer = undefined
    }
  }

  clearUpTimer() {
    if(this.upTimer !== undefined) {
      this.log.debug("Clearing UP timer")
      this.upTimer?.unsubscribe()
      this.upTimer = undefined
    }
  }

  healthCheck() {
    let successHandler = (it: boolean) => {
      if(!this.currentHealth) {
        this.toastService.success("Server is UP and Running", "UP")
        window.location.reload()
      }
      this.currentHealth = it
      this.clearDownTimer()
      this._healthy$.next(it)

      if(this.upTimer === undefined) {
        this.log.info("Creating UP Timer")
        this.upTimer = timer(0, HealthService.UP_PERIOD)
          .subscribe(() => {
            this.isHealthy()
              .subscribe(successHandler, errorHandler)
          });
      }
    };

    let errorHandler = () => {
      if(this.currentHealth) {
        this.toastService.error("Server is DOWN Please wait for the green light and the refresh the page", "DOWN")
      }
      this.currentHealth = false
      this.clearUpTimer()
      this._healthy$.next(false)

      if(this.downTimer === undefined) {
        this.log.info("Creating DOWN Timer")
        this.downTimer = timer(0, HealthService.DOWN_PERIOD)
          .subscribe(() => {
            this.isHealthy()
              .subscribe(successHandler, errorHandler)
          });
      }
    };

    this.isHealthy()
      .subscribe(successHandler, errorHandler)
  }
}
