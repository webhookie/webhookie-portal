import {Injectable} from "@angular/core";
import {ReplaySubject, Subject} from "rxjs";
import {WebhookGroupElement} from "./webhook-page/sidebar/sidebar-list/webhook-group-element";
import {Topic, WebhookGroup} from "./model/webhook-group";

@Injectable({
  providedIn: 'root'
})
export class WebhooksContext {
  selectedWebhook?: WebhookGroupElement;
  readonly _selectedWebhookGroup: Subject<WebhookGroupElement> = new ReplaySubject()
  selectedTopic?: Topic;

  editingWebhookGroup?: WebhookGroup;

  constructor() {
    this._selectedWebhookGroup
      .subscribe(() => {});
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

  editingGroup(group: WebhookGroup) {
    this.editingWebhookGroup = group;
  }

  cancelEditingWebhookGroup() {
    this.editingWebhookGroup = undefined;
  }

  clearWebhookSelection() {
    this._selectedWebhookGroup.next(undefined);
    this.selectedTopic = undefined
    this.selectedWebhook = undefined
  }
}
