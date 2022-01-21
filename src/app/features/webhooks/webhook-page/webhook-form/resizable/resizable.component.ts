import { Component, OnInit, ElementRef, HostBinding, Input, Inject, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'region-component',
	templateUrl: 'resizable.component.html',
	styleUrls: ['resizable.component.css'],
	providers: [ { provide: Window, useValue: window } ],
	encapsulation: ViewEncapsulation.None
})
export class RegionComponent implements OnInit {

	@HostBinding('class.resizable') true:any=false;
	@HostBinding('class.no-transition') noTransition:boolean = false;
	@HostBinding('style.width') width:any;
	@HostBinding('style.height') height:any;
	@HostBinding('style.flex-basis') flexBasis:any;

	@Input() directions:any;
	@Input() rFlex:boolean = false;

	@Output() resizeStart:any = new EventEmitter();
	@Output() resizing:any = new EventEmitter();
	@Output() resizeEnd:any = new EventEmitter();

  nativeElement:any;
	style:any;
	w:any;
	h:any;
	vx:any = 1;
	vy:any = 1;
	start:any;
	dragDir:any;
	axis:any;
	info:any={};

	constructor(private regionElement: ElementRef, @Inject(Window) private window: Window) {
		this.nativeElement = this.regionElement.nativeElement;
		this.style = this.window.getComputedStyle(this.nativeElement, null);
	}

	ngOnInit() {
		this.flexBasis = 'flexBasis' in this.nativeElement.style ? 'flexBasis' :
			'webkitFlexBasis' in this.nativeElement.style ? 'webkitFlexBasis' :
			'msFlexPreferredSize' in this.nativeElement.style ? 'msFlexPreferredSize' : 'flexBasis';
	}

	updateInfo(e:any) {
		this.info['width'] = false; this.info['height'] = false;
		if(this.axis === 'x') {
			this.info['width'] = parseInt(this.nativeElement.style[this.rFlex ? this.flexBasis : 'width'], 10);
		} else {
			this.info['height'] = parseInt(this.nativeElement.style[this.rFlex ? this.flexBasis : 'height'], 10);
		}
		this.info['id'] = this.nativeElement.id;
		this.info['evt'] = e;
	};

	dragStart(e:any, direction:any) {
		let mouseEvent = e.originalEvent;

		this.dragDir = direction;
		this.axis = (this.dragDir === 'left' || this.dragDir === 'right') ? 'x' : 'y';
		this.start = (this.axis === 'x' ? mouseEvent.clientX : mouseEvent.clientY);
		this.w = parseInt(this.style.getPropertyValue('width'), 10);
		this.h = parseInt(this.style.getPropertyValue('height'), 10);

		this.resizeStart.emit({ info: this.info });
		this.noTransition = true;
		this.true=true;
	}

	dragEnd(e:any) {
		const mouseEvent = e.originalEvent;

		this.updateInfo(mouseEvent);
		this.resizeEnd.emit({ info: this.info });
		this.noTransition = false;
		this.true=true;
	}

	dragging(e:any) {
		const mouseEvent = e.originalEvent;
		const offset = (this.axis === 'x') ? this.start - mouseEvent.clientX : this.start - mouseEvent.clientY;

		var operand = 1;
		switch(this.dragDir) {
			case 'left':
				operand = -1;
             break;
			case 'right':
				let width = (this.w - offset * this.vx * operand) + 'px';
				if (this.rFlex) {
					this.flexBasis = width;
				} else {
					this.width = width;
				}
				break;
		}
		this.updateInfo(mouseEvent);
		this.resizing.emit({ info: this.info });
	}
}
