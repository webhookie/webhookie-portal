import {Subject} from "rxjs";
import {TrafficDetailData} from "./traffic-detail-data";
import {TrafficData} from "./traffic-data";

export interface TrafficMasterData extends TrafficData {
  details: Subject<Array<TrafficDetailData>>;
}
