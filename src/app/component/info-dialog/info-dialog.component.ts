import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightDestinationLinks } from 'src/app/model/flightDestinationLinks';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  value: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: FlightDestinationLinks) {
    this.value = `Flight Dates :\n${this.data.flightDates}\n\nFlight Offers :\n${this.data.flightOffers}`;
  }

  ngOnInit(): void {
  }
}
