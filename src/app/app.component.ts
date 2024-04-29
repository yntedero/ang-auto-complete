import { Component, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { AppOptionComponent } from "./autocomplete/app-option/app-option.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AutocompleteComponent,
    ReactiveFormsModule,
    AppOptionComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  loading: boolean = false;
  searchText: string = '';
  controlName = new FormControl();
  @ContentChildren(AppOptionComponent) appOptions!: QueryList<AppOptionComponent>;
  options: { value: string, label: string }[] = [];

  ngOnInit(): void {
  }

  filterPredicate(option: any, searchText: string): boolean {
    return option && option.label && option.label.includes(searchText);
  }

  sortPredicate(a: any, b: any): number {
    return a.label.localeCompare(b.label);
  }

  onSearch(event: string): void {
    console.log('Search triggered:', event);
  }

  onDropdownOpen(open: boolean): void {
    console.log('Dropdown open state:', open);
  }

  ngAfterContentInit(): void {
  }
}
