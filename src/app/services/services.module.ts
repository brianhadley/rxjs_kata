import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRequestService } from './feature-request-service/feature-request.service';
import { DeveloperService } from './developer-service/developer.service';
import { ReleaserService } from './releaser-service/releaser.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [FeatureRequestService, DeveloperService, ReleaserService]
})
export class ServicesModule { }
