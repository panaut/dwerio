import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { DwModalService } from '../dw-modal.service';

@Component({
  // tslint:disable-next-line
  selector: 'dw-modal',
  templateUrl: './dw-modal.component.html',
  styleUrls: ['./dw-modal.component.css']
})
export class DwModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: DwModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'dw-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    // this.element.style.display = 'block';
    this.element.firstChild.classList.add('dw-modal-open');
    document.body.classList.add('dw-modal-open');
  }

  // close modal
  close(): void {
    // this.element.style.display = 'none';
    this.element.firstChild.classList.remove('dw-modal-open');
    document.body.classList.remove('dw-modal-open');
  }
}
