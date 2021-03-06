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

/**
 *
 * @author Arthur Kazemi<bidadh@gmail.com>
 * @date 21/5/21 18:34
 */
export class WebhookAPITemplate {
  static WEBHOOK_API_TEMPLATE = `asyncapi: 2.0.0
info:
  # Webhook API Name
  title: Petstore Events API
  # Webhook API Version - could show as a pill
  version: 1.0.0
  description: This is my first webhook API. It uses the ASYNC API Specification - check it out here [https://www.asyncapi.com/docs/specifications/2.0.0]
  termsOfService: https://webhooks.mycompany.com/terms/
  contact:
    name: My Webhook API Support
    url: https://mysupport.mycompany.com/
    email: support@mycompany.com
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
servers:
  production:
    # this url is not important. Only really need this section for the security part.
    url: webhooks.mycompany.com
    protocol: http
    description: This is "My Company" webhook instance.
    security:
      # refers the securitySchemes below. This is the allowed Security options.
      - hmacSig: []

channels:
  # Webhook name / topic
  createdPet:
    # description of webhook
    description: Subscribe to this webhook to get Pets when they are created.
    subscribe:
      tags:
        - name: Pet
      message:
        $ref: '#/components/messages/Pet'
  updatedPet:
    # description of webhook
    description: Subscribe to this webhook to get Pets when they are updated.
    subscribe:
      tags:
        - name: Pet
      message:
        $ref: '#/components/messages/Pet'
  deletedPet:
    # description of webhook
    description: Subscribe to this webhook to get Pets when they are removed.
    subscribe:
      tags:
        - name: Pet
      message:
        $ref: '#/components/messages/Pet'
  createdOrder:
    # description of webhook
    description: Subscribe to this webhook to get Orders to new pets when they are created.
    subscribe:
      tags:
        - name: Store
      message:
        $ref: '#/components/messages/Order'
  deletedOrder:
    # description of webhook
    description: Subscribe to this webhook to get Orders to new pets when they are deleted.
    subscribe:
      tags:
        - name: Store
      message:
        $ref: '#/components/messages/Order'
  createdUser:
    # description of webhook
    description: Subscribe to this webhook to get new users when they are created.
    subscribe:
      tags:
        - name: User
      message:
        $ref: '#/components/messages/User'
  loggedInUser:
    # description of webhook
    description: Subscribe to this webhook to get events when a user logs in.
    subscribe:
      tags:
        - name: User
      message:
        $ref: '#/components/messages/User'
  loggedOutUser:
    # description of webhook
    description: Subscribe to this webhook to get events when a user logs out.
    subscribe:
      tags:
        - name: User
      message:
        $ref: '#/components/messages/User'
  updatedUser:
    # description of webhook
    description: Subscribe to this webhook to get events when a user is updated.
    subscribe:
      tags:
        - name: User
      message:
        $ref: '#/components/messages/User'
  deletedUser:
    # description of webhook
    description: Subscribe to this webhook to get events when a user is deleted.
    subscribe:
      tags:
        - name: User
      message:
        $ref: '#/components/messages/User'
components:
  messages:
    Pet:
      contentType: application/json
      payload:
        type: "object"
        required:
        - "name"
        - "photoUrls"
        properties:
          id:
            type: "integer"
            format: "int64"
          category:
            type: "object"
            properties:
              id:
                type: "integer"
                format: "int64"
              name:
                type: "string"
          name:
            type: "string"
            example: "doggie"
          photoUrls:
            type: "array"
            items:
              type: "string"
          tags:
            type: "array"
            items:
              type: "object"
              properties:
                id:
                  type: "integer"
                  format: "int64"
                name:
                  type: "string"
          status:
            type: "string"
            description: "pet status in the store"
            enum:
            - "available"
            - "pending"
            - "sold"
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
    Order:
      contentType: application/json
      payload:
        type: "object"
        properties:
          id:
            type: "integer"
            format: "int64"
          petId:
            type: "integer"
            format: "int64"
          quantity:
            type: "integer"
            format: "int32"
          shipDate:
            type: "string"
            format: "date-time"
          status:
            type: "string"
            description: "Order Status"
            enum:
            - "placed"
            - "approved"
            - "delivered"
          complete:
            type: "boolean"
            default: false
      traits:
       - $ref: '#/components/messageTraits/commonHeaders'
    User:
      contentType: application/json
      payload:
        type: "object"
        properties:
          id:
            type: "integer"
            format: "int64"
          username:
            type: "string"
          firstName:
            type: "string"
          lastName:
            type: "string"
          email:
            type: "string"
          password:
            type: "string"
          phone:
            type: "string"
          userStatus:
            type: "integer"
            format: "int32"
            description: "User Status"
      traits:
       - $ref: '#/components/messageTraits/commonHeaders'
  messageTraits:
    commonHeaders:
      # headers
      headers:
        type: object
        properties:
          # header name
          traceID:
            type: string
            format: uuid
            description: The Trace ID of the original message.
          spanID:
            type: string
            format: uuid
            description: The Span ID for the specific subscription message.
          Authorization:
            type: string
            description: The HMAC signature
  securitySchemes:
    # do not delete
    hmacSig:
      type: symmetricEncryption
      description: HMAC Signature
  `;
}
