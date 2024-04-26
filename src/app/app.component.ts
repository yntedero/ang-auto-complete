import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {AppOptionComponent} from "./autocomplete/app-option/app-option.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutocompleteComponent, AppOptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'auto-complete-coreteq';
}
