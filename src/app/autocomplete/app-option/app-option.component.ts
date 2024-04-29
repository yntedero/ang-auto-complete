// Файл app-option.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-option',
  standalone: true,
  template: `<ng-content></ng-content>`
})
export class AppOptionComponent {
  @Input() value: any;
}
