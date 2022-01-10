import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    // Fetched Data
    public allCovidData: any;
    public singleCase: any;

    public displayedColumns: string[] = ['position', 'country', 'cases', 'deaths'];
    // Manipulated Data
    public labels: string[] = [];
    public deathData: number[] = [];
    public cases: number[] = [];
    public recovered: number[] = [];
    
    constructor(private dataService: DataService) {}

    async ngOnInit(){
      // GET data from API
      await this.getAllCovidData();
      await this.getAllCountriesCases();
      await this.getSingleCountryCase("USA");
    }
    searchCountry(event) {
      this.getSingleCountryCase(event.target.value);
    }
    getAllCovidData(): void {
      this.dataService
        .getAllCases()
        .subscribe((data: any) => {
          this.allCovidData = data;
        }, 
        error => {console.error(error)});
    }

  getAllCountriesCases(): void {
    this.dataService
      .getAllCountriesCases()
      .subscribe((data: any) => {
        data.sort((a,b) => b.cases-a.cases)
        data.slice(0,20).map(country => {
          this.labels.push(country.country);
          this.deathData.push(country.deaths); 
          this.cases.push(country.cases);
          this.recovered.push(country.recovered)
        });
        let canvas = document.getElementById("myChart")
        let myChart = new Chart(canvas, {
          type: 'horizontalBar',
          data: {
              labels: this.labels,
              datasets: [{
                  label: 'Cases',
                  data: this.cases,
                  backgroundColor:  Array.from({length:20},()=> 'rgba(153, 102, 255, 0.2)'),
                  borderColor: Array.from({length:20}, () => 'rgba(153, 102, 255, 1)'),
                  borderWidth: 1
              }, 
              {
                label: 'Recovered',
                  data: this.recovered,
                  backgroundColor:  Array.from({length:20},()=> 'rgba(75, 192, 192, 0.2)'),
                  borderColor: Array.from({length:20}, () => 'rgba(75, 192, 192, 1)'),
                  borderWidth: 1
              },
              {
                label: 'Deaths',
                  data: this.deathData,
                  backgroundColor:  Array.from({length:20},()=> 'rgba(255, 99, 132, 0.2)'),
                  borderColor: Array.from({length:20}, () => 'rgba(255, 99, 132, 1)'),
                  borderWidth: 1
              },
            ]
          },
          showTooltips: false});
    }, 
    error => {console.error(error)})
  }
    
    getSingleCountryCase(countryName: string): void {
      this.dataService
        .getSingleCountryCases(countryName)
        .subscribe((data: any) => {
          this.singleCase = data;
        }, 
        error => {console.error(error)})
    }

    
}
