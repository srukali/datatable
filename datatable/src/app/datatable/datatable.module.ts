import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule} from '@angular/common';

import { DatatableComponent} from './datatable.component';

@NgModule({
  declarations: [
    DatatableComponent,
  ],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    DragDropModule,
    CommonModule,
  ],
  exports: [
    DatatableComponent,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    DragDropModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: []
})
export class DatatableModule { }
