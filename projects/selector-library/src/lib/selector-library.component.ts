import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {AppOptionComponent} from "./selector/app-option/app-option.component";
import {SelectorComponent} from "./selector/selector.component";

@Component({
  selector: 'lib-selector-library',
  standalone: true,
  imports: [
    SelectorComponent,
    AppOptionComponent,
    ReactiveFormsModule
  ],
  template: `
    <p>
      selector-library works!
    </p>
  `,
  styles: ``
})
export class SelectorLibraryComponent {

}
