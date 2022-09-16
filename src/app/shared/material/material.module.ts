import {NgModule} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  exports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    
 
  ]
})
export class MaterialModule {}