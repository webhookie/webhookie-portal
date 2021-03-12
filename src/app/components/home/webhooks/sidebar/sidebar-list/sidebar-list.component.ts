import { Component, OnInit } from '@angular/core';

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
        { 'title': 'Order', 'link': '/webhooks/order', 'isNew': '1', 'isPublished': '1' },
        { 'title': 'Webhook 2', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 3', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 4', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 5', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 6', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '0' }
      ]
    },
    {
      'title': 'Product catalog',
      'IsShow':false,
      'subList': [
        { 'title': 'Order', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 2', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 3', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 4', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 5', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 6', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' }
      ]
    },
    {
      'title': 'Order management',
      'IsShow':false,
      'subList': [
        { 'title': 'Order', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 2', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 3', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 4', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 5', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' },
        { 'title': 'Webhook 6', 'link': '/webhooks/Webhook1', 'isNew': '0', 'isPublished': '1' }
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
 
  Show(val:any){
  this.sidebarList[val].IsShow = !this.sidebarList[val].IsShow;
 }
}
