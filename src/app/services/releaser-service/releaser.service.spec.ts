import { TestBed, async } from '@angular/core/testing';
import { DeveloperService } from '../developer-service/developer.service';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { FeatureRequest } from 'src/app/model/feature-request';
import { ReleaserService } from './releaser.service';





describe('ReleaserService', () => {

    const feat1 = new FeatureRequest(100,"Do most things really well",8,10);
    const feat2 = new FeatureRequest(200,"Do all things well",2,10);
    const feat3 = new FeatureRequest(300,"Do all things amazing",7,10);
    const feat4 = new FeatureRequest(400,"Never ever screw up...EVER",1,10);
    const requests = [feat1,feat2,feat3,feat4];
  
    let featureRequestService: FeatureRequestService;
    let releaserService: ReleaserService;

    beforeEach(() => TestBed.configureTestingModule({providers: [DeveloperService, FeatureRequestService]}));

    it('should be created', () => {
        const service: FeatureRequestService = TestBed.get(FeatureRequestService);
        expect(service).toBeTruthy();
    });

    it('should provide the requested features in the order they are completed',async(()=>{
        featureRequestService = TestBed.get(FeatureRequestService);
        featureRequestService.newRequests(requests);

        let complexityOrderedRequests = [feat4,feat2,feat3,feat1];
        let i = 0;
        releaserService.releaseAsCompleted().subscribe(feat=>{
            expect(feat).toBe(complexityOrderedRequests[i]);
        });
    }));

    it('should provide the requested features in the order they are requested',async(()=>{
        expect(true).toBe(false);
    }));

})
