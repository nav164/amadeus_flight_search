import { FlightDestination } from './flightDestination';
import { Dictionaries } from './dictionaries';
import { Meta } from './meta';

export interface FlightInspirationalResponse {
    /**
     * the resource name
     */
    data: FlightDestination[];
    dictionaries: Dictionaries;
    meta: Meta;
}
