/*
 * webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
 * Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
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

import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Optional} from "../model/optional";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    @Inject("Auth") private readonly authService: AuthService
  ) {
  }

  get name(): string {
    return this.authService.claims["name"];
  }

  get userId(): string {
    return this.authService.claims["sub"];
  }

  get email(): string {
    return this.authService.claims["email"];
  }

  get picture(): string {
    return this.authService.claims["picture"];
  }

  get profile(): UserProfile {
    return new UserProfile(this.userId, this.name, this.email)
  }
}

export class UserProfile {
  constructor(
    public userId: string,
    public name: Optional<string>,
    public email: Optional<string>,
  ) {
  }

  display(): string {
    let value = this.userId;

    if(this.name) {
      value = this.name
    }

    if(this.email) {
      value = `${value} (${this.email})`
    }

    return value
  }
}

