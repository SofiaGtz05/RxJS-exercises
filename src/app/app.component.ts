import { Component } from '@angular/core';
import { RxjsService } from './shared/services/rxjs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private rxjsService: RxjsService) {
    this.rxjsService.exampleDebounceTime().subscribe();
  }
}
