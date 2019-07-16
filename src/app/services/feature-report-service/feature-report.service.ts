import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { FeatureReport } from 'src/app/model/feature-report';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureReportService {
  
  
  constructor(private _featureRequestService:FeatureRequestService) { }


  liveReport(): Observable<FeatureReport> {    
    return undefined;
  }
}
