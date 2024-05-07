import { Component, ContentChildren, QueryList, forwardRef, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { AppOptionComponent } from './app-option/app-option.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    }
  ],

  imports: [FormsModule, NgForOf, NgIf],
  standalone: true
})

export class SelectorComponent implements ControlValueAccessor, AfterContentInit { // for two-way data binding

  @ContentChildren(AppOptionComponent) optionComponents!: QueryList<AppOptionComponent>;

  public value: any = ''; // The current value of the selected option is none
  public selectedOptionDetail = '';
  options: any[] = [];

  @Output() dropdownOpened = new EventEmitter<boolean>(); // Emits an event that informs about the opening/closing of the dropdown

  ngAfterContentInit() {
    this.options = this.optionComponents.map(optionComponent => ({
      value: optionComponent.value,
      content: optionComponent.content,
      highlight: false
    })); // Map the option components array to the options array
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOptionDetail(); // Update the selected option detail
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // Save the function to call when the value changes 'fn'
  }

  registerOnTouched(fn: any): void {}

  onSelect(event: Event): void {
    const element = event.target as HTMLSelectElement; // Get the target element
    this.writeValue(element.value);
    this.onChange(element.value);
  }

  onDropdownOpen(isOpen: boolean): void {
    this.dropdownOpened.emit(isOpen); // Emit the event
  }

  private updateSelectedOptionDetail(): void {
    const selectedOption = this.options.find(option => option.value === this.value); // Find the selected option by current value
    if (selectedOption) {
      this.selectedOptionDetail = selectedOption.content;
    } else {
      this.selectedOptionDetail = '';
    }
  }

  private onChange: Function = () => {}; // The function to callback when the value changes
}
