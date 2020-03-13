import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatatableComponent} from './datatable.component';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule
  ],
  exports: [
    DatatableComponent,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: []
})
export class DatatableModule { }
