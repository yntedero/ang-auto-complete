import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorLibraryComponent } from './selector-library.component';

describe('SelectorLibraryComponent', () => {
  let component: SelectorLibraryComponent;
  let fixture: ComponentFixture<SelectorLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorLibraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectorLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
