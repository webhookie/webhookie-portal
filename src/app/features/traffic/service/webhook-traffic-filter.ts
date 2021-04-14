import {TableFilter} from "../common/traffic-table/filter/table-filter";

export class WebhookTrafficFilter implements TableFilter {
  traceId?: string;
  status?: string;
}
