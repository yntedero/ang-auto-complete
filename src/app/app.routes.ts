import { Routes } from '@angular/router';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

export const routes: Routes = [
  { path: '', redirectTo: '/autocomplete', pathMatch: 'full' },
  { path: 'autocomplete', component: AutocompleteComponent }
];
