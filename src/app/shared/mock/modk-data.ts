import {EMPTY, Observable, of} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {Constants} from "../constants";

export class MockData {
  public static readonly webhookGroups = [
    {
      "id": "60361c97d7582d3e57824b58",
      "title": "Order Management",
      "webhookVersion": "1.0.0",
      "description": "Order Management webhook group",
      "topics": [
        {
          "name": "NewOrder",
          "description": "New Order webhook"
        },
        {
          "name": "OrderChange",
          "description": "Order Change Webhook"
        },
        {
          "name": "CancelledOrder",
          "description": "Cancelled Order Webhook"
        }
      ],
      "raw": "asyncapi: 2.0.0\ninfo:\n  title: Order Management\n  version: 1.0.0\n  description: Order Management webhook group\nchannels:\n  NewOrder:\n    description: New Order webhook\n    subscribe:\n      tags:\n        - name: Orders\n      message:\n        $ref: '#/components/messages/GenericWebhookMsg'\n  OrderChange:\n    description: Order Change Webhook\n    subscribe:\n      description: The description of the webhook\n      message:\n        $ref: '#/components/messages/Products'\n  CancelledOrder:\n    description: Cancelled Order Webhook\n    subscribe:\n      description: The description of the webhook\n      message:\n        $ref: '#/components/messages/Products'\ncomponents:\n  messages:\n    Products:\n      payload:\n        type: object\n        properties:\n          displayName:\n            type: string\n            description: Name of the user\n          email:\n            type: string\n            format: email\n            description: Email of the user\n\n    GenericWebhookMsg:\n      payload:\n        type: object\n        properties:\n          displayName:\n            type: string\n            description: Name of the user\n          email:\n            type: string\n            format: email\n            description: Email of the user\n      traits:\n        - $ref: '#/components/messageTraits/commonHeaders'\n  messageTraits:\n    commonHeaders:\n      headers:\n        type: object\n        properties:\n          my-app-header:\n            type: string\n\n\n\n"
    },
    {
      "id": "60361d62d7582d3e57824b59",
      "title": "Product Management",
      "webhookVersion": "1.0.0",
      "description": "Product Management webhook group",
      "topics": [
        {
          "name": "CreateNewOrder",
          "description": "Create New Order webhook"
        },
        {
          "name": "OrderDelivered",
          "description": "Order Delivered Webhook"
        }
      ],
      "raw": "asyncapi: 2.0.0\ninfo:\n  title: Product Management\n  version: 1.0.0\n  description: Product Management webhook group\nchannels:\n  CreateNewOrder:\n    description: Create New Order webhook\n    subscribe:\n      tags:\n        - name: Orders\n      message:\n        $ref: '#/components/messages/GenericWebhookMsg'\n  OrderDelivered:\n    description: Order Delivered Webhook\n    subscribe:\n      description: The description of the webhook\n      message:\n        $ref: '#/components/messages/Products'\ncomponents:\n  messages:\n    Products:\n      payload:\n        type: object\n        properties:\n          displayName:\n            type: string\n            description: Name of the user\n          email:\n            type: string\n            format: email\n            description: Email of the user\n\n    GenericWebhookMsg:\n      payload:\n        type: object\n        properties:\n          displayName:\n            type: string\n            description: Name of the user\n          email:\n            type: string\n            format: email\n            description: Email of the user\n      traits:\n        - $ref: '#/components/messageTraits/commonHeaders'\n  messageTraits:\n    commonHeaders:\n      headers:\n        type: object\n        properties:\n          my-app-header:\n            type: string\n\n\n\n"
    }
  ];

  public static readonly config = {
    iam: {
      issuer: "issuer",
      clientId: "clientId"
    }
  };

  public static readonly applications = [
    {
      "name": "Products Application",
      "entity": "Hookie Solutions",
      "consumerIAMGroups": [
        "Suppliers",
        "Customers"
      ],
      "id": "60361fc7d7582d3e57824b5a"
    },
    {
      "name": "Orders Application",
      "entity": "Hookie Solutions",
      "consumerIAMGroups": [
        "Providers",
        "Customers"
      ],
      "id": "60361fc7d7582d3e57824b5b"
    },
    {
      "name": "Customers Application",
      "entity": "Hookie Solutions",
      "consumerIAMGroups": [
        "Customers"
      ],
      "id": "60361fc7d7582d3e57824b5c"
    }
  ];

