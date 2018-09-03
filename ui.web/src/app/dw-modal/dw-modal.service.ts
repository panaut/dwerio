import { Injectable } from '@angular/core';
import { DwModalComponent } from './dw-modal/dw-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DwModalService {
  private modals: DwModalComponent[] = [];

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    const indexToRemove = this.modals.indexOf(this.modals.find(x => x.id === id));
    this.modals.splice(indexToRemove);
    // this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal: DwModalComponent = this.modals.find(x => x.id === id); // .filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal: DwModalComponent = this.modals.find(x => x.id === id); // .filter(x => x.id === id)[0];
    modal.close();
  }
}
