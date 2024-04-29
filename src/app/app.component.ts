import {Component, OnInit, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import {AutocompleteComponent} from "./autocomplete/autocomplete.component";
import {AppOptionComponent} from "./autocomplete/app-option/app-option.component";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    AutocompleteComponent,
    ReactiveFormsModule,
    AppOptionComponent,
    AsyncPipe,
    JsonPipe
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  loading: boolean = false;
  searchText: string = '';

  control = new FormControl();

  group = new FormGroup({
    countryId: new FormControl(null),
  })


  @ContentChildren(AppOptionComponent) appOptions!: QueryList<AppOptionComponent>;

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

  submit() {
    console.log(this.group.value);
  }
}
