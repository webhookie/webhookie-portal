import {TableSort} from "./table-sort";
import {TrafficTableHeader} from "../../features/traffic/common/traffic-table/header/traffic-table-header";

export class Pageable {
  static readonly DEFAULT_PAGE: number = 0;
  static readonly DEFAULT_SIZE: number = 20;

  constructor(
    public page: number,
    public size: number,
    public sort?: TableSort
  ) {
  }

  static default(): Pageable {
    return new Pageable(Pageable.DEFAULT_PAGE, Pageable.DEFAULT_SIZE);
  }

  static sort(sort: TableSort): Pageable {
    return new Pageable(Pageable.DEFAULT_PAGE, Pageable.DEFAULT_SIZE, sort);
  }

  static asc(field: TrafficTableHeader): Pageable {
    return Pageable.sort(TableSort.asc(field));
  }

  static desc(field: TrafficTableHeader): Pageable {
    return Pageable.sort(TableSort.desc(field));
  }
}
