import { GeoCoordinates, Address } from '.';

export class ActionPoint {
    public id: number;
    public geoLocation: GeoCoordinates;
    public name: string;
    public address: Address;
}
