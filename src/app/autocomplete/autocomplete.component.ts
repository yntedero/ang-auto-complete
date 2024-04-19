import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
  @Input() options: string[] = []; //
  searchTerm: string = '';
  filteredOptions: string[] = [];

  onSearchChange(): void {
    this.filteredOptions = this.searchTerm ?
      this.options.filter(option =>
        option.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) : [];
  }

  selectOption(option: string): void {
    this.searchTerm = option;
    this.filteredOptions = [];
  }
}
