import { Injectable } from '@angular/core';
import { BreadcrumbService } from 'angular-crumbs';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  breadcrumbs: any;
  test_res:boolean=false;
  subscribe_res:boolean=false;
  showText:boolean = false;
  constructor(private breadcrumbService: BreadcrumbService) { 
    this.breadCrumbs();
  }

   breadCrumbs(){
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
       this.breadcrumbs=crumbs;      
    });
    return this.breadcrumbs;
   }

   syntaxHighlight(json:string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
}
