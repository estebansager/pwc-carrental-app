import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class SortService {
    constructor() {}

    sort<T>(array: T[], key: string, asc: boolean): T[] {
        return array.sort(function (a, b) {
            if (a[key] < b[key]) return (asc ? -1 : 1);
            if (a[key] > b[key]) return (asc ? 1 : -1);
            return 0;
        });
    }
  

}

