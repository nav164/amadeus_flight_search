import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FlightDestinationsService } from 'src/app/service/flightDestinations.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightInspirationalResponse } from '../../model/flightInspirationalResponse';
import { FlightDestinationLinks } from 'src/app/model/flightDestinationLinks';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

interface OneWayStatus {
  isOneWay: boolean;
  minDay: number;
  maxDay: number;
}
interface KeyVal {
  key: string;
  value: string;
}
const viewByOptions: KeyVal[] = [
  { key: 'Destination', value: 'DESTINATION' },
  { key: 'Duration', value: 'DURATION' },
  { key: 'Week', value: 'WEEK' },
  { key: 'Country', value: 'COUNTRY' }
]
@Component({
  selector: 'app-flight-destination',
  templateUrl: './flight-destination.component.html',
  styleUrls: ['./flight-destination.component.scss']
})
export class FlightDestinationComponent implements OnInit {

  origin: string = 'MAD';
  maxPrice: number = 200;
  minDate: Date;
  maxDate: Date;
  isNonStop: boolean = false;
  viewBy: 'COUNTRY' | 'DATE' | 'DESTINATION' | 'DURATION' | 'WEEK';
  viewByOptions: KeyVal[] = viewByOptions;
  flightInspirationalResponse: FlightInspirationalResponse;
  oneWayData: OneWayStatus;
  pipe = new DatePipe('en-US');

  departureDateForm: FormGroup;

  constructor(private flightDestinationsService: FlightDestinationsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 180);
  }

  ngOnInit(): void {
    this.departureDateForm = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  getFlights() {
    this.flightInspirationalResponse = undefined;
    let departureDate: string = undefined;
    let duration: string = undefined;
    const startDate = this.pipe.transform(this.departureDateForm.value.start, 'yyyy-MM-dd');
    const endDate = this.pipe.transform(this.departureDateForm.value.end, 'yyyy-MM-dd');
    if (startDate) {
      departureDate = startDate;
    }
    if (startDate && endDate) {
      departureDate = startDate + ',' + endDate;
    }
    console.log('Departure date--> ', departureDate);
    if (!this.oneWayData.isOneWay) {
      duration = this.oneWayData.minDay + ',' + this.oneWayData.maxDay;
    }

    this.flightDestinationsService.getFlightDestinations(this.origin, departureDate,
      this.oneWayData.isOneWay, duration, this.isNonStop, this.maxPrice, this.viewBy, 'body', false).subscribe((res:FlightInspirationalResponse) => {
        this.flightInspirationalResponse = res;
      });
  }

  getOneWayData(data: OneWayStatus) {
    this.oneWayData = data;
  }

  showLinkDetails(linkDetail:FlightDestinationLinks) {
    this.dialog.open(InfoDialogComponent, {
      data: linkDetail
    });
  }
}
