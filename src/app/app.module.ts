import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesModule } from './services/services.module';
import { FormsModule } from '@angular/forms';
import { LevelOneComponent } from './pages/level-one/level-one.component';
import { LevelTwoComponent } from './pages/level-two/level-two.component';
import { LevelThreeComponent } from './pages/level-three/level-three.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    LevelOneComponent,
    LevelTwoComponent,
    LevelThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
