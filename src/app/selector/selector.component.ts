import { Component, ContentChildren, QueryList, forwardRef, AfterContentInit } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import { AppOptionComponent } from './app-option/app-option.component';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Provide the value accessor
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    }
  ],

  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],

  standalone: true
})

export class SelectorComponent implements ControlValueAccessor, AfterContentInit {

  @ContentChildren(AppOptionComponent) optionComponents!: QueryList<AppOptionComponent>;

  public value: any = '';
  public selectedOptionDetail = '';
  options: any[] = [];

  ngAfterContentInit() {
    this.options = this.optionComponents.map(optionComponent => ({
      value: optionComponent.value,
      content: optionComponent.content,
      highlight: false // Initialize the highlight state
    }));

    // Initialize with no selection if no initial value is set
    if (!this.value) {
      this.writeValue('');
      this.selectedOptionDetail = '';
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOptionDetail(); // Update the selected option detail
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // Register the onChange function
  }

  registerOnTouched(fn: any): void {}

  onSelect(event: Event): void {
    const element = event.target as HTMLSelectElement; // Get the selected option
    this.writeValue(element.value);
    this.onChange(element.value);
  }

  toggleHighlight(option: any, isHighlight: boolean): void {
    option.highlight = isHighlight; // Highlight the option
  }

  private updateSelectedOptionDetail(): void {
    const selectedOption = this.options.find(option => option.value === this.value);
    if (selectedOption) {
      this.selectedOptionDetail = selectedOption.content;
    } else {
      this.selectedOptionDetail = ''; // If no option is selected, clear the detail
    }
  }

  private onChange: Function = () => {}; // Initialize the onChange function
}
