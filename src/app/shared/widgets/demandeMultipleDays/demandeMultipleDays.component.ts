import { Conge } from 'src/app/conge';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-demandeMultipleDays',
  templateUrl: './demandeMultipleDays.component.html',
  styleUrls: ['./demandeMultipleDays.component.css']
})
export class DemandeMultipleDaysComponent implements OnInit {
  minDate = new Date();
  public CLOSE_ON_SELECTED = false;
  public init = new Date();
  public resetModel = new Date(0);
  @Output() onModelCongeChanged= new EventEmitter();

  public model : Date[] = [];
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;

  public dateClass = (date: Date) => {
    if (this._findDate(date) !== -1) {
      return [ 'selected' ];
    }
    return [ ];
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const index = this._findDate(date);
      if (index === -1) {
        this.model.push(date);
      } else {
        this.model.splice(index, 1)
      }
      this.resetModel = new Date(0);
      if (!this.CLOSE_ON_SELECTED) {
        const closeFn = this._picker.close;
        this._picker.close = () => { };
        this._picker['_componentRef'].instance._calendar.monthView._createWeekCells()
        setTimeout(() => {
          this._picker.close = closeFn;
        });
      }
    }
    console.log(this.model);
    this.onModelCongeChanged.emit(this.model);
  }

  public remove(date: Date): void {
    const index = this._findDate(date);
    this.model.splice(index, 1)
    this.onModelCongeChanged.emit(this.model);
  }

  private _findDate(date: Date): number {
    return this.model.map((m) => +m).indexOf(+date);
  }

  constructor(private messageService: MessageService) { }

  ngOnInit() {}

}
