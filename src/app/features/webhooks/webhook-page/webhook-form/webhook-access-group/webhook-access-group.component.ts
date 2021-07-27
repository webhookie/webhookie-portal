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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {WebhookieService} from "../../../../../shared/service/webhookie.service";
import {DropdownEntry} from "../../../../../shared/model/dropdownEntry";
import {MultiSelectComponent} from "../../../../../shared/components/multi-select/multi-select.component";
import {map} from "rxjs/operators";
import {AccessGroupSelection, WebhookApiAccess} from "../webhook-api-form";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-webhook-access-group',
  templateUrl: './webhook-access-group.component.html',
  styleUrls: ['./webhook-access-group.component.css']
})
export class WebhookAccessGroupComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() title!: string;
  @Input() path!: string;
  @Input() id!: string;
  @Input() formGroup!: FormGroup
  @Input() publicTitle!: string;
  @ViewChild("selectComponent") selectComponent!: MultiSelectComponent
  @Input() filter: (entry: DropdownEntry) => boolean = () => true
  groups: Array<DropdownEntry> = [];

  groupAccess: number = WebhookApiAccess.PUBLIC;
  private itemsSubscription?: Subscription;

  constructor(
    private readonly webhookieService: WebhookieService
  ) { }

  ngOnInit(): void {
    this.webhookieService.fetchAccessGroups(`/group/${this.path}`)
      .subscribe(list => {
        this.groups = list.map(it => new DropdownEntry(it.iamGroupName, it.name))
          .filter(it => this.filter(it))
      });
  }

  setAsPublic() {
    this.itemsSubscription?.unsubscribe();
    this.selectComponent.clearSelection();
    this.groupAccess = WebhookApiAccess.PUBLIC
    this.control.setValue(AccessGroupSelection.initPublic());
  }

  setAsRestricted() {
    this.itemsSubscription = this.selectComponent.selectedItems$
      .pipe(map(it => Array.from(it)))
      .subscribe(it => {
        this.control.setValue(AccessGroupSelection.restricted(it));
      })

    this.groupAccess = WebhookApiAccess.RESTRICTED
  }

  get isRestricted(): boolean {
    return this.groupAccess == WebhookApiAccess.RESTRICTED
  }

  init(value: AccessGroupSelection) {
    this.selectComponent.initSelection(value.items);
    if(value.access == WebhookApiAccess.PUBLIC) {
      this.setAsPublic()
    } else {
      this.setAsRestricted();
    }
  }
}
