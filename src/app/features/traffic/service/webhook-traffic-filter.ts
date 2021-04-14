import {TableFilter} from "../common/traffic-table/filter/table-filter";

export class WebhookTrafficFilter extends TableFilter {
  traceId?: string;
  status?: string;
}
