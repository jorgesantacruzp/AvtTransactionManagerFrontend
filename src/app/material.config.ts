import {MatButtonModule, MatDialogModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule, MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule],
})
export class MaterialModule {
}
