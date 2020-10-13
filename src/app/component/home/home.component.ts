import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';

export interface Menu {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menus: Menu[] = [{ id: 1, title: 'Flight', imageUrl: 'assets/icon/flight.png', description: 'Click the card to find the cheapest flights from origin to vaious destination'},
  { id: 2, title: 'Accomodation', imageUrl: 'assets/icon/hotel.png', description: 'Click the card to find out the nicest and cheapest accomodation'}];
  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
