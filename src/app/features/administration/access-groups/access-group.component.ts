/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
 *
 * You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
 */

import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import {ModalService} from "../../../shared/service/modal.service";
import {AdminService} from "../admin.service";
import {ToastService} from "../../../shared/service/toast.service";
import {ContextMenuItem, ContextMenuItemBuilder} from "../../../shared/model/table/column/context-menu-item";
import {AccessGroupFormType} from "./access-group-form/access-group-form.component";

type AccessGroupContextMenu = ContextMenuItem<AccessGroup, AccessGroupMenu>;

@Component({
  selector: 'app-access-group',
  templateUrl: './access-group.component.html',
  styleUrls: ['./access-group.component.css']
})
export class AccessGroupComponent extends GenericTable<AccessGroup, AccessGroup>  implements OnInit {
  private readonly _groups$: BehaviorSubject<Array<AccessGroup>> = new BehaviorSubject<Array<AccessGroup>>([]);
  // @ts-ignore
  @ViewChild("tableComponent") tableComponent: GenericTableComponent;
  @ViewChild("editGroupTemplate") editGroupTemplate!: TemplateRef<any>;

  readonly tableData: Observable<Array<AccessGroup>> = this._groups$.asObservable();
  loadMoreEnabled: boolean = false;

  selectedGroup?: AccessGroup

  type$: BehaviorSubject<string> = new BehaviorSubject<string>("Consumer")
  title: string = ""

  get type(): string {
    return this.type$.value
  }

  editFormType: AccessGroupFormType = AccessGroupFormType.EDIT

  constructor(
    private readonly toastService: ToastService,
    readonly modalService: ModalService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly adminService: AdminService
  ) {
    super();
  }

  fetchData(filter: any, pageable: Pageable) {
    this.adminService.fetchAccessGroupsByType(this.type)
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
      new ContextMenuTableColumn([
        ContextMenuItemBuilder
          .create<AccessGroup, AccessGroupMenu>(AccessGroupMenu.EDIT)
          .handler(this.openEditForm())
          .build(),
      ]),
    ]
  }

  openEditForm(): (group: AccessGroup, item: AccessGroupContextMenu) => any {
    return (group: AccessGroup) => {
      this.selectedGroup = group
      this.modalService.open(this.editGroupTemplate)
    }
  }

  fetchDetails(data: any): Observable<boolean> {
    return of(true);
  }

  detailHeaders?: TableHeader[];
  detailColumns?: TableColumn[];

  ngOnInit(): void {
    this.activatedRoute.data
      .subscribe(it => {
        let type = it.type;
        this.type$.next(type)
        this.title = `${type} groups`
      })
  }

  reload() {
    this.toastService.success(`${this.type$.value} Group has been saved successfully!`, "SUCCESS")
    this.tableComponent.dataSource.reset()
    this.fetchData({}, Pageable.unPaged())
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

export enum AccessGroupMenu {
  EDIT = "Edit"
}

