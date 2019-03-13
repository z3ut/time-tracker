import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SpinnerService } from './shared/components/spinner/spinner.service';

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

  constructor(private router: Router, private spinnerService: SpinnerService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.spinnerService.hide();
      });
  }
}
