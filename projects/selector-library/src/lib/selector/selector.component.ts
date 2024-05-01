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

export class SelectorComponent implements ControlValueAccessor, AfterContentInit {

  @ContentChildren(AppOptionComponent) optionComponents!: QueryList<AppOptionComponent>;

  public value: any = '';
  public selectedOptionDetail = '';
  options: any[] = [];

  @Output() dropdownOpened = new EventEmitter<boolean>();

  ngAfterContentInit() {
    this.options = this.optionComponents.map(optionComponent => ({
      value: optionComponent.value,
      content: optionComponent.content,
      highlight: false
    })); // Map the option components to the options array
  }

  writeValue(value: any): void {
    this.value = value;
    this.updateSelectedOptionDetail(); // Update the selected option detail
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // Save the function
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
    const selectedOption = this.options.find(option => option.value === this.value);
    if (selectedOption) {
      this.selectedOptionDetail = selectedOption.content;
    } else {
      this.selectedOptionDetail = ''; // Clear the selected option detail if the value is not found
    }
  }

  private onChange: Function = () => {}; // The function to call when the value changes
}
