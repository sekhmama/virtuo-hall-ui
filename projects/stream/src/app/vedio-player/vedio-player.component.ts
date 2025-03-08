import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgApiService, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import Hls from 'hls.js';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-stream-vedio-player',
  standalone: true,
  imports: [CommonModule, VgBufferingModule, VgOverlayPlayModule, VgControlsModule, VgCoreModule,
  ],
  templateUrl: './vedio-player.component.html',
  styleUrl: './vedio-player.component.scss'
})
export class VedioPlayerComponent implements AfterViewInit {
  @ViewChild('media') media: any;
  preload: string = 'auto';
  api: VgApiService = new VgApiService;  // Reference to the API service
  maxScreen = false;
  inactivityTimeout: any = '';
  inactivityDelay = 5000; // Time in ms (2 seconds)
    constructor(
      private apiService: ApiService,) {
    }

  ngAfterViewInit() {
    // Initialize HLS.js for the video player
    if (Hls.isSupported()) {
      // const hls = new Hls();
      var hls = new Hls({
        xhrSetup: function (xhr, url) {
          // Add CORS headers directly if needed (e.g., 'withCredentials' or custom headers)
          xhr.withCredentials = false;  // This will not include credentials (cookies, etc.)
        }
      });
      const videoSource = this.apiService.vedioSrc;
      // const videoSource = 'http://localhost:1022/uploads/movies/747a6f78-97f7-4d8f-80f6-d6b4d260dfdf/index.m3u8';
      // const videoSource = "https://pub-6a5a4a5605cc43d28de03fc16552e0ea.r2.dev/movies/1c8791c1-fd13-4cd9-af88-60bc120f0971/index.m3u8";
      // const videoSource = "https://pub-6a5a4a5605cc43d28de03fc16552e0ea.r2.dev/movies/8a28b17d-7a18-40d0-91a3-02928912d3df/index.m3u8";
      hls.loadSource(videoSource);
      hls.attachMedia(this.media.nativeElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.media.nativeElement.play(); // Automatically play once the video metadata is parsed
      });

      hls.on(Hls.Events.ERROR, (event: any, data: any) => {
        console.error('Error while loading HLS:', data);
      });
    } else {
      console.error('HLS.js is not supported in this browser');
    }
  }

  // This function is called once the player is ready
  onPlayerReady(api: VgApiService) {
    this.api = api;  // Storing the API instance
    console.log(this.api);
    this.subscribeToPlayerEvents();  // Subscribe to events after initialization
  }

  // Function to subscribe to player events
  private subscribeToPlayerEvents() {
    // Ensure that media is ready before subscribing to loadedMetadata
    if (this.api && this.api.getDefaultMedia()) {
      // Subscribe to 'loadedMetadata' event when the media is ready
      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(() => {
        this.autoplay.bind(this);
      });
    } else {
      console.error('Media element is not ready yet.');
    }
  }

  // Autoplay function
  autoplay() {
    if (this.api) {
      this.api.play();  // Play the video once metadata is loaded
    }
  }

  // Move backward by 30 seconds
  backward() {
    const currentTime = this.api.currentTime;
    this.api.seekTime(currentTime - 10, false); // The second parameter 'true' triggers the seek animation.
  }

  // Move forward by 30 seconds
  forward() {
    const currentTime = this.api.currentTime;
    this.api.seekTime(currentTime + 10, false);
  }

  fullScreen() {
    this.maxScreen = !this.maxScreen;
    const video: any = document.querySelector('player');
    console.log(video); 
    if (this.maxScreen) {


      // Hide cursor when video enters full-screen
      // document.addEventListener('fullscreenchange', () => {
      //   if (document.fullscreenElement) {
          // video.style.cursor = 'pointer'; // Hide cursor
          this.resetInactivityTimer(video); // Start inactivity timer
      //   } else {
      //     video.style.cursor = 'auto'; // Show cursor when exiting full-screen
      //   }
      // });

      // For Webkit-based browsers (Safari/Chrome)
      // document.addEventListener('webkitfullscreenchange', () => {
      //   if (document.webkitFullscreenElement) {
      //     video.style.cursor = 'none'; // Hide cursor
      //     this.resetInactivityTimer(video); // Start inactivity timer
      //   } else {
      //     video.style.cursor = 'auto'; // Show cursor when exiting full-screen
      //   }
      // });

      // Event listener to detect mouse movements
      // video.addEventListener('mousemove', () => {
      //   video.style.cursor = 'auto'; // Show cursor on movement
      //   this.resetInactivityTimer(video); // Reset inactivity timer on movement
      // });

      // // Optional: Reset cursor when the video is clicked or interacted with
      // video.addEventListener('click', () => {
      //   video.style.cursor = 'auto'; // Show cursor on click
      //   this.resetInactivityTimer(video); // Reset inactivity timer
      // });
    } else {
      // video.style.cursor = 'pointer';
    }

  }
  resetInactivityTimer(video: any) {
    // Clear any existing timeout
    clearTimeout(this.inactivityTimeout);

    // Set a new timeout to hide the cursor after inactivity
    this.inactivityTimeout = setTimeout(() => {
      // video.style.cursor = 'none'; // Hide cursor after inactivity
      // video.style.cursor = 'none';
      console.log(video.children.style);
    }, this.inactivityDelay);
  }
}







