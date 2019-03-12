import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TimeTracker';

  toasterConfig = new ToasterConfig({
    animation: 'fade',
    limit: 5
  });
}
