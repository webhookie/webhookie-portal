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

export class StringUtils {
  // noinspection JSUnusedGlobalSymbols
  static truncatedUUID(id: string): string {
    const MAX_LEN = 20
    if(id.length <= MAX_LEN) {
      return id;
    }

    if(!id.includes("-")) {
      return id.substr(0, MAX_LEN).concat("...");
    }

    let first = id.indexOf("-") + 1;
    let last = id.lastIndexOf("-");
    return id.substr(0, first) + "..." + id.substr(last, id.length);
  }

  static encode(str: string): string {
    return str.replace(/\//g, "-")
  }

  static matchesIn(text: string, str: string): boolean {
    if(str.trim() == "") {
      return true;
    }

    return text.toLowerCase().includes(str.toLowerCase());
  }

  static highlightIn(text: string, str: string) {
    if(str.trim() == "") {
      return text;
    }

    let pattern = new RegExp(str, 'ig');
    let matches = text.match(pattern);
    if(!matches) {
      return text
    }

    let res = text;
    let uniqueMatches = new Set(matches);
    uniqueMatches
      .forEach(it => {
        let r = new RegExp(it, "g")
        res = res.split(r).join(`<span class="text-monospace"><mark>${it}</mark></span>`);
      });

    return res

  }
}
