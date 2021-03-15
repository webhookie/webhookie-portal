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
        'type': 'object',
        'required': 0,
        'message': 'The ID of the order.',
        'child': [
          {
            'label': 'Fixed Amount',
            'type': '',
            'required': 0,
            'sub-child': [
              {
                'label': 'value',
                'type': 'number',
                'required': 1,
                'message': 'The ID of the order.',
                'min-value': '0.01',
                'max-value': '99999999.99',
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
            'type': 'string',
            'required': 1,
            'message': 'The ID of the order.',
            'child': [{
              'label': 'Fixed Amount',
              'type': '',
              'required': 0,
              'sub-child': [{
                'label': 'value',
                'type': 'number',
                'required': 1,
                'message': 'The ID of the order.',
                'min-value': '0.01',
                'max-value': '99999999.99',
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
  }

}
