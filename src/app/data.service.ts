import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private REST_API_SERVER_URL = "https://corona.lmao.ninja/"
  private dataStore: { countries: any[] } = {countries: []};

  constructor(private httpClient: HttpClient) { }


  public getAllCases() {
    return this.httpClient
                .get(this.REST_API_SERVER_URL + "all")
  }
  public getAllCountriesCases() {
    return this.httpClient
                .get(this.REST_API_SERVER_URL + "countries");
    // result.push(data);
    // data.slice(0,5).map(country => {labels.push(country.country)})

  }
  public getSingleCountryCases(countryName: string) {
    return this.httpClient
                .get(this.REST_API_SERVER_URL + "countries/" + countryName);
  }
  
}
