import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatatableComponent} from './datatable.component';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  exports: [
    DatatableComponent,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: []
})
export class DatatableModule { }
