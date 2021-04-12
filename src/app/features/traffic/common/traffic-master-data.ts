import {ReplaySubject, Subject} from "rxjs";
import {TrafficDetailData} from "./traffic-detail-data";
import {TrafficData} from "./traffic-data";
import {delay} from "rxjs/operators";

export abstract class TrafficMasterData implements TrafficData {
  abstract id: string;
  details: Subject<Array<TrafficDetailData>> = new ReplaySubject();
  isOpen: boolean = false;
  isLoading: boolean = false;

  protected constructor() {
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  update(details: Array<TrafficDetailData>): void {
    this.toggle();
    this.details.next(details);
  }

  loading() {
    this.isLoading = true;
  }

  loaded() {
    this.isLoading = false;
  }
}
