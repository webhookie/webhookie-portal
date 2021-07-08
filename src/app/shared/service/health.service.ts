import {Inject, Injectable} from '@angular/core';
import {Api} from "../api";
import {BehaviorSubject, Observable, Subscription, timer} from "rxjs";
import {map} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {RequestUtils} from "../request/request-utils";
import {ToastService} from "./toast.service";
import {LogService} from "./log.service";
import {HealthResult} from "../model/health-result";
import {HealthResultAdapter} from "../adapter/health-result.adapter";

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

  private readonly _healthResult$: BehaviorSubject<HealthResult> = new BehaviorSubject<HealthResult>(HealthResult.down())
  readonly downReason: Observable<string> = this._healthResult$
    .pipe(map(it => it.reason()))

  private static DOWN_PERIOD = 3000
  private static UP_PERIOD = 30000

  constructor(
    @Inject("Api") private readonly api: Api,
    private readonly log: LogService,
    private readonly toastService: ToastService,
    private readonly adapter: HealthResultAdapter
  ) { }

  private readHealth(): Observable<any> {
    return this.api.json(HealthService.HEALTH_URI, new HttpParams(), RequestUtils.hideLoadingHeader())
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
    let healthSuccessHandler = (res: any) => {
      let result = this.adapter.adapt(res)
      this._healthResult$.next(result)
      if(!this.currentHealth) {
        this.toastService.success("Server is UP and Running", "UP")
        window.location.reload()
      }
      this.currentHealth = result.isUp
      this.clearDownTimer()
      this._healthy$.next(result.isUp)

      if(this.upTimer === undefined) {
        // this.log.info("Creating UP Timer")
        this.upTimer = timer(0, HealthService.UP_PERIOD)
          .subscribe(() => {
            this.readHealth()
              .subscribe(healthSuccessHandler, healthErrorHandler)
          });
      }
    }

    let healthErrorHandler = (err: any) => {
      try {
        let result = this.adapter.adapt(err.body)
        this._healthResult$.next(result)
        if(this.currentHealth) {
          let reason = result.reason()
          if(reason == "") {
            reason = "Please wait for the green light and the refresh the page"
          }
          this.toastService.error(reason, "Server is NOT Ready!")
        }
      } catch (e) {
        this.log.warn("Unable to read health response")
        this.log.warn(err)
        this._healthResult$.next(HealthResult.down())
      } finally {
        this.currentHealth = false
        this.clearUpTimer()
        this._healthy$.next(false)

        if(this.downTimer === undefined) {
          this.log.info("Creating DOWN Timer")
          this.downTimer = timer(0, HealthService.DOWN_PERIOD)
            .subscribe(() => {
              this.readHealth()
                .subscribe(healthSuccessHandler, healthErrorHandler)
            });
        }
      }
    }

    this.readHealth()
      .subscribe(healthSuccessHandler, healthErrorHandler)
  }
}
