import { AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlightDestination } from 'src/app/model/flightDestination';
import { FlightInspirationalResponse } from 'src/app/model/flightInspirationalResponse';
import { MatPaginator } from '@angular/material/paginator';
import { FlightDestinationLinks } from 'src/app/model/flightDestinationLinks';

export interface InspirationalData {
  position: string;
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: string;
  links: string;
}

const ELEMENT_DATA: InspirationalData[] = [];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'type', 'origin', 'destination', 'departureDate', 'returnDate', 'price', 'links'];
  dataSource: any;

  _inputData: FlightInspirationalResponse;
  currencyUnit: string;
  @Input() set inputData(value: FlightInspirationalResponse) {
    this._inputData = value;
    this.dataSource = new MatTableDataSource(this._inputData.data);
    this.currencyUnit = Object.keys(this._inputData.dictionaries.currencies)[0];
  }

  @Output() linkDetailsEmitter = new EventEmitter<FlightDestinationLinks>();

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  showLinks(links: FlightDestinationLinks) {
    this.linkDetailsEmitter.emit(links);
  }

  getToolTipData(key: string): string {
    Object.keys(this._inputData.dictionaries.locations)
    if (key in this._inputData.dictionaries.locations) {
      return `Sub type : ${this._inputData.dictionaries.locations[key].subType} | Name : ${this._inputData.dictionaries.locations[key].detailedName}`;
    }
    return `Data not available`;
  }
}
