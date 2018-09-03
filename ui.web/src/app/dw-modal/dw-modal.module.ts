import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DwModalComponent } from './dw-modal/dw-modal.component';
import { DwModalService } from './dw-modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DwModalComponent
  ],
  declarations: [
    DwModalComponent
  ],
  providers: [
    DwModalService
  ]
})
export class DwModalModule { }
