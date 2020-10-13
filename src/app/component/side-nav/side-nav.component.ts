import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() showMenu;
  @Output() showMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  userEmail = 'naveen.deism@gmail.com'; 
  constructor(public router: Router,
    public loadingService: LoadingService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    this.showMenuChange.emit(this.showMenu);
  }

  modeToggleSwitch() {
    //this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    //this.sub1.unsubscribe();
  }

  logout() {
    this.toggleMenu();
    this.authService.logout();
  }

}
