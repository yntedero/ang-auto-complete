import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppOptionComponent } from './selector/app-option/app-option.component';
import {SelectorComponent} from "./selector/selector.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    ReactiveFormsModule,
    AppOptionComponent,
    SelectorComponent
  ],
  standalone: true
})
export class AppComponent {
  form = new FormGroup({
    selectedOption: new FormControl() // Create a form control for the selected option
  });

  submit() {
    console.log("Submitted option id: " + this.form.value.selectedOption); // Log the selected option id
  }
}
