import { TestBed, async } from '@angular/core/testing';

import { FeatureReportService } from './feature-report.service';
import { FeatureRequest } from 'src/app/model/feature-request';
import { of, from, Observable, BehaviorSubject } from 'rxjs';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { FeatureReport } from 'src/app/model/feature-report';


describe('FeatureReportService', () => {
  const feat1 = new FeatureRequest(100,"Do most things really well",1,1);
  const feat2 = new FeatureRequest(200,"Do all things well",3,4);
  const feat3 = new FeatureRequest(300,"Do all things amazing",7,11);
  const feat4 = new FeatureRequest(400,"Never ever screw up...EVER",10,20);
  const requests = [feat1,feat2,feat3,feat4];
  

  beforeEach(() => TestBed.configureTestingModule({providers: [FeatureRequestService]}));  
  

  it('should be created', () => {
    const service: FeatureReportService = TestBed.get(FeatureReportService);
    expect(service).toBeTruthy();
  });


  //kata test 9
  xit('should provide an accurate report summary object based on the features received (priority > 10 is urgent, complexity >= 7 is highly complex', ()=>{
    const service: FeatureReportService = TestBed.get(FeatureReportService);
    const featureRequestService: FeatureRequestService = TestBed.get(FeatureRequestService);

    const expectedReports = [new FeatureReport(1,0,0),new FeatureReport(2,0,0),new FeatureReport(3,1,1),new FeatureReport(4,2,2)];
    
    let i = 0;

    service.liveReport().subscribe(report=>{
      expect(report.NumberIssues).toBe(expectedReports[i].NumberIssues);
      expect(report.NumberUrgent).toBe(expectedReports[i].NumberUrgent);
      expect(report.NumberHighComplexity).toBe(expectedReports[i].NumberHighComplexity);
      i++;
    });
    
    featureRequestService.newRequests(requests);

  });

});
