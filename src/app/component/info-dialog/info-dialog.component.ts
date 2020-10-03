import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/constant';
import { FlightDestinationLinks } from 'src/app/model/flightDestinationLinks';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  value: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: FlightDestinationLinks) {
    this.value = `${AppConstant.flight_dates} :\n${this.data.flightDates}\n\n${AppConstant.flight_offers} :\n${this.data.flightOffers}`;
  }

  ngOnInit(): void {
  }
}
