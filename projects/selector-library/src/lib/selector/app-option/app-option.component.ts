import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: 'app-option',
  standalone: true
})
export class AppOptionComponent {
  @Input() value: any; // The value for the option

  constructor(public el: ElementRef<HTMLElement>) {} // Inject the element reference

  get content(): string {
    return this.el.nativeElement.textContent || ''; // Get the text content of the element
  }
}
