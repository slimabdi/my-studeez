import { Component, OnInit,Input } from "@angular/core";

@Component({
  selector: "app-nav-sidebar",
  templateUrl: "./nav-sidebar.component.html",
  styleUrls: ["./nav-sidebar.component.css"]
})
export class NavSidebarComponent implements OnInit {
  @Input() logo :any=''
  @Input() color :any
  @Input() colorbody :any
  title = "app";
  MENU: any = [
    {
      title: "MENU",
      content: [
        {
          title: "Accueil",
          link: "",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Mes rendez-vous",
          link: "",
          icon: "fa fa-gear fa-fw"
        }
      ]
    },
    {
      title: "ADMINISTRATION",
      content: [
        {
          title: "Calendrier Scolaire ",
          link: "administration/scolar-calendar",
          icon: " fa fa-calendar fa-fw",
        },
        {
          title: "Documents administratifs",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Documents administratifs",
              link: "",
            },
            {
              title: "Documents administratifs signés (admin./directeurs)",
              link: "",
            },
            {
              title: "Mes documents administratifs signés",
              link: "",
            }
          ]
        },
        {
          title: "Galerie",
          link: "administration/galerie",
          icon: "fa fa-image fa-fw"
        },
        {
          title: "Réservations de locaux et matériel",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Réservations",
              link: "",
            },
            {
              title: "Locaux",
              link: "",
            },
            {
              title: "Matériel",
              link: "",
            }
          ]
        }
      ]
    },
    {
      title: "VIE SCOLAIRE",
      content: [
        {
          title: "Emploi du temps",
          link: "scholar-life/schedule",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Emploi du temps des classes",
              link: "scholar-life/schedule/teacher",
            },
            {
              title: "Emploi du temps des enseignants",
              link: "scholar-life/schedule/student",
            }
          ]
        },
        {
          title: "Documents pédagogiques",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Cours en classe",
              link: "",
            },
            {
              title: "Fichiers pédagogiques",
              link: "",
            }
          ]
        },
        {
          title: "Travaux à rendre ",
          link: "scholar-life/traveau",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Absences et retards",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Appel en salle",
              link: "scholar-life/lates/calls",
            },
            {
              title: "Justificatifs",
              link: "scholar-life/lates/justifications",
            },
            {
              title: "Bilan des absences",
              link: "scholar-life/lates/absences",
            }
          ]
        },
        {
          title: "Carnet de correspondance",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Observations & sanctions",
              link: "",
            },
            {
              title: "Suivi des élèves",
              link: "",
            }
          ]
        },
        {
          title: "Notes",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Notes",
              link: "scholar-life/notes_and_report/notes",
            },
            {
              title: "Bilan des notes",
              link: "scholar-life/notes_and_report/reports",
            }
          ]
        },
        {
          title: "Bulletins",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Conseil de Classe",
              link: "",
            },
            {
              title: "Bulletin des élèves",
              link: "",
            },
            {
              title: "Bulletin des classes",
              link: "",
            }
          ]
        },
        {
          title: "Infirmerie",
          link: "",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Passage en infirmerie",
              link: "scholar-life/infirmerie",
            },
            {
              title: "Carnet de santé",
              link: "",
            }
          ]
        },
        {
          title: "Mon drive",
          link: "",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Mon office",
          link: "",
          icon: "fa fa-gear fa-fw"
        }
      ]
    },
    {
      title: "GESTION PLATEFORME",
      content: [
        {
          title: "L établissement",
          link: "platform-management/etablissment/general-info",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Informations générales",
              link: "platform-management/etablissment/general-info",
            },
            {
              title: "Présentation plateforme",
              link: "platform-management/etablissment/presentation",
            },
            {
              title: "Périodes scolaires",
              link: "platform-management/etablissment/periodes",
            },
            {
              title: "Données serveur",
              link: "platform-management/etablissment/server-info",
            }
          ]
        },
        {
          title: "Directeurs",
          link: "platform-management/directeur",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Personnel scolaire",
          link: "platform-management/scolar-perso",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Enseignants",
          link: "platform-management/teachers",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Classes",
          link: "platform-management/classes/scolar-class",
          icon: "fa fa-gear fa-fw",
          SMenu: [
            {
              title: "Classes",
              link: "platform-management/classes/scolar-class",
            },
            {
              title: "Niveaux d'apprentissage",
              link: "platform-management/classes/scolar-level",

            }
          ]
        },
        {
          title: "Matières",
          link: "platform-management/subjects",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Élèves",
          link: "platform-management/students",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Parents",
          link: "platform-management/parents",
          icon: "fa fa-gear fa-fw"
        },
        {
          title: "Groupes et regroupements",
          link: "platform-management/grouping",
          icon: "fa fa-gear fa-fw"
        }
      ]
    }
  ];
  public _opened: boolean = false;
   public _openedDate: boolean = false;
   public _openedFiltre: boolean = false;

   public _toggleSidebarNav() {
    this._opened = !this._opened;
    if(this._openedDate && this._openedFiltre){
      this._openedDate = false;
      this._openedFiltre=false;

    }
  }






   public _toggleDate() {
    this._openedDate = !this._openedDate;
    if(this._opened && this._openedFiltre){
      this._opened = false;


    }

  }





   public _toggleFiltre() {
    this._openedFiltre = !this._openedFiltre;
    if(this._openedDate && this._opened){
      this._openedFiltre = false;

    }

  }
  closeNav() {}
  constructor() {}

  ngOnInit() {}
}
