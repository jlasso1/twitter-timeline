import {Component, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() name: any;

  userForm = new FormGroup({
    description: new FormControl(),
    imageUrl: new FormControl(),
    twitterUserName: new FormControl(),
    title: new FormControl()
  }); 
  
  ngOnInit(){
    this.getProfile();
  }

  constructor(public activeModal: NgbActiveModal,
              private profileService: ProfileService ) {}

  onFormSubmit(): void {
    this.profileService.updateProfile(this.userForm.value).subscribe((result:any) => {
      console.log("200")
      this.activeModal.close('Close click');
    },
    err => {
      console.log(err.error.errors[0].reason);
    });
  }  

  getProfile(){
    this.profileService.getProfile().subscribe((result:any) => {
      this.userForm.controls["description"].setValue(result.description);
      this.userForm.controls["imageUrl"].setValue(result.imageUrl);
      this.userForm.controls["twitterUserName"].setValue(result.twitterUserName);
      this.userForm.controls["title"].setValue(result.title);
    },
    err => {
      console.log(err.error.errors[0].reason);
    });
    
  }
}