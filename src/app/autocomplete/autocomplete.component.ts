import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { AppOptionComponent } from './app-option/app-option.component';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements AfterContentInit {
  @Input() options: string[] = [];
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() filterPredicate: (option: string, searchTerm: string) => boolean = (option, searchTerm) => option.toLowerCase().includes(searchTerm.toLowerCase());
  @Input() sortPredicate: (a: string, b: string) => number = () => 0;

  @Output() search = new EventEmitter<string>();

  @ContentChildren(AppOptionComponent) appOptions!: QueryList<AppOptionComponent>;

  searchTerm: string = '';
  filteredOptions: string[] = [];

  title: string = 'Hello, auto-complete-coreteq';

  ngAfterContentInit() {
    this.options = this.appOptions.toArray().map(option => option.value);
  }

  onSearchChange(): void {
    if (this.disabled || this.loading) return;
    let options = this.options;
    if (this.filterPredicate) {
      options = options.filter(option => this.filterPredicate(option, this.searchTerm));
    }
    if (this.sortPredicate) {
      options.sort(this.sortPredicate);
    }
    this.filteredOptions = options;
    this.search.emit(this.searchTerm);
  }

  selectOption(option: string): void {
    this.searchTerm = option;
    this.filteredOptions = [];
  }
}
