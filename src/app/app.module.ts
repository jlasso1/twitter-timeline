import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgVerticalTimelineModule } from 'ng-vertical-timeline';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './component/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgVerticalTimelineModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
