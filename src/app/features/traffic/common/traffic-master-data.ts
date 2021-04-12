import {ReplaySubject, Subject} from "rxjs";
import {TrafficDetailData} from "./traffic-detail-data";
import {TrafficData} from "./traffic-data";

export abstract class TrafficMasterData implements TrafficData {
  abstract id: string;
  details: Subject<Array<TrafficDetailData>> = new ReplaySubject();
  isOpen: boolean = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  update(details: Array<TrafficDetailData>): void {
    this.toggle();
    this.details.next(details);
  }
}
