import { Observable, Subject } from 'rxjs';

class EventService {
  private subject = new Subject<any>();

  emit(eventName: string, payload: any) {
    this.subject.next({ eventName, payload });
  }

  listen(eventName: string, callback: (event: any) => void) {
    this.subject.asObservable().subscribe((event) => {
      if (eventName === event.eventName) {
        callback(event.payload);
      }
    });
  }
}

export default new EventService();
