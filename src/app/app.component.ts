import { Component, OnInit } from '@angular/core';
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { AppOptionComponent } from "./autocomplete/app-option/app-option.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AutocompleteComponent,
    AppOptionComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  searchText: string = '';

  ngOnInit(): void {
  }

  filterPredicate(option: any, searchText: string): boolean {
    return option.toLowerCase().includes(searchText.toLowerCase());
  }

  sortPredicate(a: any, b: any): number {
    return a.localeCompare(b);
  }

  onSearch(event: string): void {
    console.log('Search triggered:', event);
  }

  onDropdownOpen(open: boolean): void {
    console.log('Dropdown open state:', open);
  }
}
