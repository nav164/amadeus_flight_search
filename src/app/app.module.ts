import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightDestinationsService } from '../app/service/flightDestinations.service';
import { FlightDestinationComponent } from './component/flight-destination/flight-destination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { HeaderComponent } from './component/header/header.component';
import { AuthService } from 'src/app/service/auth.service'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoadingService } from './service/loading.service';
import { HttpRequestInterceptor } from './service/http-request.interceptor';
import { RangeOnReturnComponent } from './component/range-on-return/range-on-return.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './component/data-table/data-table.component';
import { InfoDialogComponent } from './component/info-dialog/info-dialog.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    FlightDestinationComponent,
    HeaderComponent,
    RangeOnReturnComponent,
    DataTableComponent,
    InfoDialogComponent
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [FlightDestinationsService, 
    AuthService, 
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
