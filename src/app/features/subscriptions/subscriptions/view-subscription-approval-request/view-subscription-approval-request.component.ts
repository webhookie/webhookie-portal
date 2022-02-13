/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ModalService} from 'src/app/shared/service/modal.service';
import {SubscriptionApprovalDialogBaseComponent} from "../subscription-approval-dialog-base.component";
import {ApplicationContext} from "../../../../shared/application.context";
import {StatusUpdate, SubscriptionStatus} from "../../../../shared/model/subscription";

@Component({
  selector: 'app-view-subscription-approval-request',
  templateUrl: './view-subscription-approval-request.component.html',
  styleUrls: ['./view-subscription-approval-request.component.css']
})
export class ViewSubscriptionApprovalRequestComponent extends SubscriptionApprovalDialogBaseComponent implements OnInit {
  @Input() isProviderSubscription: boolean = false
  @ViewChild("approveTemplate") approveTemplate!: TemplateRef<any>;
  @ViewChild("rejectTemplate") rejectTemplate!: TemplateRef<any>;

  constructor(
    private readonly context: ApplicationContext,
    private readonly modalService: ModalService
  ) {
    super()
  }

  ngOnInit(): void {
  }

  hide() {
    this.modalService.hide()
  }

  showApprove() {
    this.modalService.open(this.approveTemplate,'large-modal')
  }

  showReject() {
    this.modalService.open(this.rejectTemplate,'large-modal')
  }

  handleSubscriptionApprovalChange(status: StatusUpdate) {
    this.subscription!.statusUpdate = status;
    this.hide();
  }

  get isRejected(): boolean {
    return this.details?.result?.status == SubscriptionStatus.REJECTED
  }

  get isApproved(): boolean {
    return this.details?.result?.status == SubscriptionStatus.APPROVED
  }

  get decisionMade(): boolean {
    return this.details?.result != null
  }
}