  public static readonly applicationCallbacks = [
    {
      "id": "60362110d7582d3e57824b65",
      "name": "Product Callback 9001",
      "httpMethod": "POST",
      "url": "http://192.168.1.101:9001/wh/product",
      "signable": false
    },
    {
      "id": "603635acd7582d3e57824b70",
      "name": "Product Callback 9002",
      "httpMethod": "POST",
      "url": "http://192.168.1.101:9002/wh/product",
      "signable": false
    },
    {
      "id": "603634a8d7582d3e57824b6a",
      "name": "Product Callback 9004",
      "httpMethod": "POST",
      "url": "http://192.168.1.101:9004/wh/weather",
      "security": {
        "method": "HMAC",
        "keyId": "my-key-id"
      },
      "signable": true
    }
  ];

  public static readonly traces = [
    {
      "traceId": "f79c48f3-6790-4aa7-bd50-c6a8fb15f1ce",
      "topic": "NewOrder",
      "status": {
        "status": "ISSUES",
        "time": "2021-03-19T06:12:37.782Z"
      },
      "authorizedSubscribers": []
    },
    {
      "traceId": "5a5adaee-8047-4f4d-a31a-1384951e2ede",
      "topic": "CreateNewOrder",
      "status": {
        "status": "ISSUES",
        "time": "2021-03-19T01:43:15.188Z"
      },
      "authorizedSubscribers": [
        "Hookie Solutions"
      ]
    },
    {
      "traceId": "f667531b-9558-4e24-b9c6-84f2ddba020b",
      "topic": "CreateNewOrder",
      "status": {
        "status": "ISSUES",
        "time": "2021-03-19T01:40:26.568Z"
      },
      "authorizedSubscribers": [
        "Hookie Solutions"
      ]
    },
    {
      "traceId": "14009659-f234-47ed-9e9e-58a78383f4bb",
      "topic": "CreateNewOrder",
      "status": {
        "status": "ISSUES",
        "time": "2021-03-19T01:40:02.618Z"
      },
      "authorizedSubscribers": [
        "Hookie Solutions"
      ]
    },
    {
      "traceId": "a8fc6a33-0dd3-49ef-8595-6c70a4fd5890",
      "topic": "CreateNewOrder",
      "status": {
        "status": "OK",
        "time": "2021-03-19T00:40:39.822Z"
      },
      "authorizedSubscribers": [
        "Hookie Solutions"
      ]
    },
    {
      "traceId": "876a6b02-f2e9-4d84-a186-d5551fb6d5c7",
      "topic": "NewOrder",
      "status": {
        "status": "OK",
        "time": "2021-03-19T00:21:47.696Z"
      },
      "authorizedSubscribers": []
    }
  ];

