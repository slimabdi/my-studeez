import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Galerie} from "../../../../modelsDirecteurPlateform/Galerie.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth.service";
import {GalerieService} from "../../../../services/galerie.service";

@Component({
  selector: 'app-sidebargalerie',
  templateUrl: './sidebargalerie.component.html',
  styleUrls: ['./sidebargalerie.component.css']
})
export class SidebargalerieComponent implements OnInit {
  @Input() type:any='M'
  @Input() galerie:Galerie=new Galerie()
  @Output() data = new EventEmitter<boolean>();

  icone: any = "";
  selectedFile: File = null;

  constructor(private galerieService: GalerieService,private authservice:AuthService,public http: HttpClient)
  {}

  ngOnInit() {
    this.galerie.files=[{
      titre: '', image:null, type:'1'
    },
      {
        titre: '', image:null, type:'2'
      }]

  }
  uploadImage(event,i){
    console.log(event.target.files[0]);
    this.galerie.files[i].titre=event.target.files[0].name;
    let selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.http
      .post(this.authservice.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
      this.galerie.files[i].image = res;
        this.galerie.files[i].type=i+1;

      });
}
  ajoutergalerie(){

    console.log('ajout',this.galerie);

    if(this.type=='A') {
      this.galerie.idEcole = this.authservice.getIdSelectedEcole();
      this.galerieService.Addalbum(this.galerie).subscribe(resp => {
        console.log(resp);

        this.data.emit(true);

      });
    }
    else if(this.type=='M') {
      this.galerie.idEcole = this.authservice.getIdSelectedEcole();
      this.galerieService.updatealbum(this.galerie).subscribe(resp => {
        this.data.emit(true);
      });
    }
  }

}
