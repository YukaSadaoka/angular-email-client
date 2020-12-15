import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { timestamp } from 'rxjs/operators';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestory(){
    this.el.nativeElement.remove();
  }

  onDismissClick(){
    this.dismiss.emit();
  }
}
