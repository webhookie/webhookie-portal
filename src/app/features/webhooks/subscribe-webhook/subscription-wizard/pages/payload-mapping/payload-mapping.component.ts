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

import {Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {Optional} from "../../../../../../shared/model/optional";
import {Callback} from "../../../../../../shared/model/callback/callback";
import {WizardStep} from "../../steps/wizard-step";
import {BehaviorSubject, Observable, of} from "rxjs";
import {WizardStepBaseComponent} from "../../steps/wizard-step-base/wizard-step-base.component";
import {Subscription} from "../../../../../../shared/model/subscription";
import {map, mergeMap, skip} from "rxjs/operators";
import {Webhook} from "../../../../model/webhook";
import {WebhookApi} from "../../../../model/webhook-api";
import {PayloadMappingWizardStep} from "../../steps/payload-mapping-wizard-step";
import {SubscriptionService} from "../../../../../../shared/service/subscription.service";
import {WebhookApiService} from "../../../../service/webhook-api.service";
import {MonacoEditorComponent} from "@materia-ui/ngx-monaco-editor";
import {ValidationErrors} from "@angular/forms";
import {JsonViewerComponent} from "../../../../../../shared/components/json-viewer/json-viewer.component";
import {TransformationService} from "../../../../../../shared/service/transformation.service";
import {CallbackVerification} from "../callback-verification";

@Component({
  selector: 'app-subscription-wizard-payload-mapping',
  templateUrl: './payload-mapping.component.html',
  styleUrls: ['./payload-mapping.component.css']
})
export class PayloadMappingComponent extends WizardStepBaseComponent<Callback> implements OnInit, DoCheck {
  @Input() webhook!: Webhook
  @Input() webhookApi!: WebhookApi
  subscription: Optional<Subscription>

  step: WizardStep<any> = new PayloadMappingWizardStep();
  private readonly _jsonSchema$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private readonly _callbackValue$: BehaviorSubject<Optional<any>> = new BehaviorSubject<Optional<any>>({});


  @ViewChild(JsonViewerComponent, {static: false}) jsonViewerComponent!: JsonViewerComponent;
  @ViewChild(MonacoEditorComponent, {static: false}) monacoComponent!: MonacoEditorComponent;
  modelUri!: monaco.Uri;
  editor: any;

  editorOptions = {theme: 'vs-light', language: 'json'};
  code = "";
  file_name: any;

  init(value: Optional<Subscription>): Observable<any> {
    this.webhookApiService.readJsonSchemaFor(this.webhook.topic.name, this.webhookApi.id)
      .subscribe(it => {
        this._jsonSchema$.next(it)
        this.registerMonacoJsonSchemaValidator(it);
      });
    this.code = JSON.stringify(this.webhook.example, null, 2);
    this.subscription = value
    return super.init(value)
  }

  getRequestObject(value: string): any {
    let request;
    try {
      request = JSON.parse(value);
    } catch (e) {
      request = this.code
    }

    return request
  }

  initialized(value: Optional<any>) {
    this.showRequest(this.getRequestObject(this.code))
    super.initialized(value);
  }

  showRequest(request: any) {
    this._callbackValue$.next(request);
  }

  result: Optional<CallbackVerification>

  onNext(): Observable<Optional<CallbackVerification>> {
    let subscriptionObservable;
    if(this.transformation) {
      subscriptionObservable = this.subscriptionService.updateTransformation(this.subscription!.id, this.transformation)
    } else {
      subscriptionObservable = of(this.subscription)
    }

    return subscriptionObservable
      .pipe(map( it => this.result = new CallbackVerification(it, this._callbackValue$.value)))
      .pipe(mergeMap(() => super.onNext()))
      .pipe(map(() => this.result))
  }

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly transformationService: TransformationService,
    private readonly webhookApiService: WebhookApiService,
  ) {
    super();
  }

  ngOnInit(): void {
    this._callbackValue$.asObservable()
      .pipe(skip(1))
      .subscribe(it => this.jsonViewerComponent.show(it))
  }

  onDragOver(event:any) {
    event.preventDefault();
  }

  onDropSuccess(event:any) {
    event.preventDefault();

    this.mappingFile(event.dataTransfer.files);
  }
  onChange(e:any) {
    this.mappingFile(e.target.files);
  }
  clearTransform(){
    this.transformation=null;
    this.file_name='';
  }
  mappingFile(files: any) {
    let file = files[0];
    this.file_name=file.name;
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.transformation = fileReader.result as string;
    }
    fileReader.readAsText(file);
  }

  transformation: Optional<string>

  get canTransform(): boolean {
    return this.transformation != null && this.isValid;
  }

  get isValid(): boolean {
    if(this.monacoComponent) {
      let errors: ValidationErrors = this.monacoComponent!.validate();
      return errors == null;
    }
    return true;
  }

  // noinspection JSUnusedGlobalSymbols
  get isDirty(): boolean {
    if(this.monacoComponent) {
      return this.code != this.monacoComponent.value;
    }
    return false;
  }

  editorInit(editor: any) {
    this.editor = editor;
  }

  inputChanged() {
    this._callbackValue$.next(this.getRequestObject(this.code))
  }

  registerMonacoJsonSchemaValidator(schema: any) {
    this.modelUri = monaco.Uri.parse('a://b/message.json');

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: 'https://webhookie.com/webhook-schema.json', // id of the first schema
          fileMatch: ['message*.json'],
          schema: schema
        }
      ]
    });
  }

  transform() {
    this.transformationService
      .transform(this.editor.getValue(), this.transformation!)
      .subscribe(it => this.showRequest(it))
  }

  ngDoCheck(): void {
  }
}
