import { Injectable } from "@angular/core";
import { DeveloperService } from "../developer-service/developer.service";
import { Observable, iif, interval, EMPTY, of } from "rxjs";
import { FeatureRequestService } from "../feature-request-service/feature-request.service";
import { FeatureRequest, FeatureStatus } from "src/app/model/feature-request";
//solutions may or may not involve using one or more of the operators
import {
  mergeMap,
  concatMap,
  pairwise,
  tap,
  scan,
  switchMap,
  withLatestFrom,
  takeWhile,
  merge,
  filter
} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ReleaserService {
  constructor(
    private _developerService: DeveloperService,
    private _featureRequestService: FeatureRequestService
  ) {}

  releaseAsCompleted(): Observable<FeatureRequest> {
    //output latest completed
    return undefined;
  }

  releaseInOrderRequested(): Observable<FeatureRequest> {
    return undefined;
  }

  flakyManagerReleaseStrategy(): Observable<FeatureRequest> {
    return undefined;
  }
}
