import {Component, OnInit, TemplateRef} from '@angular/core';
import {ToastService, ToastConfig} from "../../service/toast.service";

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  host: {'[class.ngb-toasts]': 'true'},
  styleUrls: ['./toasts-container.component.css']
})
export class ToastsContainerComponent implements OnInit {

  constructor(private readonly toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast: ToastConfig) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  remove(toast: ToastConfig) {
    this.toastService.remove(toast);
  }

  get toasts(): Array<ToastConfig> {
    return this.toastService.toasts;
  }
}
