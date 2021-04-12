import {TrafficData} from "./traffic-data";

export abstract class TrafficDetailData implements TrafficData {
  abstract id: string;
  isLoading: boolean = true;
}
