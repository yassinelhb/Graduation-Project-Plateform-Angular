import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { LoginComponent } from './login/login.component';
import { SheetpfeComponent } from './sheetpfe/sheetpfe.component';
import { ShowSheetpfeComponent } from './sheetpfe/show-sheetpfe/show-sheetpfe.component';
import { InternshipagreementComponent } from './internshipagreement/internshipagreement.component';
import { ShowInternshipagreementComponent } from './internshipagreement/show-internshipagreement/show-internshipagreement.component';
import { NotifySheetpfeComponent } from './sheetpfe/notify-sheetpfe/notify-sheetpfe.component';
import { SoutenanceComponentComponent } from './soutenance-component/soutenance-component.component';
import { ReclamationComponent } from './soutenance-component/reclamation/reclamation.component';
import { ReclamationDisplayComponent } from './soutenance-component/reclamation-display/reclamation-display.component';
import { NotificationRSComponent } from './soutenance-component/notification-rs/notification-rs.component';


import { ForumComponent } from './forum/forum.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ReponseComponent } from './reponse/reponse.component';

import { AdminsComponent } from './admins/admins.component';
import { SoutenanceComponent } from './soutenance/soutenance.component';

import { EtudiantnosheetComponent } from './sheetpfe/etudiantnosheet/etudiantnosheet.component';
import { EcoleComponent } from './ecole/ecole.component';
import { DepartementsComponent } from './departements/departements.component';
import { SitesComponent } from './siteModule/sites/sites.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { ClassesComponent } from './classes/classes.component';
import { EnseignantsComponent } from './enseignants/enseignants.component';
import { EtudiantsComponent } from './etudiants/etudiants.component';





const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'buttons', component: ButtonsComponent }, 
  { path: 'tables', component: TablesComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'accordions', component: AccordionsComponent },
  { path: 'badges', component: BadgesComponent },
  { path: 'progressbar', component: ProgressbarComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'dropdowns', component: DropdownComponent },
  { path: 'tooltips', component: TooltipsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sheet', component: SheetpfeComponent },
  { path: 'internship', component: InternshipagreementComponent },
  { path: 'internship/:id', component: ShowInternshipagreementComponent },
  { path: 'sheet/notify', component: NotifySheetpfeComponent },
  { path: 'sheet/planning', component: ShowSheetpfeComponent },
  { path: 'sheet/:id', component: ShowSheetpfeComponent },
  { path: 'etudiant/nosheet', component: EtudiantnosheetComponent },

  { path: 'soutenanceNonNote', component: SoutenanceComponentComponent },
  { path: 'soutenanceNonNote/reclamation', component: ReclamationComponent },
  { path: 'soutenanceNonNote/displayReclamation/:idNotification', component: ReclamationDisplayComponent },
  { path: 'soutenanceNonNote/notificationRS', component: NotificationRSComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'admins', component: AdminsComponent },
  {path: 'forum' , component: ForumComponent },
  {path: 'categorie' , component: CategorieComponent},
  {path: 'reponse', component: ReponseComponent},
  { path: 'admins', component: AdminsComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'categorie', component: CategorieComponent },
  { path: 'reponse', component: ReponseComponent },
  { path: 'admins', component: AdminsComponent },
  { path: 'soutenance', component: SoutenanceComponent },
  { path: 'ecole', component: EcoleComponent },
  { path: 'departements/:id', component: DepartementsComponent },
  { path: 'departements', component: DepartementsComponent },
  { path: 'specialites/:id', component: SpecialitesComponent },
  { path: 'specialites', component: SpecialitesComponent },
  { path: 'classes/:id', component: ClassesComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'etudiants/:id', component: EtudiantsComponent },
  { path: 'etudiants', component: EtudiantsComponent },
  { path: 'sites', loadChildren: './siteModule/siteModule.module#SiteModule' },
  { path: 'enseignants', component: EnseignantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
