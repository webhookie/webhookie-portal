import {Component, OnInit, ViewChild} from '@angular/core';
import {GenericTable} from "../../../shared/components/generic-table/generic-table";
import {AccessGroup} from "../../../shared/model/access-group";
import {BehaviorSubject, Observable, of} from "rxjs";
import {GenericTableComponent} from "../../../shared/components/generic-table/generic-table.component";
import {Pageable} from "../../../shared/request/pageable";
import {TableHeader} from "../../../shared/model/table/header/table-header";
import {TableFilter} from "../../../shared/model/table/filter/table-filter";
import {BaseTableColumn, TableColumn} from "../../../shared/model/table/column/table-column";
import {SortableTableHeader} from "../../../shared/model/table/header/sortable-table-header";
import {ContextMenuTableColumn} from "../../../shared/model/table/column/context-menu-table-column";
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap, tap} from "rxjs/operators";
import {ModalService} from "../../../shared/service/modal.service";
import {AdminService} from "../admin.service";
import {ToastService} from "../../../shared/service/toast.service";

@Component({
  selector: 'app-access-group',
  templateUrl: './access-group.component.html',
  styleUrls: ['./access-group.component.css']
})
export class AccessGroupComponent extends GenericTable<AccessGroup, AccessGroup>  implements OnInit {
  private readonly _groups$: BehaviorSubject<Array<AccessGroup>> = new BehaviorSubject<Array<AccessGroup>>([]);
  // @ts-ignore
  @ViewChild("tableComponent") tableComponent: GenericTableComponent;

  readonly tableData: Observable<Array<AccessGroup>> = this._groups$.asObservable();
  loadMoreEnabled: boolean = false;

  type: string = "Consumer"

  constructor(
    private readonly toastService: ToastService,
    readonly modalService: ModalService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly adminService: AdminService
  ) {
    super();
  }

  fetchData(filter: any, pageable: Pageable) {
    this.activatedRoute.data
      .pipe(
        map(it => it.type),
        tap(it => this.type = it),
        mergeMap(it => this.adminService.fetchAccessGroupsByType(it))
      )
      .subscribe(it => this._groups$.next(it));
  }

  get headers(): Array<TableHeader> {
    return [
      new SortableTableHeader("Name", "name"),
      new SortableTableHeader("Description", "description"),
      new SortableTableHeader("IAM Group Name", "iamGroupName"),
    ]
  }

  get filters(): Array<TableFilter> {
    return []
  }

  get columns(): Array<TableColumn> {
    return [
      new GroupNameColumn("Group_Name_Col"),
      new GroupDescColumn("Group_Desc_Col"),
      new GroupIAMNameColumn("Group_IAM_Col"),
      new ContextMenuTableColumn([]),
    ]
  }

  fetchDetails(data: any): Observable<boolean> {
    return of(true);
  }

  detailHeaders?: TableHeader[];
  detailColumns?: TableColumn[];

  ngOnInit(): void {
  }

  groupCreated(group: AccessGroup) {
    let values = this.tableComponent.dataSource.data$.value
    values.push(group)
    this.tableComponent.dataSource.data$.next(values)
    this.toastService.success(`${this.type} Group has been saved successfully!`, "SUCCESS")
  }
}

export class GroupNameColumn extends BaseTableColumn<AccessGroup>{
  value(data: AccessGroup): string {
    return data.name
  }
}

export class GroupDescColumn extends BaseTableColumn<AccessGroup>{
  value(data: AccessGroup): string {
    return data.description
  }
}

export class GroupIAMNameColumn extends BaseTableColumn<AccessGroup>{
  value(data: AccessGroup): string {
    return data.iamGroupName
  }
}

