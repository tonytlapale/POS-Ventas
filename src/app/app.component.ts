import { Component, VERSION } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POS-APP-PROYECT';

 /*  name = 'Angular ' + VERSION.major;
  cookieValue = '';
  constructor(public cookieService: CookieService) {
    this.cookieService.set('X-Auth-Token', uuidv4());
    this.cookieValue = this.cookieService.get('X-Auth-Token');
  } */
}


