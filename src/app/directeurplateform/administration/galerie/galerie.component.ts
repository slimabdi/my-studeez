import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {GalerieService} from "../../../services/galerie.service";
import {Galerie} from "../../../modelsDirecteurPlateform/Galerie.model"
import {Album} from "../../../modelsDirecteurPlateform/Album.model";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})

export class GalerieComponent implements OnInit {
  G_icon: any = true;
  type:any='M'
   public _opened: boolean = false;

   public _toggleSidebar() {
    this._opened = !this._opened;
  }

  data: any = [];
  term:any ='';

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

  galerie:Galerie=new Galerie();
  album:Album=new Album();
  loading: any = true;
  name = 'slideToggle';
  id = '1';
  checked = false;
  disabled = false;
  label = 'Toggle On/Off';
  labelledby = 'Some Other Text';
  tempgalerie:any={};


  gaugeType = 'full';
  gaugeSize = 50 ;
  gaugeValue = 73;
  gaugeLabel = '';
  gaugeAppendText = '%';

  view: string = 'month';

  constructor( public authservice:AuthService, public galerieservice : GalerieService , public  http :HttpClient, public toastr: ToastrService)
  {

    this.getListAlbum();

  }

  onChange(value: boolean) {
    /* Your business logic goes here. */
  }


  ngOnInit() {
    this.galerie.files=[{
      titre: '', image:null, type:'1'
    },
      {
        titre: '', image:null, type:'2'
      }]
  }
  modalSupp(tempgalerie) {

    this.tempgalerie = tempgalerie;
  }


  getalbum(galerie) {

    this.album.id = galerie.id;
    this.album.titre=galerie.titre;
    console.log(this.album.id,this.album.titre)
  }


  getListAlbum()
  {
    this.galerieservice.getalbumsEcole().subscribe(res=>{
      this.data=res;
      console.log("*******************************",this.data)
    })



  }

  deletealbum(id)
  { console.log(id)
    this.galerieservice.deletealbum(id).subscribe(res=>{
      this.getListAlbum();
      console.log("*******************************",this.data)
    })



  }

  showSuccess(massage) {
    this.toastr.success(massage, 'Succès !', {
      timeOut: 3000,
    });
  }

  updated()
  {
    this.showSuccess('Enregistrement a été effectué avec succès.')

    this.getListAlbum();

  }

  initialiseSidebar()
  {
    this.galerie = new Galerie
    this.type='A'
  }


  getGalerie(galerie){

    console.log("galerie"+galerie.titre);
    this.galerie=galerie;
    console.log(this.galerie)
    this.type='M';

  }
}
