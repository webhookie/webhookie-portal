import {Component, OnInit} from '@angular/core';
import "@asyncapi/web-component/lib/asyncapi-web-component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, tap} from "rxjs/operators";
import {DropdownEntry} from "../../../../shared/model/dropdownEntry";
import {WebhookGroupService} from "../../service/webhook-group.service";
import {RouterService} from "../../../../shared/service/router.service";

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css']
})
export class CreateWebhookComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'yaml'};
  code: string =`
asyncapi: '2.0.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you to remotely manage the city lights.

    ### Check out its awesome features:

    * Turn a specific streetlight on/off 🌃
    * Dim a specific streetlight 😎
    * Receive real-time information about environmental lighting conditions 📈
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0

servers:
  production:
    url: test.mosquitto.org:{port}
    protocol: mqtt
    description: Test broker
    variables:
      port:
        description: Secure connection (TLS) is available through port 8883.
        default: '1883'
        enum:
          - '1883'
          - '8883'
    security:
      - apiKey: []
      - supportedOauthFlows:
        - streetlights:on
        - streetlights:off
        - streetlights:dim
      - openIdConnectWellKnown: []

defaultContentType: application/json

channels:
  streetlights/lighting/measured:
    description: The topic on which measured values may be produced and consumed.
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      summary: Inform about environmental lighting conditions of a particular streetlight.
      operationId: receiveLightMeasurement
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/lightMeasured'

  streetlights/turn/on:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      operationId: turnOn
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  streetlights/turn/off:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      operationId: turnOff
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  streetlights/dim:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      operationId: dimLight
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions of a particular streetlight.
      contentType: application/json
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
    turnOnOff:
      name: turnOnOff
      title: Turn on/off
      summary: Command a particular streetlight to turn the lights on or off.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
    dimLight:
      name: dimLight
      title: Dim light
      summary: Command a particular streetlight to dim the lights.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/dimLightPayload"

  schemas:
    lightMeasuredPayload:
      type: object
      properties:
        lumens:
          type: integer
          minimum: 0
          description: Light intensity measured in lumens.
        sentAt:
          $ref: "#/components/schemas/sentAt"
    turnOnOffPayload:
      type: object
      properties:
        command:
          type: string
          enum:
            - on
            - off
          description: Whether to turn on or off the light.
        sentAt:
          $ref: "#/components/schemas/sentAt"
    dimLightPayload:
      type: object
      properties:
        percentage:
          type: integer
          description: Percentage to which the light should be dimmed to.
          minimum: 0
          maximum: 100
        sentAt:
          $ref: "#/components/schemas/sentAt"
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.

  securitySchemes:
    apiKey:
      type: apiKey
      in: user
      description: Provide your API key as the user and leave the password empty.
    supportedOauthFlows:
      type: oauth2
      description: Flows to support OAuth 2.0
      flows:
        implicit:
          authorizationUrl: 'https://authserver.example/auth'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        password:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        clientCredentials:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        authorizationCode:
          authorizationUrl: 'https://authserver.example/auth'
          tokenUrl: 'https://authserver.example/token'
          refreshUrl: 'https://authserver.example/refresh'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
    openIdConnectWellKnown:
      type: openIdConnect
      openIdConnectUrl: 'https://authserver.example/.well-known'

  parameters:
    streetlightId:
      description: The ID of the streetlight.
      schema:
        type: string

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100

  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId: my-app-id
`;

  selectedProviderGroups!: FormControl;
  publicConsumerAccess!: FormControl;
  publicProviderAccess!: FormControl;
  selectedConsumerGroups!: FormControl;
  spec!: FormControl;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly webhookGroupService: WebhookGroupService,
    private readonly router: RouterService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {});
  }

  title(){
    return "Create new Webhook Group"
  }

  private initForm() {
    this.selectedProviderGroups = new FormControl([])
    this.selectedConsumerGroups = new FormControl([])
    this.publicConsumerAccess = new FormControl(false)
    this.publicProviderAccess = new FormControl(false)
    this.spec = new FormControl(this.code)
    const group = {
      "providerGroups": this.selectedProviderGroups,
      "consumerGroups": this.selectedConsumerGroups,
      "spec": this.spec,
      "publicConsumerAccess": this.publicConsumerAccess,
      "publicProviderAccess": this.publicProviderAccess,
    }
    this.form = this.formBuilder.group(group);
  }

  get specCode(): string {
    return this.spec.value;
  }

  save($event: MouseEvent) {
    let consumerGroups = this.selectedConsumerGroups.value as Array<DropdownEntry>;
    let providerGroups = this.selectedProviderGroups.value as Array<DropdownEntry>;
    let consumerAccess = this.publicConsumerAccess.value == true ? "PUBLIC" : "RESTRICTED";
    let providerAccess = this.publicProviderAccess.value == true ? "ALL" : "RESTRICTED";
    const request = {
      "consumerGroups": consumerGroups.map(it => it.key),
      "providerGroups": providerGroups.map(it => it.key),
      "consumerAccess": consumerAccess,
      "providerAccess": providerAccess,
      "asyncApiSpec": this.spec.value as string
    }

    this.webhookGroupService.create(request)
      .pipe(tap(it => console.warn(it)))
      .subscribe(
        () => this.router.navigateTo("/webhooks")
      );

    $event.preventDefault();
  }
}
