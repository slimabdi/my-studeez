import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component'
import {LayoutComponent} from "./layout/layout.component";
import { DirecteurComponent } from './directeur/directeur.component';
import {SuperAdminComponent} from "./superadmin/superadmin.component";

//authgard service
import {AuthGuard} from "../auth.guard";
const routes: Routes = [  {
  path: '',
  component: AdminComponent,
  canActivate:[AuthGuard],
  children: [
    {
      path: '',
      loadChildren:'./statistiques/statistiques.module#StatistiquesModule'
    },
    {
      path:'importation',
      loadChildren:'./importation-excel/importation-excel.module#ImportationExcelModule',
    },
    {
      path: 'classe',
      loadChildren: './classes/classes.module#ClassesModule',
    },
    {
      path: 'ecole',
      loadChildren: './ecoles/ecoles.module#EcolesModule'
    },
    {
      path: 'directeur',
      loadChildren: './directeur/directeur.module#DirecteurModule'
    },
    {
         path:'eleve',
         loadChildren:'./eleves/eleves.module#ElevesModule'
    },
    {
        path: 'enseignants',
        loadChildren:'./enseignants/enseignants.module#EnseignantsModule'
    },
    {
      path: 'groupscolaires',
      loadChildren:'./groupe-scolaires/groupe-scolaires.module#GroupeScolairesModule'
    },
    {
      path: 'matiere',
      loadChildren: './matieres/matieres.module#MatieresModule'
    },
    {
      path: 'parent',
      loadChildren: './parents/parents.module#ParentsModule',
    },
    {
      path: 'personnel',
      loadChildren: './personnelscolaire/personnelscolaire.module#PersonnelscolaireModule'
    },
    {
      path: 'superadmin',
      loadChildren: './superadmin/superadmin.module#SuperadminModule'
    }
   ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
