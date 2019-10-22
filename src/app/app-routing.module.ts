import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { HomeGroupeScolaireComponent } from './home-groupe-scolaire/home-groupe-scolaire.component';
import {ConnexionComponent } from './connexion/connexion.component';
import { WelcomepgeComponent } from './welcomepge/welcomepge.component';

const routes: Routes =  [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'admin',component:ConnexionComponent},
  {path: 'welcome',component:WelcomepgeComponent},
  {
    path: 'home',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'directeurplateform',
    loadChildren: './directeurplateform/directeurplateform.module#DirecteurplatformModule'
  },
  {
    path: 'groupescolaire',
    loadChildren: './connexion-groupe/connexion-groupe.module#ConnexionGroupeModule',
  },
  //routes home groupe scolaire
  {
    path: 'home-groupe-scolaire', component: HomeGroupeScolaireComponent,
  },
  { path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
