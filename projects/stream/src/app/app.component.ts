import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { MeetingRoomComponent } from './meeting-room/meeting-room.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stream-root',
  standalone: true,
  imports: [RouterOutlet, MeetingRoomComponent, CommonModule, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'stream';
  isLoginFormActive = true;
  loginForm: any;
  logined = false;
  constructor(
    private apiService: ApiService,) {
  }


  ngOnInit() {
    // this.logined = this.apiService.logined;
    this.loginForm = new FormGroup({
      username: new FormControl({ value: '', disabled: false }, [
        Validators.required, Validators.minLength(3)
      ]),
      code: new FormControl({ value: '', disabled: false }, [Validators.required])
    });

    // Get and parse data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.logined = true;
      const parsedUserData = JSON.parse(userData);
      console.log(parsedUserData.username);  // Output: 'john_doe'
    }


  }
  onSubmit() {
    this.loginForm.patchValue({
      username: this.loginForm.controls['username']?.value?.trim(),
      code: this.loginForm.controls['code']?.value?.trim()
    }); if (this.loginForm.valid) {
      console.log('Login successful');
      this.apiService.vedioSrc= this.loginForm.controls['code']?.value?.trim();
      // const user = { username: this.loginForm.controls['username']?.value?.trim(), code: this.loginForm.controls['code']?.value?.trim() };
      // localStorage.setItem('userData', JSON.stringify(user));
      this.logined = true;
      // Implement your login logic here
    } else {
      console.log('Please fill in both fields');
    }
  }
  changePage(e: boolean) {
    // if(this.isLoginFormActive !== e){
    //   this.loginForm.reset();
    //   this.isLoginFormActive = e;
    // }
  }
  endSession(){
    this.logined = false;
  }
}
