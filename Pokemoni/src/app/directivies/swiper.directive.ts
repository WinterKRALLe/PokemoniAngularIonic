import {Directive, ElementRef, Input, AfterViewInit} from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Directive({
  selector: '[appSwiper]'
})
export class SwiperDirective implements AfterViewInit {
  @Input() config?: SwiperOptions;

  constructor(private el: ElementRef<SwiperContainer>) { }

  ngAfterViewInit(): void {
    // console.log('SwiperDirective', this.config, this.el.nativeElement);

    Object.assign(this.el.nativeElement, this.config);

    this.el.nativeElement.initialize();
  }

}
