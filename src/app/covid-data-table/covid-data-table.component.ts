import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CovidDataTableDataSource, CovidDataTableItem } from './covid-data-table-datasource';
import { DataService } from '../data.service';

@Component({
  selector: 'covid-data-table',
  templateUrl: './covid-data-table.component.html',
  styleUrls: ['./covid-data-table.component.css']
})
export class CovidDataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CovidDataTableItem>;
  dataSource: CovidDataTableDataSource;

  constructor (private dataService: DataService) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['country', 'cases', 'deaths', 'recovered'];

  ngOnInit() {
    this.dataSource = new CovidDataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
