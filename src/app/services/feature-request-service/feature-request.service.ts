import { Injectable } from "@angular/core";
import { FeatureRequest } from "src/app/model/feature-request";
import { Observable, Subject, BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FeatureRequestService {
  private featureRequestSubject: Subject<FeatureRequest> = new Subject();
  private featureRequestBehaviorSubject: BehaviorSubject<
    FeatureRequest
  > = new BehaviorSubject(null);
  private featureRequestReplaySubject: ReplaySubject<
    FeatureRequest
  > = new ReplaySubject<FeatureRequest>(3);
  constructor() {}

  newRequest(feature: FeatureRequest) {
    this.featureRequestSubject.next(feature);
    this.featureRequestBehaviorSubject.next(feature);
    this.featureRequestReplaySubject.next(feature);
  }

  newRequests(features: FeatureRequest[]) {
    features.forEach(feature => {
      this.featureRequestSubject.next(feature);
      this.featureRequestBehaviorSubject.next(feature);
      this.featureRequestReplaySubject.next(feature);
    });
  }

  getSubscribableNewRequests(): Observable<FeatureRequest> {
    return this.featureRequestSubject.pipe();
  }

  getSubscribableWithLatestItem(): Observable<FeatureRequest> {
    return this.featureRequestBehaviorSubject;
  
  }

  getSubscribableWithLastThree():Observable<FeatureRequest> {
  //   return undefined;
  // getSubscribableWithFullHistory(): Observable<FeatureRequest> {
    return this.featureRequestReplaySubject;
  }
}
