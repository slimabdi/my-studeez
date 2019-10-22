import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
@Component({
  selector: "app-directeur",
  templateUrl: "./directeurplateform.component.html",
  styleUrls: ["./directeurplateform.component.scss"]
})
export class DirecteurComponent implements OnInit {
  title = "app";
  logurl: any = "";
  color: any;
  colorbody: any;

  closeNav() {}
  constructor(private router: Router, private authservice: AuthService) {}
  ngOnInit() {
    this.logurl = this.authservice.getlogoEcole();
    this.color = this.authservice.getSidebarColorEcole();
    this.convertHex(this.authservice.getExternColorEcole());
  }
  convertHex(color) {
    this.colorbody = color.replace("#", "");
    let r = parseInt(this.colorbody.substring(0, 2), 16);
    let g = parseInt(this.colorbody.substring(2, 4), 16);
    let b = parseInt(this.colorbody.substring(4, 6), 16);
    this.colorbody = "rgba(" + r + "," + g + "," + b + ",0.25)";
    console.log(this.colorbody);
  }
  navigation(link) {
    console.log(link);
    this.router.navigate([link]);
  }
}
