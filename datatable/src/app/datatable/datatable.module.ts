import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatatableComponent} from './datatable.component';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule} from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {A11yModule} from '@angular/cdk/a11y';


@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    DragDropModule,
    CommonModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule
  ],
  exports: [
    DatatableComponent,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    DragDropModule,
    CommonModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule
  ],
  providers: [],
  bootstrap: []
})
export class DatatableModule { }
