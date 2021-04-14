import {TableFilter} from "../common/traffic-table/filter/table-filter";

export class SubscriptionTrafficFilter implements TableFilter{
  traceId?: string;
  spanId?: string;
  application?: string;
  status?: string;
}
