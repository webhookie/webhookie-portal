/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2021 Hookie Solutions AB, info@hookiesolutions.com
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

import {EMPTY, Observable, of} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {Constants} from "../constants";

export class MockData {
  public static readonly webhookApis = [
    {
      "id": "60b85be21fa763088d2b92ef",
      "title": "Petstore Events API",
      "webhookVersion": "1.0.0",
      "description": "This is my first webhook API. It uses the ASYNC API Specification - check it out here [https://www.asyncapi.com/docs/specifications/2.0.0]",
      "webhooks": [
        {
          "topic": {
            "name": "createdPet",
            "description": "Subscribe to this webhook to get Pets when they are created."
          },
          "numberOfSubscriptions": 1
        },
        {
          "topic": {
            "name": "updatedPet",
            "description": "Subscribe to this webhook to get Pets when they are updated."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "deletedPet",
            "description": "Subscribe to this webhook to get Pets when they are removed."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "createdOrder",
            "description": "Subscribe to this webhook to get Orders to new pets when they are created."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "deletedOrder",
            "description": "Subscribe to this webhook to get Orders to new pets when they are deleted."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "createdUser",
            "description": "Subscribe to this webhook to get new users when they are created."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "loggedInUser",
            "description": "Subscribe to this webhook to get events when a user logs in."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "loggedOutUser",
            "description": "Subscribe to this webhook to get events when a user logs out."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "updatedUser",
            "description": "Subscribe to this webhook to get events when a user is updated."
          },
          "numberOfSubscriptions": 0
        },
        {
          "topic": {
            "name": "deletedUser",
            "description": "Subscribe to this webhook to get events when a user is deleted."
          },
          "numberOfSubscriptions": 0
        }
      ],
      "raw": "asyncapi: 2.0.0\ninfo:\n  # Webhook API Name\n  title: Petstore Events API\n  # Webhook API Version - could show as a pill\n  version: 1.0.0\n  description: This is my first webhook API. It uses the ASYNC API Specification - check it out here [https://www.asyncapi.com/docs/specifications/2.0.0]\n  termsOfService: https://webhooks.mycompany.com/terms/\n  contact:\n    name: My Webhook API Support\n    url: https://mysupport.mycompany.com/\n    email: support@mycompany.com\n  license:\n    name: Apache 2.0\n    url: http://www.apache.org/licenses/LICENSE-2.0.html\nservers:\n  production:\n    # this url is not important. Only really need this section for the security part.\n    url: webhooks.mycompany.com\n    protocol: http\n    description: This is \"My Company\" webhook instance.\n    security:\n      # refers the securitySchemes below. This is the allowed Security options.\n      - hmacSig: []\n\nchannels:\n  # Webhook name / topic\n  createdPet:\n    # description of webhook\n    description: Subscribe to this webhook to get Pets when they are created.\n    subscribe:\n      tags:\n        - name: Pet\n      message:\n        $ref: '#/components/messages/Pet'\n  updatedPet:\n    # description of webhook\n    description: Subscribe to this webhook to get Pets when they are updated.\n    subscribe:\n      tags:\n        - name: Pet\n      message:\n        $ref: '#/components/messages/Pet'\n  deletedPet:\n    # description of webhook\n    description: Subscribe to this webhook to get Pets when they are removed.\n    subscribe:\n      tags:\n        - name: Pet\n      message:\n        $ref: '#/components/messages/Pet'\n  createdOrder:\n    # description of webhook\n    description: Subscribe to this webhook to get Orders to new pets when they are created.\n    subscribe:\n      tags:\n        - name: Store\n      message:\n        $ref: '#/components/messages/Order'\n  deletedOrder:\n    # description of webhook\n    description: Subscribe to this webhook to get Orders to new pets when they are deleted.\n    subscribe:\n      tags:\n        - name: Store\n      message:\n        $ref: '#/components/messages/Order'\n  createdUser:\n    # description of webhook\n    description: Subscribe to this webhook to get new users when they are created.\n    subscribe:\n      tags:\n        - name: User\n      message:\n        $ref: '#/components/messages/User'\n  loggedInUser:\n    # description of webhook\n    description: Subscribe to this webhook to get events when a user logs in.\n    subscribe:\n      tags:\n        - name: User\n      message:\n        $ref: '#/components/messages/User'\n  loggedOutUser:\n    # description of webhook\n    description: Subscribe to this webhook to get events when a user logs out.\n    subscribe:\n      tags:\n        - name: User\n      message:\n        $ref: '#/components/messages/User'\n  updatedUser:\n    # description of webhook\n    description: Subscribe to this webhook to get events when a user is updated.\n    subscribe:\n      tags:\n        - name: User\n      message:\n        $ref: '#/components/messages/User'\n  deletedUser:\n    # description of webhook\n    description: Subscribe to this webhook to get events when a user is deleted.\n    subscribe:\n      tags:\n        - name: User\n      message:\n        $ref: '#/components/messages/User'\ncomponents:\n  messages:\n    Pet:\n      contentType: application/json\n      payload:\n        type: \"object\"\n        required:\n        - \"name\"\n        - \"photoUrls\"\n        properties:\n          id:\n            type: \"integer\"\n            format: \"int64\"\n          category:\n            type: \"object\"\n            properties:\n              id:\n                type: \"integer\"\n                format: \"int64\"\n              name:\n                type: \"string\"\n          name:\n            type: \"string\"\n            example: \"doggie\"\n          photoUrls:\n            type: \"array\"\n            items:\n              type: \"string\"\n          tags:\n            type: \"array\"\n            items:\n              type: \"object\"\n              properties:\n                id:\n                  type: \"integer\"\n                  format: \"int64\"\n                name:\n                  type: \"string\"\n          status:\n            type: \"string\"\n            description: \"pet status in the store\"\n            enum:\n            - \"available\"\n            - \"pending\"\n            - \"sold\"\n      traits:\n        - $ref: '#/components/messageTraits/commonHeaders'\n    Order:\n      contentType: application/json\n      payload:\n        type: \"object\"\n        properties:\n          id:\n            type: \"integer\"\n            format: \"int64\"\n          petId:\n            type: \"integer\"\n            format: \"int64\"\n          quantity:\n            type: \"integer\"\n            format: \"int32\"\n          shipDate:\n            type: \"string\"\n            format: \"date-time\"\n          status:\n            type: \"string\"\n            description: \"Order Status\"\n            enum:\n            - \"placed\"\n            - \"approved\"\n            - \"delivered\"\n          complete:\n            type: \"boolean\"\n            default: false\n      traits:\n       - $ref: '#/components/messageTraits/commonHeaders'\n    User:\n      contentType: application/json\n      payload:\n        type: \"object\"\n        properties:\n          id:\n            type: \"integer\"\n            format: \"int64\"\n          username:\n            type: \"string\"\n          firstName:\n            type: \"string\"\n          lastName:\n            type: \"string\"\n          email:\n            type: \"string\"\n          password:\n            type: \"string\"\n          phone:\n            type: \"string\"\n          userStatus:\n            type: \"integer\"\n            format: \"int32\"\n            description: \"User Status\"\n      traits:\n       - $ref: '#/components/messageTraits/commonHeaders'\n  messageTraits:\n    commonHeaders:\n      # headers\n      headers:\n        type: object\n        properties:\n          # header name\n          traceID:\n            type: string\n            format: uuid\n            description: The Trace ID of the original message.\n          spanID:\n            type: string\n            format: uuid\n            description: The Span ID for the specific subscription message.\n          Authorization:\n            type: string\n            description: The HMAC signature\n  securitySchemes:\n    # do not delete\n    hmacSig:\n      type: symmetricEncryption\n      description: HMAC Signature\n  ",
      "consumerAccess": "PUBLIC",
      "consumerGroups": [],
      "providerAccess": "ALL",
      "providerGroups": []
    }
  ];

  public static readonly config = {
    iam: {
      issuer: "issuer",
      clientId: "clientId"
    }
  };

  public static readonly user = {
    "entity": "Hookie Solutions",
    "consumerGroups": [
      "Customers",
      "Suppliers",
      "webhookie-consumer-group-1"
    ],
    "providerGroups": [
      "Product Management"
    ],
    "roles": [
      "WH_CONSUMER",
      "WH_USER",
      "WH_PROVIDER",
      "WH_ADMIN"
    ],
    "email": "auth0|5fdc19e1b10d6d006f621d6f"
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

    if (uri.startsWith("/user")) {
      return of(this.user)
    }

    if (uri.startsWith("/applications")) {
      if (uri.endsWith("/callbacks")) {
        return of(this.applicationCallbacks)
      }
      return of(this.applications)
    }

    if (uri.startsWith("/webhookapis")) {
      return of(this.webhookApis)
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
