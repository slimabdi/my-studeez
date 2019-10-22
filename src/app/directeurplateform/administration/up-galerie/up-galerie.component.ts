import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {UpGalerieService} from "../../../services/UpGalerie.service";
import {UpGalerie} from "../../../modelsDirecteurPlateform/UpGalerie.model";
import {Album} from "../../../modelsDirecteurPlateform/Album.model";
import { ActivatedRoute } from '@angular/router';
import {GalerieService} from "../../../services/galerie.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-up-galerie',
  templateUrl: './up-galerie.component.html',
  styleUrls: ['./up-galerie.component.css']
})
export class UpGalerieComponent implements OnInit {
  G_icon: any = true;
  iconM: any = true;
  iconS: any = true;
  iconAdd: any = false;
  iconSupp: any = false;
  addimage:any="";

   public _opened: boolean = false;

   public _toggleSidebar() {
    this._opened = !this._opened;
  }

  data: any = [];
  upgalerie:UpGalerie=new UpGalerie();
  album:Album=new Album();
  temupgalerie:any ='';
  temimage:any='';
  titrealbum:string="";
  idalbum:number=0;


  colors: any = {
    red: {
      primary: '#ed5937',
      secondary: '#fcd2d1',

    },
    blue: {
      primary: '#83bcb8',
      secondary: '#d2f4f2'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  name = 'slideToggle';
  id = '1';
  checked = false;
  disabled = false;
  label = 'Toggle On/Off';
  labelledby = 'Some Other Text';


  gaugeType = 'full';
  gaugeSize = 50 ;
  gaugeValue = 73;
  gaugeLabel = '';
  gaugeAppendText = '%';

  view: string = 'month';



  onChange(value: boolean) {
    /* Your business logic goes here. */
  }
  constructor(public router:Router, public authservice:AuthService, public upgalerieservice:UpGalerieService, public galerieservice : GalerieService , public  http :HttpClient,private route: ActivatedRoute)
  {
    this.getListimages();


  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.idalbum = params['id'];
      this.titrealbum = params['titre']
    })



  }



  getListimages()
  {

   /* this.upgalerieservice.getalbumsEcole().subscribe(res=>{

        this.data=res;
        console.log("*******************************",this.data)


    })*/

    this.upgalerieservice.getalbumsEcole().subscribe(res=>{
      for(var i=0;i<res.length;i++)
      {if (res[i].id==this.idalbum) {

        this.data = res[i].Docs;
        console.log("*******************************", this.data)
      }
      }


    })



  }

  supprimeralbum()
{
  this.galerieservice.deletealbum(this.idalbum).subscribe(res=>{
      this.router.navigate(['/directeurplateform/administration/galerie']);


  console.log("*******************************",this.data)
})



}


  supprimerfichier(id){
    this.upgalerieservice.deleteimage(id).subscribe(res => {
      this.getListimages();


    });
  }
  modalzum(temimage){

  this.temimage=temimage;
}


  modalSupp(temupgalerie){

    this.temupgalerie=temupgalerie;
  }

  initialiseSidebar()
  {
    this.upgalerie = new UpGalerie

  }

  ajouterfichier(image){




    this.upgalerieservice.Addfichier(image,this.idalbum).subscribe(resp => {
      console.log(resp);

      this.data.emit(true);

    });


  }

  uploadImage(event){

    let selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("image", selectedFile, selectedFile.name);
    this.http
      .post(this.authservice.getSubDomain() + "/upload", fd)
      .subscribe(res => {
        console.log("res", res);
        this.addimage = res;
        this.ajouterfichier(this.addimage);


      });
  }
}
