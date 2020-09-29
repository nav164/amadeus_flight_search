import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlightInspirationalResponse } from 'src/app/model/flightInspirationalResponse';
import { MatPaginator } from '@angular/material/paginator';
import { FlightDestinationLinks } from 'src/app/model/flightDestinationLinks';

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

  /**
   * This method will emit the FlightDestinationLinks object to its parent
   * @author Naveen
   * @param links FlightDestinationLinks
   */
  showLinks(links: FlightDestinationLinks) {
    this.linkDetailsEmitter.emit(links);
  }

  /**
   * Generate the tooltip message according to given location code
   * @author Naveen
   * @param key string
   * @returns string
   */
  getToolTipData(key: string): string {
    Object.keys(this._inputData.dictionaries.locations)
    if (key in this._inputData.dictionaries.locations) {
      return `Sub type : ${this._inputData.dictionaries.locations[key].subType} | Name : ${this._inputData.dictionaries.locations[key].detailedName}`;
    }
    return `Data not available`;
  }
}
