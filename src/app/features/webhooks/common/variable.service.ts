import {Injectable ,TemplateRef } from '@angular/core';
import {BreadcrumbService} from 'angular-crumbs';
import {WebhookGroupElement} from "../webhook-page/sidebar/sidebar-list/webhook-group-element";
import {ReplaySubject, Subject} from "rxjs";
import {Topic} from "../model/webhook-group";
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
@Injectable({
  providedIn: 'root'
})
export class VariableService {
  breadcrumbs: any;
  test_res: boolean = false;
  subscribe_res: boolean = false;
  showText: boolean = false;
  selectedWebhook?: WebhookGroupElement;
  sideBarList: any = [
    {
      'title': 'Order management',
      'IsShow': false,
      'subList': [
        {'id': '1', 'title': 'Order', 'link': '/webhooks/webhooks-page/order', 'isNew': '1', 'isPublished': '1'},
        {'id': '2', 'title': 'Webhook 2', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '3', 'title': 'Webhook 3', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '4', 'title': 'Webhook 4', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '5', 'title': 'Webhook 5', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '6', 'title': 'Webhook 6', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '0'}
      ]
    },
    {
      'title': 'Product catalog',
      'IsShow': false,
      'subList': [
        {'id': '7', 'title': 'Order', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '8', 'title': 'Webhook 2', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '9', 'title': 'Webhook 3', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '10', 'title': 'Webhook 4', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '11', 'title': 'Webhook 5', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '12', 'title': 'Webhook 6', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'}
      ]
    },
    {
      'title': 'Order management',
      'IsShow': false,
      'subList': [
        {'id': '13', 'title': 'Order', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '14', 'title': 'Webhook 2', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '15', 'title': 'Webhook 3', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '16', 'title': 'Webhook 4', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '17', 'title': 'Webhook 5', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'},
        {'id': '18', 'title': 'Webhook 6', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1'}
      ]
    }
  ];
  readonly _selectedWebhookGroup: Subject<WebhookGroupElement> = new ReplaySubject()
  selectedTopic?: Topic;
  selectedTopicName:any;
  constructor(private breadcrumbService: BreadcrumbService,
    public modalRef: BsModalRef,private modalService: BsModalService,) {
    this.breadCrumbs();

    this._selectedWebhookGroup
      .subscribe(it => this.selectWebhookGroup(it));
  }

  selectWebhookGroup(webhookGroup: WebhookGroupElement) {
    this.selectTopic(webhookGroup, webhookGroup.topics[0]);
  }

  selectTopic(webhookGroup: WebhookGroupElement, topic: Topic) {
    if (this.selectedWebhook) {
      this.selectedWebhook?.hide();
    }
    this.selectedWebhook = webhookGroup;
    this.selectedTopic = topic;
    webhookGroup.toggle();
  }

  breadCrumbs() {
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
      this.breadcrumbs = crumbs;
    });
    return this.breadcrumbs;
  }

  syntaxHighlight(json: string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered modal-w',
      backdrop: true,
      ignoreBackdropClick: true
    });
  }
}
