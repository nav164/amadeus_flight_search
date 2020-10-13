import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service'
import { LoadingService } from 'src/app/service/loading.service';
import {delay} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'amadeus-flight-search';
  loading: boolean = false;
  darkModeActive: boolean;
  showMenu: boolean = false;
  constructor(private _loading: LoadingService,
    public translate: TranslateService) { }

  loggedIn = true;
  sub1;

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|vi/) ? browserLang : 'en');
    this.listenToLoading();
  }

  /**
   * Subscribe to a behaviour subject variable from service 
   * to set the local variable with boolean value.
   * @author Naveen
   * @returns void
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  modeToggleSwitch(val: boolean) {
    this.darkModeActive = val;
    this._loading.isDarkMode = val;
  }
}
