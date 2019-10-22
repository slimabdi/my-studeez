import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'directeur',
        loadChildren:'./directeur-management/directeur-management.module#directeurManagementModule'
      },
      {
        path:'classes',
        loadChildren:'./classes-directeur/classes-directeur.module#ClassesDirecteurModule'
      },
      {
        path:'grouping',
        loadChildren:'./groups-and-grouping/groups-and-grouping.module#GroupsAndGroupingModule'
      },
      {
        path:'parents',
        loadChildren:'./parents-directeur/parents.module#ParentsDirecteurModule'
      },
      {
        path:'teachers',
        loadChildren:'./teaches/teaches.module#TeachesModule'
      },
      {
        path:'subjects',
        loadChildren:'./subjects/subjects.module#SubjectsModule'
      },
      {
        path:'scolar-perso',
        loadChildren:'./scolar-perso/scolar-perso.module#ScolarPersoModule'
      },
      {
        path:'students',
        loadChildren:'./students/students.module#StudentsModule'
      },
      {
        path:'etablissment',
        loadChildren:'./etablissment/etablissment.module#EtablissmentModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformManagementRoutingModule { }
