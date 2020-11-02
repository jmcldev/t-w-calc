import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ResultsService {
    private messageSource = new BehaviorSubject<object>({"defl":"0.10685", "stress": "13.33819", tolerance: "53.42336"});
    currentMessage = this.messageSource.asObservable();

    changeMessage(message: object) {
        this.messageSource.next(message);
    }
}