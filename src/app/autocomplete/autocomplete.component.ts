import { Component, forwardRef, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, OnInit } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { AppOptionComponent } from "./app-option/app-option.component";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";

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
  filteredOptions: any[] = [];
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
      this.filteredOptions = options;
    });
  }

  private filterAndSortOptions(searchText: string): any[] {
    let options = this.appOptions.toArray().map(option => option.value);
    if (this.filterPredicate) {
      options = options.filter(option => this.filterPredicate!(option, searchText));
    }
    if (this.sortPredicate) {
      options.sort(this.sortPredicate);
    }
    return Array.isArray(options) ? options : [options];
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
