import {TableSort} from "./table-sort";
import {TableHeader} from "../model/table/header/table-header";

export class Pageable {
  static readonly DEFAULT_PAGE: number = 0;
  static readonly DEFAULT_SIZE: number = 20;
  static readonly UN_PAGED_SIZE: number = -1;

  constructor(
    public page: number,
    public size: number,
    public sort?: TableSort
  ) {
  }

  static default(): Pageable {
    return new Pageable(Pageable.DEFAULT_PAGE, Pageable.DEFAULT_SIZE);
  }

  static unPaged(): Pageable {
    return new Pageable(0, Pageable.UN_PAGED_SIZE);
  }

  static sort(sort: TableSort): Pageable {
    return new Pageable(Pageable.DEFAULT_PAGE, Pageable.DEFAULT_SIZE, sort);
  }

  static asc(field: TableHeader): Pageable {
    return Pageable.sort(TableSort.asc(field));
  }

  static desc(field: TableHeader): Pageable {
    return Pageable.sort(TableSort.desc(field));
  }
}
