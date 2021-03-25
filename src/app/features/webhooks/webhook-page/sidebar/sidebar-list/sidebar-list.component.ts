import { Component, OnInit } from '@angular/core';
import { VariableService } from '../../../common/variable.service';
@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {
  sidebarList: any = [
    {
      'title': 'Order management',
      'IsShow':false,
      'subList': [
        { 'title': 'Order', 'link': '/webhooks/webhooks-page/order', 'isNew': '1', 'isPublished': '1' },
        { 'title': 'Webhook 2', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 3', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 4', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 5', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 6', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '0' }
      ]
    },
    {
      'title': 'Product catalog',
      'IsShow':false,
      'subList': [
        { 'title': 'Order', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 2', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 3', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 4', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 5', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 6', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' }
      ]
    },
    {
      'title': 'Order management',
      'IsShow':false,
      'subList': [
        { 'title': 'Order', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 2', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 3', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 4', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 5', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 6', 'link': '/webhooks/webhooks-page/order', 'isNew': '0', 'isPublished': '1' }
      ]
    }
  ]
  constructor(public variable:VariableService) {
    this.variable.selectedWebhook=this.sidebarList[0].subList[0];
   }

  ngOnInit(): void {
    $(document).ready(function () {
      $("#faq a").click(function () { 
        $(this).toggleClass("active").parent().parent().siblings().find('a').removeClass('active')
      });
    })
  }
  Show(val:any){
    this.sidebarList[val].IsShow = !this.sidebarList[val].IsShow;
  }
}
