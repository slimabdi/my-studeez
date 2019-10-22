import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "galerie",
        loadChildren: "./galerie/galerie.module#GalerieModule"
      },
      {
        path: "album",
        loadChildren: "./up-galerie/up-galerie.module#UpGalerieModule"
      },
      {
        path: "scolar-calendar",
        loadChildren: "./scolar-calendar/scolar-calendar.module#ScolarCalendarModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
