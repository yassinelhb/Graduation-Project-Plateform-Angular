import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SitesComponent } from './sites/sites.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: SitesComponent }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports: [RouterModule]
  })
  export class SiteModuleRoutingModule { }