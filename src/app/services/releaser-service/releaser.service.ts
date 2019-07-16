import { Injectable } from '@angular/core';
import { DeveloperService } from '../developer-service/developer.service';
import { Observable, iif, interval, EMPTY, of } from 'rxjs';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { FeatureRequest } from 'src/app/model/feature-request';
import { mergeMap, concatMap, pairwise, tap, scan, switchMap, withLatestFrom, takeWhile, merge } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReleaserService {


    constructor(private _developerService: DeveloperService, private _featureRequestService: FeatureRequestService) {

    }

    releaseAsCompleted(): Observable<FeatureRequest> {
        return this._featureRequestService.getSubscribableNewRequests().pipe(mergeMap(request => this._developerService.workFeatureRequest(request)));
    }

    releaseInOrderRequested(): Observable<FeatureRequest> {
        return this._featureRequestService.getSubscribableNewRequests().pipe(concatMap(request => this._developerService.workFeatureRequest(request)));
    }


    private accumulate(accumulator: FeatureRequest[], feat: number | FeatureRequest): FeatureRequest[] {

        let sortedPriority = [];
        
        if (typeof feat === "number") {
            sortedPriority = accumulator;
            sortedPriority.forEach(item => {
                if (item.remainingComplexity === 0)
                    item.remainingComplexity = -1;
            });

            sortedPriority = sortedPriority.filter(x => x.remainingComplexity > -1);

            if (sortedPriority.length > 0) {
                sortedPriority[0].remainingComplexity -= 1;
            }
        } else {
            accumulator.push(feat as FeatureRequest);
            sortedPriority = accumulator.sort((a, b) => b.priority - a.priority);

        }

        return sortedPriority;
    }

    flakyManagerReleaseStrategy(): Observable<FeatureRequest> {

        const workedFeatureObs$ = interval(100).pipe(
            merge(this._featureRequestService.getSubscribableNewRequests()),
            scan<number | FeatureRequest, FeatureRequest[]>((acc, feat) => { return this.accumulate(acc, feat) }, []),            
            takeWhile(x => x.length > 0)
        );

        return workedFeatureObs$.pipe(switchMap(item => iif(() => item[0].remainingComplexity === 0, of(item[0]), EMPTY)));

    }

}
