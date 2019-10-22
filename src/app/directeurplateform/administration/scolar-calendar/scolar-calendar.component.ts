import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

@Component({
  selector: 'app-scolar-calendar',
  templateUrl: './scolar-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./scolar-calendar.component.css']
})
export class ScolarCalendarComponent  {

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
  view: string = 'week';

  viewDate: Date = new Date();
  options:any=[
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
         console.log(event)      }
    },
    {
      label: '<i class="fa fa-fw fa-trash-o	"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
      }
    }
    ]
  events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      color: this.colors.blue,
      start: new Date(),
      end: addDays(new Date(), 1), // an end date is always required for resizable events to work
      draggable: true,
      actions:this.options,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      }
    },
    {
      title: 'A non resizable event',
      color: this.colors.red,
      start: new Date(),
      end: addDays(new Date(), 0),
      draggable: true,
      actions:this.options,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor() {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
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


  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: this.colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  ngOnInit() {
  }

}
