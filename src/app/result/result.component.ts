import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultsService } from '../results.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, OnDestroy {

  result;
  isInvalid = false;
  isAcceptable = true;
  subscription: Subscription;

  constructor(private resultsService: ResultsService) { }

  // ngOnInit() {
  //   this.subscription = this.resultsService.currentMessage.subscribe((message: any) => {this.result = message; console.log(message.defl)});
  // }

  // ngOnInit() {
  //   this.subscription = this.resultsService.currentMessage.subscribe(function (message) {
  //     this.result = message;
  //   });
  // }

  ngOnInit() {
    this.subscription = this.resultsService.currentMessage.subscribe((message: any) => {
      this.result = message;
      if (message.tolerance > 100) {
        this.isInvalid = true;
      } else {
        this.isInvalid = false;
      }

      if (message.tolerance < 80) {
        this.isAcceptable = true;
      } else {
        this.isAcceptable = false;
      }
    });
  }

  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

}
