import { Component,  Input,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../home/home.component';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {
  @Input() darkMode: boolean;
  @Input() menuName = 'Flight';

  @Input() menu: Menu;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.darkMode = false;
  }

  openDetails() {
    if (true) {
      this.router.navigateByUrl('flight');
    }
  }
}

