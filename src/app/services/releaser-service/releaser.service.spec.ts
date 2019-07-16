import { TestBed, async } from '@angular/core/testing';
import { DeveloperService } from '../developer-service/developer.service';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { FeatureRequest } from 'src/app/model/feature-request';
import { ReleaserService } from './releaser.service';





describe('ReleaserService', () => {

    const feat1 = new FeatureRequest(100,"Do most things really well",8,6);
    const feat2 = new FeatureRequest(200,"Do all things well",2,3);
    const feat3 = new FeatureRequest(300,"Do all things amazing",7,8);
    const feat4 = new FeatureRequest(400,"Never ever screw up...EVER",1,2);
    const feat5 = new FeatureRequest(500,"The greatest FEAT",3,50);
    const requests = [feat1,feat2,feat3,feat4];
  
    let featureRequestService: FeatureRequestService;
    

    beforeEach(() => TestBed.configureTestingModule({providers: [DeveloperService, FeatureRequestService]}));

    it('should be created', () => {
        const service: FeatureRequestService = TestBed.get(FeatureRequestService);
        expect(service).toBeTruthy();
    });


    //kata test 6
    it('should provide the requested features in the order they are completed',async(()=>{
        let releaserService: ReleaserService = TestBed.get(ReleaserService);
        featureRequestService = TestBed.get(FeatureRequestService);
        

        let complexityOrderedRequests = [feat4,feat2,feat3,feat1];
        let i = 0;
        releaserService.releaseAsCompleted().subscribe(feat=>{
            expect(feat).toBe(complexityOrderedRequests[i]);
            i++;
        });

        featureRequestService.newRequests(requests);
    }));

    //kata test 7
    it('should provide the requested features in the order they were requested',async(()=>{
        let releaserService: ReleaserService = TestBed.get(ReleaserService);
        featureRequestService = TestBed.get(FeatureRequestService);

        let receiptOrderedRequests = [feat1,feat2,feat3,feat4];
        let i = 0;
        releaserService.releaseInOrderRequested().subscribe(feat=>{
            expect(feat).toBe(receiptOrderedRequests[i]);
            i++;
        });

        featureRequestService.newRequests(requests);
    }));
    
    //kata test 8
    //this is probably the hardest test
    it('should release the highest priority item received so far first, then the next priority item (etc).  a higher priority item after other items have been released should be worked according to its priority', async(()=>{
        let releaserService: ReleaserService = TestBed.get(ReleaserService);
        featureRequestService = TestBed.get(FeatureRequestService);       
        

        let priorityOrderedRequests = [feat3, feat1, feat2, feat4, feat5];
        let i = 0;
        releaserService.flakyManagerReleaseStrategy().subscribe(feat=>{
            expect(feat).toBe(priorityOrderedRequests[i]);
            i++;
        });

        featureRequestService.newRequests(requests);

        setTimeout(()=>featureRequestService.newRequest(feat5),2100);
    }));

})
