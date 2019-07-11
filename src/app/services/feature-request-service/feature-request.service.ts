import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureRequestService {

  private requests$:Subject<FeatureRequest> = new Subject<FeatureRequest>();
  private requestsBehavior$:BehaviorSubject<FeatureRequest> = new BehaviorSubject<FeatureRequest>(null);
  private requestsReplay$:ReplaySubject<FeatureRequest> = new ReplaySubject<FeatureRequest>(3);

  constructor() { }

  newRequest(feature:FeatureRequest) {
    this.requests$.next(feature);
    this.requestsBehavior$.next(feature);
    this.requestsReplay$.next(feature);
  }

  newRequests(features:FeatureRequest[]){
    features.forEach(x=>{
      this.requests$.next(x);
      this.requestsBehavior$.next(x);
      this.requestsReplay$.next(x);
    })
  }
  
  getSubscribableNewRequests():Observable<FeatureRequest> {    
    return this.requests$.asObservable();
  }

  getSubscribableWithLatestItem():Observable<FeatureRequest> {
    return this.requestsBehavior$.asObservable();
  }  

  getSubscribableWithFullHistory():Observable<FeatureRequest> {
    return this.requestsReplay$.asObservable();
  }
  

}
