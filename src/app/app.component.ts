import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from './component/modal/modal.component';
import { Timeline } from './models/timeline';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private profileService: ProfileService,
             private toastr: ToastrService,
             private modalService: NgbModal) {}
  title = 'twitter-timeline';
  image = "";
  name = "";
  description = "";
  titleUser = ""
  events = [
    {
      id: 0,
      title: '',
      content: '',
      date: '',
      icon: ''
    }
  ];

  ngOnInit(){
    this.timeLine();
    this.getProfile();
  }

  timeLine(){
    this.profileService.getTimeLine().subscribe((result:any) => {
      this.events.splice(0);
      for(let i=0; i<=result.data.length; i++) {
        let data = result.data[i];
            this.events.push(new Timeline(i,data.user.name,data.text,'',data.user.profile_image_url))
      }
    },
    err => {
      this.toastr.error(err.error.errors[0].reason);
    });
  }

  getProfile(){
    this.profileService.getProfile().subscribe((result:any) => {
      this.image = result.imageUrl;
      this.name = result.twitterUserName;
      this.description = result.description;
      this.titleUser = result.title;
    },
    err => {
      this.toastr.error(err.error.errors[0].reason);
    });
    
  }

 
  open() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'World';
  }

  
}
