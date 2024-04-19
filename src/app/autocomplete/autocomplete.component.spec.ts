import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AutocompleteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    component.options = ['Apple', 'Banana', 'Cherry'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter options based on search term', () => {
    component.searchTerm = 'ap';
    component.onSearchChange();
    expect(component.filteredOptions).toEqual(['Apple']);
  });

  it('should emit search term on change', () => {
    spyOn(component.search, 'emit');
    component.searchTerm = 'Banana';
    component.onSearchChange();
    expect(component.search.emit).toHaveBeenCalledWith('Banana');
  });

  it('should not search if disabled or loading', () => {
    component.disabled = true;
    component.searchTerm = 'Banana';
    component.onSearchChange();
    expect(component.filteredOptions.length).toBe(0);

    component.disabled = false;
    component.loading = true;
    component.onSearchChange();
    expect(component.filteredOptions.length).toBe(0);
  });

  it('should set searchTerm when an option is selected', () => {
    const option = 'Apple';
    component.selectOption(option);
    expect(component.searchTerm).toEqual(option);
  });

  it('should have the \'Hello, auto-complete-coreteq\' title', () => {
    expect(component.title).toEqual('Hello, auto-complete-coreteq');
  });
});
