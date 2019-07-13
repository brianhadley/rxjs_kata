import { Injectable } from '@angular/core';
import { DeveloperService } from '../developer-service/developer.service';
import { Observable } from 'rxjs';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { FeatureRequest } from 'src/app/model/feature-request';
import { mergeMap, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReleaserService { 
  

  constructor(private _developerService: DeveloperService, private _featureRequestService: FeatureRequestService) { 
      
  }

  releaseAsCompleted() : Observable<FeatureRequest> {
    return this._featureRequestService.getSubscribableWithFullHistory().pipe(mergeMap(request=>this._developerService.workFeatureRequest(request)));
  }

  releaseInOrderRequested() : Observable<FeatureRequest> {
    return this._featureRequestService.getSubscribableWithFullHistory().pipe(concatMap(request=>this._developerService.workFeatureRequest(request)));
  }
  

}
