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

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Optional} from "../../../../../../shared/model/optional";
import {Callback} from "../../../../../../shared/model/callback/callback";
import {WizardStep} from "../../steps/wizard-step";
import {Observable, of} from "rxjs";
import {WizardStepBaseComponent} from "../../steps/wizard-step-base/wizard-step-base.component";
import {Subscription} from "../../../../../../shared/model/subscription";
import {map, mergeMap} from "rxjs/operators";
import {Webhook} from "../../../../model/webhook";
import {WebhookApi} from "../../../../model/webhook-api";
import {PayloadMappingWizardStep} from "../../steps/payload-mapping-wizard-step";
import {JsonViewerComponent} from "../../../../../../shared/components/json-viewer/json-viewer.component";
import {SubscriptionService} from "../../../../../../shared/service/subscription.service";

@Component({
  selector: 'app-subscription-wizard-payload-mapping',
  templateUrl: './payload-mapping.component.html',
  styleUrls: ['./payload-mapping.component.css']
})
export class PayloadMappingComponent extends WizardStepBaseComponent<Callback> implements OnInit {
  @Input() webhook!: Webhook
  @Input() webhookApi!: WebhookApi
  @ViewChild("transformViewer") transformViewer?: JsonViewerComponent
  subscription: Optional<Subscription>

  step: WizardStep<any> = new PayloadMappingWizardStep();

  init(value: Optional<Subscription>): Observable<any> {
    this.subscription = value
    return super.init(value)
  }

  onNext(): Observable<Optional<Subscription>> {
    let subscriptionObservable;
    if(this.transformation) {
      subscriptionObservable = this.subscriptionService.updateTransformation(this.subscription!.id, this.transformation)
    } else {
      subscriptionObservable = of(this.subscription)
    }

    return subscriptionObservable
      .pipe(mergeMap(() => super.onNext()))
      .pipe(map(() => this.subscription))
  }

  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  mappingFile(e: any) {
    let file = e.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.transformation = fileReader.result as string;
      this.transformViewer?.show(fileReader.result);
    }
    fileReader.readAsText(file);
  }

  transformation: Optional<string>
}
