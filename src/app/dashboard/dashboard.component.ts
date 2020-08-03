import { Component, OnInit, Inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { isUndefined } from 'util';
import { User } from '../Models/user';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Admin } from '../Models/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Nombre Des Etudiant' },
  ];
  loading: boolean = true;
  loadingStats: boolean = true;
  offres: any[] = [];
  stats: any;
  user: Admin;
  isAdmin = false;
  place:string="europe";
  selectChangeHandler (event: any) {
    this.place = event;
    this.getOffres(this.place);
  }
  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  goToLink(url: string) {
    window.open(url, "_blank");
  }
  ngOnInit() {
    this.loadingStats=true;
    this.user = this.storage.get('user');
    if (this.user.role === "Admin" && this.user.ecole !== null) {
      this.isAdmin = true;
      this.dashboardService.getStats(this.user.ecole.id).subscribe(
        data => {
          this.stats=data;
          this.loadingStats=false;
        }
      )
    }
    this.dashboardService.statEtrangerSheet().subscribe(data => {
      data.forEach(e => {
        this.barChartLabels.push(e[0]);
        this.barChartData[0].data.push(e[1]);
      });
    });
    this.getOffres(this.place);
  }
  getOffres(location:string){
    this.loading=true;
    this.offres=[];
    this.dashboardService.getOffres(location).subscribe(data => {
      for (var i = 0; i < 5; i++) {
        var j = this.entierAleatoire(0, data.length);
        var offre = data[j];
        if (!isUndefined(data[j]))
          this.offres.push(data[j]);
      }
      console.log(this.offres);
      this.loading = false
    },
      error => {
        console.log(error);
        this.loading = false;
      })
  }


}
