import { Component } from '@angular/core';
import events from '../event.service';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  initializeAddForm() {
    events.emit('initializeAddForm', '');
  }
}
