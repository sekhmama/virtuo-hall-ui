import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, Output, output } from '@angular/core';
import { VedioPlayerComponent } from '../vedio-player/vedio-player.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-stream-meeting-room',
  standalone: true,
  imports: [CommonModule,VedioPlayerComponent],
  templateUrl: './meeting-room.component.html',
  styleUrl: './meeting-room.component.scss'
})
export class MeetingRoomComponent {
  @Output() logined = new EventEmitter();
  isVideoActive = true; // Set to false if you want to hide the video
  isChatOpen = false; // Toggle to hide/show chat
  isControlsVisible = true; // Toggle to hide/show control buttons
  message:any;
  chatMessages=
  [
    { text: 'Hi, welcome to public player', sender: 'Coder' },
  ];

    constructor(
      private apiService: ApiService,) {
    }
  participants = [
    { id: 1, name: 'Participant 1' },
    { id: 1, name: 'Participant 1' },
    { id: 1, name: 'Participant 1' },
  ];

  onMessage(e:any){
    this.message=e;
  }

  // Toggle visibility of chat
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  sendMessage() {
    this.chatMessages.push({text: this.message.target.value, sender: 'You'});
    const input: any = document.getElementById('mess');
    this.message.target.value = '';
  }
  toggleMute() {
  }
  endCall() {
    this.logined.emit(false);
    }
  // Dynamic calculation of video size based on participant count
  get participantVideoSize() {
    const participantCount = this.participants.length;
    if (participantCount <= 4) return '25%'; // 4 or fewer participants get larger videos
    if (participantCount <= 8) return '20%'; // Between 5 and 8 participants
    return '15%'; // More than 8 participants, videos become smaller
  }
}
