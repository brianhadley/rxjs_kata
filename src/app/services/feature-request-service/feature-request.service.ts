import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureRequestService {
  
  constructor() { }

  newRequest(feature:FeatureRequest) {
    
  }

  newRequests(features:FeatureRequest[]){
    
  }
  
  getSubscribableNewRequests():Observable<FeatureRequest> {    
    return undefined;
  }

  getSubscribableWithLatestItem():Observable<FeatureRequest> {
    return undefined;
  }  

  getSubscribableWithFullHistory():Observable<FeatureRequest> {
    return undefined;
  }
  

}
