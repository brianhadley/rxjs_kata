import { Component } from "@angular/core";
import { FeatureRequest } from "./model/feature-request";
import { FeatureRequestService } from "./services/feature-request-service/feature-request.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
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
  public AutoAdd: boolean = true;
  public requestStream: FeatureRequest[] = [];

  constructor(private _featureRequestSvc: FeatureRequestService) {
    this.CreateNewEvery3Seconds();
  }
  CreateNewEvery3Seconds() {
    setTimeout(() => {
      if (this.AutoAdd && this.requestStream.length < 20) {
        this.CreateRandomRequest();
      }
      this.CreateNewEvery3Seconds();
    }, 3000);
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
