import { Component, OnInit } from "@angular/core";
import { FeatureRequestService } from "src/app/services/feature-request-service/feature-request.service";
import { FeatureRequest } from "src/app/model/feature-request";
import { ReleaserService } from "src/app/services/releaser-service/releaser.service";
import { DeveloperService } from "src/app/services/developer-service/developer.service";

@Component({
  selector: "app-level-two",
  templateUrl: "./level-two.component.html",
  styleUrls: ["./level-two.component.scss"]
})
export class LevelTwoComponent implements OnInit {
  public requestStream: FeatureRequest[] = [];
  public ObservedCompletedInOrderCompleted: FeatureRequest[] = [];
  public ObservedCompletedInOrderRequested: FeatureRequest[] = [];
  public StreamTimes: Date[] = [];
  public ObservedCompletedInOrderCompletedTimes: Date[] = [];
  public ObservedCompletedInOrderRequestedTimes: Date[] = [];
  public AutoAdd: boolean = false;
  public requesteddisabled: boolean = false;
  public disabled: boolean = false;
  private RandomLibrary: string[] = [
    "Do many things",
    "paint something orange",
    "buy new software",
    "uninstall antivirus",
    "make it all bigger",
    "zoom in",
    "change the colors",
    "Correct the misspellings",
    "headers should be rainbows",
    "Make it more corporate",
    "BUG-when using a scroll wheel the page shutters violently"
  ];

  constructor(
    private _featureRequestSvc: FeatureRequestService,
    private _releaserSvc: ReleaserService
  ) {
    this._featureRequestSvc.getSubscribableWithLastThree().subscribe(x => {
      var d = new Date();
      this.StreamTimes.push(d);
      this.requestStream.push(x);
    });
  }

  ngOnInit() {}

  observeCompleted() {
    this.disabled = true;
    this._releaserSvc.releaseAsCompleted().subscribe(x => {
      var d = new Date();
      this.ObservedCompletedInOrderCompletedTimes.push(d);
      this.ObservedCompletedInOrderCompleted.push(x);
    });
  }

  observeCompletedOrderRequested() {
    this.requesteddisabled = true;
    this._releaserSvc.releaseAsCompleted().subscribe(x => {
      var d = new Date();
      this.ObservedCompletedInOrderRequestedTimes.push(d);
      this.ObservedCompletedInOrderRequested.push(x);
    });
  }

   
  CreateRandomRequest() {
    let feat1: FeatureRequest = new FeatureRequest(
      Math.floor(Math.random() * 10000),
      this.RandomLibrary[Math.floor(Math.random() * this.RandomLibrary.length)],
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 5)
    );
    this._featureRequestSvc.newRequest(feat1);
  }
}
