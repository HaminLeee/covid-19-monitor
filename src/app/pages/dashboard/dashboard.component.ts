import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    public allCovidData: object = {};
    public allCountryCases: any[] = [];
    public labels: string[] = [];
    public deathData: number[] = [];
    public cases: number[] = [];
    public recovered: number[] = [];

    constructor(private dataService: DataService) {}

    getAllCovidData(): void {
      this.dataService
        .getAllCases()
        .subscribe((data: any) => {
          this.allCovidData = data;
        });
    }

    getAllCountriesCases(): void {
      this.dataService
        .getAllCountriesCases()
        .subscribe((data: any) => {
          this.allCountryCases = data;
          data.slice(0,20).map(country => {
            this.labels.push(country.country);
            this.deathData.push(country.deaths); 
            this.cases.push(country.cases);
            this.recovered.push(country.recovered)
          });
        })
    }
    private accessToken: string = 'YOUR_API';

    ngOnInit(){
      // let labels: string[];
      // let deathData: any[];
      // GET data from API
      
      this.getAllCovidData();
      this.getAllCountriesCases();
      // this.allCountryCases.slice(0,5).map(country => country.deaths);
      console.log(this.allCountryCases, this.allCovidData, this.deathData, this.labels);
      
      let myChart = new Chart("myChart", {
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
        }});

      }
    
}
