import { Component, forwardRef, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { AppOptionComponent } from "./app-option/app-option.component";
import { NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf,
    NgForOf,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {
  @Input() loading: boolean = false;
  @Input() minLengthSearch!: number;
  @Input() debounceSearch!: number;
  @Input() filterPredicate?: (option: any, searchText: string) => boolean;
  @Input() sortPredicate?: (a: any, b: any) => number;
  @Input() customOptionTemplate?: TemplateRef<any>;
  @Output() search = new EventEmitter<string>();
  @Output() dropdownOpenChange = new EventEmitter<boolean>();
  @Output() optionSelected = new EventEmitter<any>();

  @ContentChildren(AppOptionComponent) appOptions!: QueryList<AppOptionComponent>;

  searchText: string = '';
  filteredOptions: any[] = []; // Initialize as an empty array

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    const searchObservable = new Observable<string>(subscriber => {
      subscriber.next(this.searchText);
    }).pipe(
      debounceTime(this.debounceSearch),
      filter((text: string) => text.length >= this.minLengthSearch || text.length === 0),
      distinctUntilChanged(),
      switchMap(text => this.filterAndSortOptions(text)),
      takeUntil(this.destroy$)
    );

    searchObservable.subscribe(options => {
      this.filteredOptions = Array.isArray(options) ? options : []; // Ensure filteredOptions is always an array
    });
  }

  private filterAndSortOptions(searchText: string): any[] {
    let options = this.appOptions.toArray().map(option => option.value);
    options = this.filterOptions(options, searchText); // Apply filtering
    options = this.sortOptions(options); // Apply sorting
    return options;
  }

  private filterOptions(options: any[], searchText: string): any[] {
    if (this.filterPredicate) {
      return options.filter(option => this.filterPredicate!(option, searchText));
    } else {
      return options;
    }
  }

  private sortOptions(options: any[]): any[] {
    if (this.sortPredicate) {
      return options.sort(this.sortPredicate);
    } else {
      return options;
    }
  }

  selectOption(option: any): void {
    this.searchText = option; // Assuming option is the string for simplicity
    this.optionSelected.emit(option);
    this.dropdownOpenChange.emit(false);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.searchText = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};

  onSearchTextChange(): void {
    this.search.emit(this.searchText);
  }
}
