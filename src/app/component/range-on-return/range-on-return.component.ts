import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-range-on-return',
  templateUrl: './range-on-return.component.html',
  styleUrls: ['./range-on-return.component.scss']
})
export class RangeOnReturnComponent implements OnInit {

  isOneWay: boolean = false;
  minDay: number = 1;
  maxDay: number = 15;
  formatLabel(value: number) {
    return value;
  }

  @Output() oneWayDataEmitter = new EventEmitter<any>();

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.oneWayDataEmitter.emit({
      'isOneWay': this.isOneWay,
      'minDay': this.minDay,
      'maxDay': this.maxDay
    });
  }

  /**
   * Emit data for one way selection for its parent
   * @author Naveen
   * @param event any
   */
  onUpdate(event: any) {
    if (this.minDay > this.maxDay) {
      this._snackBar.open('Min day cannot be greater then  max day!!', 'Duration', {
        duration: 2000,
      });
      this.maxDay = this.minDay + 1;
    }
    this.oneWayDataEmitter.emit({
      'isOneWay': this.isOneWay,
      'minDay': this.minDay,
      'maxDay': this.maxDay
    });
  }

}
