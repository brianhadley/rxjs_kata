import { Component, OnInit } from "@angular/core";
import { FeatureRequestService } from "../../services/feature-request-service/feature-request.service";
import { FeatureRequest } from "../../model/feature-request";
import { Subscription } from "rxjs";
@Component({
  selector: "app-level-one",
  templateUrl: "./level-one.component.html",
  styleUrls: ["./level-one.component.scss"]
})
export class LevelOneComponent implements OnInit {
  public request: FeatureRequest = new FeatureRequest(null, null, null, null);
  public requestStream: FeatureRequest[] = [];
  public ObservedHistory: FeatureRequest[] = [];
  public StreamTimes: Date[] = [];
  public ObservedTimes: Date[] = [];
  public observing: string = "none";
  public disabled: boolean = false;
  private removeableSubscriptions: Subscription = new Subscription(null);
  constructor(private _featureRequestSvc: FeatureRequestService) {
    this._featureRequestSvc.getSubscribableWithLastThree().subscribe(x => {
      var d = new Date();
      this.StreamTimes.push(d);
      this.requestStream.push(x);
    });
  }

  ngOnInit() {}

  GetFullHistory() {
    this.observing = "rp";
    this.disableButtons();
    this.removeableSubscriptions.add(
      this._featureRequestSvc.getSubscribableWithLastThree().subscribe(x => {
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
  }
}
