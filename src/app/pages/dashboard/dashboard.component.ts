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

    constructor(private dataService: DataService) {}

    private accessToken: string = 'YOUR_API';

    ngOnInit(){
      let labels: any[];
      let deathData: any[];
      // GET data from API
      this.dataService
      .getAllCases()
      .subscribe((data: any) => {
        console.log(data);
        this.allCovidData = data;
      });

      this.dataService
      .getAllCountriesCases()
      .subscribe((data: any) => {
        console.log(data);
        this.allCountryCases = data;
        console.log(this.allCountryCases)
      })

      labels = this.allCountryCases.slice(0,5).map(country => country.country);
      deathData = this.allCountryCases.slice(0,5).map(country => country.deaths);

      
    
      console.log('labels ', labels, deathData, this.allCountryCases)

      let myChart = new Chart("myChart", {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Votes',
                data: deathData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                  }]
              }
          }
        });
      }
    
}
