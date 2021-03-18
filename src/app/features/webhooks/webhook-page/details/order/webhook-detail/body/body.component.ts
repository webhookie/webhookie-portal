import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  body: any = {
    'label': 'Body',
    parent: [
      {
        'label': 'Order',
        'type': 'Object',
        'required': 0,
        'message': 'The ID of the order.',
        'child': [
          {
            'label': 'Fixed Amount',
            'type': '',
            'required': 0,
            'sub_child': [
              {
                'label': 'Value',
                'type': 'Number',
                'required': 1,
                'message': 'The ID of the order.',
                'min_value': '0.01',
                'max_value': '99999999.99',
                'example': '99.95'

              },
              {
                'label': 'Currency',
                'type': '',
                'required': 0,
                'message': 'Currency of the fixed amount. Currently the only supported value is EUR (Euros).',
                'pattern': 'EUR',
                'example': 'EUR'
              }
            ]
          },
          {
            'label': 'Node 2',
            'type': 'String',
            'required': 1,
            'message': 'The ID of the order.',
            'child': [{
              'label': 'Fixed Amount',
              'type': '',
              'required': 0,
              'sub_child': [{
                'label': 'Value',
                'type': 'Number',
                'required': 1,
                'message': 'The ID of the order.',
                'min_value': '0.01',
                'max_value': '99999999.99',
                'example': '99.95'

              },
              {
                'label': 'Currency',
                'type': '',
                'required': 0,
                'message': 'Currency of the fixed amount. Currently the only supported value is EUR (Euros).',
                'pattern': 'EUR',
                'example': 'EUR'
              }
              ]
            }
            ]
          }
        ]
      },
    ] 
    };
  constructor() { }

  ngOnInit(): void {
    // this.sidebarList[val].IsShow = !this.sidebarList[val].IsShow;
  }

}