  public static readonly spans = [
    {
      "traceId": "f79c48f3-6790-4aa7-bd50-c6a8fb15f1ce",
      "spanId": "1e101823-49b1-4b46-93d7-71b179e13df3",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "NewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": -1,
      "responseBody": "connection timed out: /192.168.1.101:9004; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9004",
      "status": {
        "status": "BLOCKED",
        "time": "2021-03-19T06:12:37.777Z"
      },
      "tries": 7,
      "nextRetry": {
        "time": "2021-03-19T06:12:07.682Z",
        "no": 3,
        "statusCode": -1
      }
    },
    {
      "traceId": "5a5adaee-8047-4f4d-a31a-1384951e2ede",
      "spanId": "6bf06227-775d-4f61-bf17-f8a79d5e3e74",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "CreateNewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": -1,
      "responseBody": "connection timed out: /192.168.1.101:9001; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9001",
      "status": {
        "status": "BLOCKED",
        "time": "2021-03-19T01:43:15.184Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T01:42:45.132Z",
        "no": 3,
        "statusCode": -1
      }
    },
    {
      "traceId": "f667531b-9558-4e24-b9c6-84f2ddba020b",
      "spanId": "cf00d363-31c9-4f61-ab7e-90ebb9ebedfe",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "CreateNewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": -1,
      "responseBody": "connection timed out: /192.168.1.101:9001; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9001",
      "status": {
        "status": "BLOCKED",
        "time": "2021-03-19T01:40:26.561Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T01:39:56.520Z",
        "no": 3,
        "statusCode": -1
      }
    },
    {
      "traceId": "14009659-f234-47ed-9e9e-58a78383f4bb",
      "spanId": "918f5bc6-b7f2-4368-949f-14847eb417f5",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "CreateNewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": -1,
      "responseBody": "connection timed out: /192.168.1.101:9001; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9001",
      "status": {
        "status": "BLOCKED",
        "time": "2021-03-19T01:40:02.610Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T01:39:32.573Z",
        "no": 3,
        "statusCode": -1
      }
    },
    {
      "traceId": "f79c48f3-6790-4aa7-bd50-c6a8fb15f1ce",
      "spanId": "35ee0e3c-c457-4fe8-85bd-703d66711627",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "NewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": 200,
      "responseBody": "Product OK",
      "status": {
        "status": "OK",
        "time": "2021-03-19T00:42:18.134Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T00:42:17.557Z",
        "no": 3,
        "statusCode": 200
      }
    },
    {
      "traceId": "a8fc6a33-0dd3-49ef-8595-6c70a4fd5890",
      "spanId": "0a119aca-f0b4-4dad-8f79-96f5e3f270f3",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "CreateNewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": 200,
      "responseBody": "Product OK",
      "status": {
        "status": "OK",
        "time": "2021-03-19T00:40:39.819Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T00:40:22.775Z",
        "no": 1,
        "statusCode": 200
      }
    },
    {
      "traceId": "876a6b02-f2e9-4d84-a186-d5551fb6d5c7",
      "spanId": "5507fd5f-39a5-4bbf-b748-63d5f124111c",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "NewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": 200,
      "responseBody": "Weather OK",
      "status": {
        "status": "OK",
        "time": "2021-03-19T00:21:47.693Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T00:21:47.590Z",
        "no": 3,
        "statusCode": 200
      }
    },
    {
      "traceId": "876a6b02-f2e9-4d84-a186-d5551fb6d5c7",
      "spanId": "3d94b220-58ad-4562-a665-0df75a2ae935",
      "application": "My Order Application 1",
      "entity": "Hookie Solutions",
      "topic": "NewOrder",
      "callback": {
        id: "1",
        name:"Callback 1",
        httpMethod: "POST",
        url: "http://localhost:8080/"
      },
      "responseCode": 200,
      "responseBody": "Product OK",
      "status": {
        "status": "OK",
        "time": "2021-03-19T00:21:47.577Z"
      },
      "tries": 3,
      "nextRetry": {
        "time": "2021-03-19T00:21:47.441Z",
        "no": 3,
        "statusCode": 200
      }
    }
  ];

  public static readonly subscriptions = [
    {
      "id": "60362125d7582d3e57824b66",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "CreateNewOrder",
      "callback": {
        "id": "60362110d7582d3e57824b65",
        "name": "Product Callback 9001",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9001/wh/product",
        "signable": false
      },
      "statusUpdate": {
        "status": "BLOCKED",
        "reason": "connection timed out: /192.168.1.101:9001; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9001",
        "time": "2021-03-19T01:43:15.150Z"
      },
      "blocked": true
    },
    {
      "id": "6036216bd7582d3e57824b69",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "NewProduct",
      "callback": {
        "id": "60362110d7582d3e57824b65",
        "name": "Product Callback 9001",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9001/wh/product",
        "signable": false
      },
      "statusUpdate": {
        "status": "ACTIVATED",
        "time": "2021-03-01T03:43:38.494Z"
      },
      "blocked": false
    },
    {
      "id": "603634d5d7582d3e57824b6b",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "NewOrder",
      "callback": {
        "id": "603634a8d7582d3e57824b6a",
        "name": "Product Callback 9004",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9004/wh/weather",
        "security": {
          "method": "HMAC",
          "keyId": "my-key-id"
        },
        "signable": true
      },
      "statusUpdate": {
        "status": "BLOCKED",
        "reason": "connection timed out: /192.168.1.101:9004; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9004",
        "time": "2021-03-19T06:12:37.704Z"
      },
      "blocked": true
    },
    {
      "id": "603635b8d7582d3e57824b71",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "NewOrder",
      "callback": {
        "id": "603635acd7582d3e57824b70",
        "name": "Product Callback 9002",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9002/wh/product",
        "signable": false
      },
      "statusUpdate": {
        "status": "ACTIVATED",
        "time": "2021-03-19T00:16:13.683Z"
      },
      "blocked": false
    }
  ];

