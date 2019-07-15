import { Component } from "@angular/core";
import { FeatureRequestService } from "./services/feature-request-service/feature-request.service";
import { FeatureRequest } from "./model/feature-request";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public request: FeatureRequest = new FeatureRequest(null, null, null, null);
  public requestStream: FeatureRequest[] = [];
  public ObservedHistory: FeatureRequest[] = [];
  public StreamTimes: Date[] = [];
  public ObservedTimes: Date[] = [];
  // public ReplaySubjectHistory: FeatureRequest[] = [];
  // public SubjectHistory: FeatureRequest[] = [];
  // public BehaviorSubjectHistory: FeatureRequest[] = [];
  public AutoAdd: boolean = true;
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
  public disabled: boolean = false;
  public observing: string = "none";
  private removeableSubscriptions: Subscription = new Subscription(null);
  constructor(private _featureRequestSvc: FeatureRequestService) {
    this._featureRequestSvc.getSubscribableWithFullHistory().subscribe(x => {
      var d = new Date();
      this.StreamTimes.push(d);
      this.requestStream.push(x);
    });
    this.CreateNewEvery3Seconds();
  }

  CreateNewEvery3Seconds() {
    setTimeout(() => {
      if (this.AutoAdd) {
        this.CreateRandomRequest();
      }
      this.CreateNewEvery3Seconds();
    }, 3000);
  }

  GetFullHistory() {
    this.observing = "rp";
    this.disableButtons();
    this.removeableSubscriptions.add(
      this._featureRequestSvc.getSubscribableWithFullHistory().subscribe(x => {
        var d = new Date();
        this.ObservedTimes.push(d);
        this.ObservedHistory.push(x);
      })
    );
  }

  GetLastItem() {
    this.observing = "bs";
    this.disableButtons();
    this.removeableSubscriptions.add(
      this._featureRequestSvc.getSubscribableWithLatestItem().subscribe(x => {
        var d = new Date();
        this.ObservedTimes.push(d);
        this.ObservedHistory.push(x);
      })
    );
  }

  GetNewItem() {
    this.observing = "s";
    this.disableButtons();
    this.removeableSubscriptions.add(
      this._featureRequestSvc.getSubscribableNewRequests().subscribe(x => {
        var d = new Date();
        this.ObservedTimes.push(d);
        this.ObservedHistory.push(x);
      })
    );
  }

  disableButtons() {
    this.disabled = true;
    // this.ObservedHistory = [];
    // this.removeableSubscriptions.unsubscribe();
  }

  // CreateNewRequest() {
  //   let feat1: FeatureRequest = new FeatureRequest(
  //     Math.floor(Math.random() * 10000),
  //     this.request.featureName,
  //     this.request.complexity,
  //     this.request.priority
  //   );
  //   this._featureRequestSvc.newRequest(feat1);
  // }

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
