import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
import { Subject } from "rxjs";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from "angular-calendar";
import { ScheduleService } from "../../../../services/schedule.service";
@Component({
  selector: "app-schedule-student",
  templateUrl: "./schedule-student.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    "../../../../../assets/scss/directeur/angular-calendar/angular-calendar.scss"
  ]
})
export class ScheduleStudentComponent {
  showclass: any = true;
  course: any = {};
  type: any = "Cours";
  mode: any = "create";
  loading: any = false;
  colors: any = {
    red: {
      primary: "#ed5937",
      secondary: "#fcd2d1",
      color: "#ed5937"
    },
    blue: {
      primary: "#83bcb8",
      secondary: "#d2f4f2"
    },
    yellow: {
      primary: "#e3bc08",
      secondary: "#FDF1BA"
    }
  };
  view: string = "week";

  viewDate: Date = new Date();
  options: any = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-trash-o	"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
      }
    }
  ];
  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;
  constructor(public scheduleService: ScheduleService) {}
  activeClass() {
    if (!this.showclass) {
      this.showclass = true;
    }
  }

  activeEns() {
    if (this.showclass) {
      this.showclass = false;
    }
  }
  _opened: boolean = false;

  _toggleSidebar() {
    if (!this._opened) {
      this._opened = !this._opened;
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log("action=>", action);
    console.log("event=>", event);
    this.course = event.id;
    this.mode = true;
    this.type = "Cours";
    this._toggleSidebar();
  }
  dayClicked(day) {
    console.log("day", day);
  }
  
  createSidebar() {
    this.type = "Cours";
    this.mode = false;
    this.course = {};
    this._toggleSidebar();
  }

  getbackgroud(color) {
    color = color.replace("#", "");
    console.log(parseInt(color, 16));

    if (color.length == 6) {
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      color = "rgba(" + r + "," + g + "," + b + ",0.25)";
      return color;
    } else {
      let r = parseInt(color.substring(0, 1), 16);
      let g = parseInt(color.substring(1, 2), 16);
      let b = parseInt(color.substring(2, 3), 16);
      color = "rgba(" + r + "," + g + "," + b + ",0.25)";
      return color;
    }
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  addEvent(obj): void {
    this.events.push({
      title: "",
      start: new Date(obj.du),
      end: obj.au ? new Date(obj.au) : endOfDay(new Date(obj.du)),
      color: {
        primary: obj.codeCouleur,
        secondary: this.getbackgroud(obj.codeCouleur)
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      actions: [
        {
          label:
            '<div  style="font-weight: bold; font-size: 15px; color:' +
            obj.codeCouleur +
            '" >' +
            obj.Matiere
              ? obj.Matiere.nomMatiere
              : "" + "</div></br> - ",
          onClick: ({ event }: { event: CalendarEvent }): void => {}
        },
        {
          label:
            '<p  style="font-weight: bold; font-size: 15px; color:' +
              obj.codeCouleur +
              '" >' +
              obj.enseig && obj.enseig != null
              ? (obj.enseig.nom ? obj.enseig.nom : "") +
                " " +
                (obj.enseig.prenom ? obj.enseig.prenom : "")
              : "" + "</p> - ",
          onClick: ({ event }: { event: CalendarEvent }): void => {}
        },
        {
          label:
            '<p  style="font-weight: bold; font-size: 15px; color:' +
            obj.codeCouleur +
            '" >' +
            obj.Salle
              ? obj.Salle.nomSalle
              : "" + "</p> - ",
          onClick: ({ event }: { event: CalendarEvent }): void => {}
        }
      ],
      id: obj
    });
    this.refresh.next();
  }
  ngOnInit() {
    this.getAllEvents();
    console.log(this.getbackgroud("#efd"));
  }
  refreshEvents() {
    this.events = [];
    this._opened=false
    this.getAllEvents();
  }
  getAllEvents() {
    this.loading = true;
    this.scheduleService.getAllSeances().subscribe(res => {
      console.log("res", res);
      res.forEach((element, index) => {
        this.addEvent(element);
        if (index == res.length - 1) {
          this.loading = false;
        }
      });
    });
  }
}
