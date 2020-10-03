/**
 * Flight Inspiration Search
 *  Before using this API, we recommend you read our **[Authorization Guide](https://developers.amadeus.com/self-service/apis-docs/guides/authorization)** for more information on how to generate an access token.  Please also be aware that our test environment is based on a subset of the production, to see what is included in test please refer to our **[data collection](https://github.com/amadeus4dev/data-collection)**. 
 *
 * OpenAPI spec version: 1.0.4
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../config/encoder';

import { Observable } from 'rxjs';
import { FlightDestination } from '../model/flightDestination';

import { BASE_PATH, COLLECTION_FORMATS } from '../config/variables';
import { Configuration } from '../config/configuration';
import { environment } from 'src/environments/environment';
import { FlightInspirationalResponse } from '../model/flightInspirationalResponse';
import { AppConstant } from '../config/constant';


@Injectable()
export class FlightDestinationsService {

    protected basePath = environment.root;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient,
        @Optional() @Inject(BASE_PATH) basePath: string,
        @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = AppConstant.multipart_form;
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Find the cheapest destinations where you can fly to.
     * 
     * @param origin IATA code of the city from which the flight will depart  [IATA table codes](http://www.iata.org/publications/Pages/code-search.aspx) - e.g. MAD for Madrid 
     * @param departureDate The date, or range of dates, on which the flight will depart from the origin. Dates are specified in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) YYYY-MM-DD format, e.g. 2017-12-25.   Ranges are specified with a comma and are inclusive  Departure date can not be more than 180 days in the future. 
     * @param oneWay if this parameter is set to true, only one-way flights are considered. If this parameter is not set or set to false, only round-trip flights are considered
     * @param duration Exact duration or range of durations of the travel, in days.  This parameter must not be set if oneWay is true.   Ranges are specified with a comma and are inclusive, e.g. 2,8  Duration can not be lower than 1 days or higher than 15 days 
     * @param nonStop if this parameter is set to true, only flights going from the origin to the destination with no stop in-between are considered
     * @param maxPrice defines the price limit for each offer returned. The value should be a positive number, without decimals
     * @param viewBy view the flight destinations by DATE, DESTINATION, DURATION, WEEK, or COUNTRY. View by DATE (default when oneWay is true) to get the cheapest flight destination for every departure date in the given range. View by DURATION (default when oneWay is false) to get the cheapest flight destination for every departure date and for every duration in the given ranges. View by WEEK to get the cheapest flight destination for every week in the given range of departure dates. View by COUNTRY to get the cheapest flight destination by country. Note that specifying a detailed view but large ranges may result in a huge number of flight destinations being returned. For some very large numbers of flight destinations, the API may refuse to provide a response
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFlightDestinations(origin: string, departureDate?: string, oneWay?: boolean, duration?: string, nonStop?: boolean, maxPrice?: number, viewBy?: 'COUNTRY' | 'DATE' | 'DESTINATION' | 'DURATION' | 'WEEK', observe?: 'body', reportProgress?: boolean): Observable<FlightInspirationalResponse>;
    public getFlightDestinations(origin: string, departureDate?: string, oneWay?: boolean, duration?: string, nonStop?: boolean, maxPrice?: number, viewBy?: 'COUNTRY' | 'DATE' | 'DESTINATION' | 'DURATION' | 'WEEK', observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FlightInspirationalResponse>>;
    public getFlightDestinations(origin: string, departureDate?: string, oneWay?: boolean, duration?: string, nonStop?: boolean, maxPrice?: number, viewBy?: 'COUNTRY' | 'DATE' | 'DESTINATION' | 'DURATION' | 'WEEK', observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FlightInspirationalResponse>>;
    public getFlightDestinations(origin: string, departureDate?: string, oneWay?: boolean, duration?: string, nonStop?: boolean, maxPrice?: number, viewBy?: 'COUNTRY' | 'DATE' | 'DESTINATION' | 'DURATION' | 'WEEK', observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (origin !== undefined && origin !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_origin, <any>origin);
        }
        if (departureDate !== undefined && departureDate !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_departure_date, <any>departureDate);
        }
        if (oneWay !== undefined && oneWay !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_one_way, <any>oneWay);
        }
        if (duration !== undefined && duration !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_duration, <any>duration);
        }
        if (nonStop !== undefined && nonStop !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_non_stop, <any>nonStop);
        }
        if (maxPrice !== undefined && maxPrice !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_max_price, <any>maxPrice);
        }
        if (viewBy !== undefined && viewBy !== null) {
            queryParameters = queryParameters.set(AppConstant.query_param_view_by, <any>viewBy);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            AppConstant.header_amadeus_json,
            AppConstant.header_json
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            AppConstant.header_amadeus_json,
            AppConstant.header_json
        ];

        return this.httpClient.get<FlightDestination>(`${this.basePath}${environment.flightDestination}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
