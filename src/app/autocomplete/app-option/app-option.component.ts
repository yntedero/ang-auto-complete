// Файл app-option.component.ts
import {Component, Directive, ElementRef, inject, Input} from '@angular/core';

@Directive({
  selector: 'app-option',
  standalone: true,
})
export class AppOptionComponent {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;

  @Input() value: any;

  get content(): string {
    return this.el.textContent;
  }
}
