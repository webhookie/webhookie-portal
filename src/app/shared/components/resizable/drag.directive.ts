import { Directive, ElementRef, Output, EventEmitter, HostBinding, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Directive({
	selector: '[drag-handle]',
	providers: [ { provide: DOCUMENT, useValue: document } ],
})
export class DragDirective {

	@Output() onDragStart = new EventEmitter();
	@Output() onDrag = new EventEmitter();
	@Output() onDragEnd = new EventEmitter();

	private dragging:boolean = false;

	constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: any) { }

	ngOnInit() {
		let el = this.elementRef.nativeElement;
		el.addEventListener('mousedown', (event:any) => {
			if (event.which === 1) {
				this.dragging = true;
				this.onDragStart.emit({ originalEvent: event });
			}
		}, false);


		this.document.addEventListener('mouseup', (event:any) => {
			if(this.dragging) {
				this.onDragEnd.emit({ originalEvent: event });
			}

			this.dragging = false;
		}, false);

		this.document.addEventListener('mousemove', (event:any) => {
			if(this.dragging) {
				this.onDrag.emit({ originalEvent: event });
			}
		}, false);
	}
}