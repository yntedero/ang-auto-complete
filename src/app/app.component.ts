import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'auto-complete-coreteq';
}
