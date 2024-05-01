import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {AppOptionComponent} from "./selector/app-option/app-option.component";
import {SelectorComponent} from "./selector/selector.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AppOptionComponent,
    SelectorComponent,
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup({
    selectedOption: new FormControl()
  });

  handleDropdownOpened(isOpen: boolean): void {
    console.log("Dropdown is " + (isOpen ? "open" : "closed"));
  }

  submit() {
    console.log("Submitted option id: " + this.form.value.selectedOption);
  }
}
