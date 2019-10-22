import { Component, Input } from "@angular/core";
import { AbstractControlDirective, AbstractControl } from "@angular/forms";

@Component({
  selector: "show-errors",
  template: `
    <ul style="padding-left: 20px;" *ngIf="shouldShowErrors()">
      <li style="color: #b7402c;" *ngFor="let error of listOfErrors()">{{error}}</li>
    </ul>
  `
})
export class ShowErrorsComponent {
  private static readonly errorMessages = {
    required: () => "Ce champ est obligatoire",
    minlength: params =>
      "Le nombre minimum de caractères est " + params.requiredLength,
    maxlength: params =>
      "Le nombre maximum de caractères est " + params.requiredLength,
    /*    'pattern': (params) => 'Le pattern obligatoire est Ex:(http(s)://www.xxx.xxx)',*/
    pattern: params => "Email invalide",
    years: params => params.message,
    countryCity: params => params.message,
    uniqueName: params => params.message,
    telephoneNumbers: params => params.message,
    telephoneNumber: params => params.message,
    email: () => "Email invalide",

    siteWeb: params => params.message
  };

  @Input() private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors).map(field =>
      this.getMessage(field, this.control.errors[field])
    );
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }
}
export class ShowErrorsComponentpersonnel extends ShowErrorsComponent {}
export class ShowErrorsComponentpersonnel2 extends ShowErrorsComponent {}
export class ShowErrorsComponentdir extends ShowErrorsComponent {}
export class ShowErrorsComponentdir2 extends ShowErrorsComponent {}
export class ShowErrorsComponentmatiere extends ShowErrorsComponent {}
export class ShowErrorsComponenteleve extends ShowErrorsComponent {}
export class ShowErrorsComponentenseignant extends ShowErrorsComponent {}
export class ShowErrorsComponentEcole extends ShowErrorsComponent {}
export class ShowErrorsComponentparent extends ShowErrorsComponent {}
export class ShowErrorsSidebarparentComponent extends ShowErrorsComponent {}
export class ShowErrorsSidebarSubjectComponent extends ShowErrorsComponent {}
export class ShowErrorsSidebarStudentComponent extends ShowErrorsComponent {}
export class ShowErrorssuperAdminComponent extends ShowErrorsComponent {}
export class ShowErrorssuperGalerieComponent extends ShowErrorsComponent {}
