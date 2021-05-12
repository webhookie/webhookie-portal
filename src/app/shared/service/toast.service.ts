import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastConfig[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  error(textOrTpl: string | TemplateRef<any>, header: string, options: any = {}) {
    let override = {classname: 'bg-danger text-light', header, ...options};
    this.show(textOrTpl, override );
  }

  success(textOrTpl: string | TemplateRef<any>, header: string, options: any = {}) {
    let override = {classname: 'bg-success text-light', header, ...options};
    this.show(textOrTpl, override );
  }

  remove(toast: ToastConfig) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  constructor(
  ) { }
}

export interface ToastConfig {
  textOrTpl: any;
  delay: number;
  classname: string;
  header: string;
}