  public static readonly providerSubscriptions = [
    {
      "id": "60362125d7582d3e57824b66",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "CreateNewOrder",
      "callback": {
        "id": "60362110d7582d3e57824b65",
        "name": "Product Callback 9001",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9001/wh/product",
        "signable": false
      },
      "statusUpdate": {
        "status": "BLOCKED",
        "reason": "connection timed out: /192.168.1.101:9001; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9001",
        "time": "2021-03-19T01:43:15.150Z"
      },
      "blocked": true
    },
    {
      "id": "603634d5d7582d3e57824b6b",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "NewOrder",
      "callback": {
        "id": "603634a8d7582d3e57824b6a",
        "name": "Product Callback 9004",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9004/wh/weather",
        "security": {
          "method": "HMAC",
          "keyId": "my-key-id"
        },
        "signable": true
      },
      "statusUpdate": {
        "status": "BLOCKED",
        "reason": "connection timed out: /192.168.1.101:9004; nested exception is io.netty.channel.ConnectTimeoutException: connection timed out: /192.168.1.101:9004",
        "time": "2021-03-19T06:12:37.704Z"
      },
      "blocked": true
    },
    {
      "id": "603635b8d7582d3e57824b71",
      "application": {
        "id": "60361fc7d7582d3e57824b5a",
        "name": "My Order Application 1",
        "entity": "Hookie Solutions"
      },
      "topic": "NewOrder",
      "callback": {
        "id": "603635acd7582d3e57824b70",
        "name": "Product Callback 9002",
        "httpMethod": "POST",
        "url": "http://192.168.1.101:9002/wh/product",
        "signable": false
      },
      "statusUpdate": {
        "status": "ACTIVATED",
        "time": "2021-03-19T00:16:13.683Z"
      },
      "blocked": false
    }
  ];

  public static readonly consumerGroups = [
    {
      id: "1",
      name: "Consumer Group 1",
      description: "Consumer Group 1 descriptions",
      iamGroupName: "Consumer_Group_1",
      enabled: true
    },
    {
      id: "2",
      name: "Consumer Group 2",
      description: "Consumer Group 2 descriptions",
      iamGroupName: "Consumer_Group_2",
      enabled: false
    },
    {
      id: "3",
      name: "Consumer Group 3",
      description: "Consumer Group 3 descriptions",
      iamGroupName: "Consumer_Group_3",
      enabled: true
    },
  ];

  static for(uri: string, params: HttpParams): Observable<any> {
    if (uri.startsWith("/public/config")) {
      return of(this.config)
    }

    if (uri.startsWith("/applications")) {
      if (uri.endsWith("/callbacks")) {
        return of(this.applicationCallbacks)
      }
      return of(this.applications)
    }

    if (uri.startsWith("/webhookgroups")) {
      return of(this.webhookGroups)
    }

    if (uri.startsWith("/traffic/trace")) {
      if(uri.endsWith("/spans")) {
        return of(this.spans)
      }
      return of(this.traces)
    }

    if (uri.startsWith("/traffic/span")) {
      return of(this.spans)
    }

    if (uri.startsWith("/subscriptions")) {
      if (params.get("role") == Constants.SUBSCRIPTIONS_VIEW_ROLE_CONSUMER) {
        return of(this.subscriptions)
      }
      return of(this.providerSubscriptions)
    }

    if (uri.startsWith("/admin/consumergroups")) {
      return of(this.consumerGroups)
    }

    return EMPTY;
  }
}
