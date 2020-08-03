import { NgModule } from '@angular/core';
import { SitesService } from './sites/sites.service';
import { RouterModule } from '@angular/router';
import { SiteModuleRoutingModule } from './siteModule-routing.module';
import { CommonModule } from '@angular/common';
import { SitesComponent, NgbdModalSite } from './sites/sites.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        SitesComponent,
    ],
  
    imports: [
        CommonModule,
        SiteModuleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    providers: [
        SitesService,
        HttpClient,
        FormBuilder,
    ],
    bootstrap: [SitesComponent],
    entryComponents: [

    ],
  })
  export class SiteModule { }