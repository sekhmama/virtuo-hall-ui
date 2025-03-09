// projects/stream/src/app/app.component.ts
import { Component as Component3 } from "@angular/core";
import { RouterOutlet } from "@angular/router";

// projects/stream/src/app/api.service.ts
import { Injectable } from "@angular/core";

// projects/stream/src/environments/environment.ts
var environment = {
  production: false,
  apiUrl: "http://localhost:1022"
};

// projects/stream/src/app/api.service.ts
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ApiService = class _ApiService {
  http;
  apiUrl = environment.apiUrl;
  vedioSrc = "";
  constructor(http) {
    this.http = http;
  }
  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }
  writeServer(body) {
    return this.http.post(`${this.apiUrl}/users/dummy`, body);
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)(i0.\u0275\u0275inject(i1.HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};

// projects/stream/src/app/meeting-room/meeting-room.component.ts
import { CommonModule as CommonModule2 } from "@angular/common";
import { Component as Component2, EventEmitter, Output } from "@angular/core";

// projects/stream/src/app/vedio-player/vedio-player.component.ts
import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { VgBufferingModule } from "@videogular/ngx-videogular/buffering";
import { VgOverlayPlayModule } from "@videogular/ngx-videogular/overlay-play";
import { VgApiService, VgCoreModule } from "@videogular/ngx-videogular/core";
import { VgControlsModule } from "@videogular/ngx-videogular/controls";
import Hls from "hls.js";
import * as i02 from "@angular/core";
import * as i2 from "@videogular/ngx-videogular/buffering";
import * as i3 from "@videogular/ngx-videogular/overlay-play";
import * as i4 from "@videogular/ngx-videogular/controls";
import * as i5 from "@videogular/ngx-videogular/core";
var _c0 = ["media"];
var VedioPlayerComponent = class _VedioPlayerComponent {
  apiService;
  media;
  preload = "auto";
  api = new VgApiService();
  // Reference to the API service
  maxScreen = false;
  inactivityTimeout = "";
  inactivityDelay = 5e3;
  // Time in ms (2 seconds)
  constructor(apiService) {
    this.apiService = apiService;
  }
  ngAfterViewInit() {
    if (Hls.isSupported()) {
      var hls = new Hls({
        xhrSetup: function(xhr, url) {
          xhr.withCredentials = false;
        }
      });
      const videoSource = this.apiService.vedioSrc;
      hls.loadSource(videoSource);
      hls.attachMedia(this.media.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.media.nativeElement.play();
      });
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("Error while loading HLS:", data);
      });
    } else {
      console.error("HLS.js is not supported in this browser");
    }
  }
  // This function is called once the player is ready
  onPlayerReady(api) {
    this.api = api;
    console.log(this.api);
    this.subscribeToPlayerEvents();
  }
  // Function to subscribe to player events
  subscribeToPlayerEvents() {
    if (this.api && this.api.getDefaultMedia()) {
      this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(() => {
        this.autoplay.bind(this);
      });
    } else {
      console.error("Media element is not ready yet.");
    }
  }
  // Autoplay function
  autoplay() {
    if (this.api) {
      this.api.play();
    }
  }
  // Move backward by 30 seconds
  backward() {
    const currentTime = this.api.currentTime;
    this.api.seekTime(currentTime - 10, false);
  }
  // Move forward by 30 seconds
  forward() {
    const currentTime = this.api.currentTime;
    this.api.seekTime(currentTime + 10, false);
  }
  fullScreen() {
    this.maxScreen = !this.maxScreen;
    const video = document.querySelector("player");
    console.log(video);
    if (this.maxScreen) {
      this.resetInactivityTimer(video);
    } else {
    }
  }
  resetInactivityTimer(video) {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      console.log(video.children.style);
    }, this.inactivityDelay);
  }
  static \u0275fac = function VedioPlayerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VedioPlayerComponent)(i02.\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _VedioPlayerComponent, selectors: [["app-stream-vedio-player"]], viewQuery: function VedioPlayerComponent_Query(rf, ctx) {
    if (rf & 1) {
      i02.\u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      i02.\u0275\u0275queryRefresh(_t = i02.\u0275\u0275loadQuery()) && (ctx.media = _t.first);
    }
  }, standalone: true, features: [i02.\u0275\u0275StandaloneFeature], decls: 20, vars: 6, consts: [["media", ""], ["id", "singleVideo3", 3, "onPlayerReady"], ["id", "player"], ["vgFor", "singleVideo"], ["id", "control"], ["id", "play"], ["id", "speed"], ["vgProperty", "current", "vgFormat", "mm:ss"], [1, "btn", 3, "click", "title"], [3, "vgSlider"], [1, "scroll", 3, "vgSlider"], ["vgProperty", "total", "vgFormat", "mm:ss"], ["id", "mute"], ["id", "volume"], ["id", "fullscreen", 3, "click"], ["id", "singleVideo", "crossorigin", "anonymous", 3, "vgMedia", "preload"]], template: function VedioPlayerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = i02.\u0275\u0275getCurrentView();
      i02.\u0275\u0275elementStart(0, "vg-player", 1);
      i02.\u0275\u0275listener("onPlayerReady", function VedioPlayerComponent_Template_vg_player_onPlayerReady_0_listener($event) {
        i02.\u0275\u0275restoreView(_r1);
        return i02.\u0275\u0275resetView(ctx.onPlayerReady($event));
      });
      i02.\u0275\u0275element(1, "vg-overlay-play", 2)(2, "vg-buffering", 3);
      i02.\u0275\u0275elementStart(3, "vg-controls", 4);
      i02.\u0275\u0275element(4, "vg-play-pause", 5)(5, "vg-playback-button", 6)(6, "vg-time-display", 7);
      i02.\u0275\u0275elementStart(7, "span", 8);
      i02.\u0275\u0275listener("click", function VedioPlayerComponent_Template_span_click_7_listener() {
        i02.\u0275\u0275restoreView(_r1);
        return i02.\u0275\u0275resetView(ctx.backward());
      });
      i02.\u0275\u0275text(8, "<<");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(9, "span", 8);
      i02.\u0275\u0275listener("click", function VedioPlayerComponent_Template_span_click_9_listener() {
        i02.\u0275\u0275restoreView(_r1);
        return i02.\u0275\u0275resetView(ctx.forward());
      });
      i02.\u0275\u0275text(10, ">>");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275elementStart(11, "vg-scrub-bar", 9);
      i02.\u0275\u0275element(12, "vg-scrub-bar-current-time", 10)(13, "vg-scrub-bar-buffering-time");
      i02.\u0275\u0275elementEnd();
      i02.\u0275\u0275element(14, "vg-time-display", 11)(15, "vg-mute", 12)(16, "vg-volume", 13);
      i02.\u0275\u0275elementStart(17, "vg-fullscreen", 14);
      i02.\u0275\u0275listener("click", function VedioPlayerComponent_Template_vg_fullscreen_click_17_listener() {
        i02.\u0275\u0275restoreView(_r1);
        return i02.\u0275\u0275resetView(ctx.fullScreen());
      });
      i02.\u0275\u0275elementEnd()();
      i02.\u0275\u0275element(18, "video", 15, 0);
      i02.\u0275\u0275elementEnd();
    }
    if (rf & 2) {
      const media_r2 = i02.\u0275\u0275reference(19);
      i02.\u0275\u0275advance(7);
      i02.\u0275\u0275property("title", "-10s");
      i02.\u0275\u0275advance(2);
      i02.\u0275\u0275property("title", "+10s");
      i02.\u0275\u0275advance(2);
      i02.\u0275\u0275property("vgSlider", true);
      i02.\u0275\u0275advance();
      i02.\u0275\u0275property("vgSlider", true);
      i02.\u0275\u0275advance(6);
      i02.\u0275\u0275property("vgMedia", media_r2)("preload", ctx.preload);
    }
  }, dependencies: [CommonModule, VgBufferingModule, i2.VgBufferingComponent, VgOverlayPlayModule, i3.VgOverlayPlayComponent, VgControlsModule, i4.VgControlsComponent, i4.VgVolumeComponent, i4.VgTimeDisplayComponent, i4.VgScrubBarComponent, i4.VgPlaybackButtonComponent, i4.VgPlayPauseComponent, i4.VgMuteComponent, i4.VgFullscreenComponent, i4.VgScrubBarBufferingTimeComponent, i4.VgScrubBarCurrentTimeComponent, VgCoreModule, i5.VgMediaDirective, i5.VgPlayerComponent], styles: ["\n\n.btn[_ngcontent-%COMP%] {\n  border: none;\n  background: none;\n  appearance: none;\n  color: white;\n  font-size: 16px;\n  cursor: pointer;\n  z-index: 300;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  font-family: Arial;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.scroll[_ngcontent-%COMP%] {\n  background-color: rgba(255, 255, 255, 0.174);\n}\n#control[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n  -webkit-user-select: none;\n  user-select: none;\n}\n#control[_ngcontent-%COMP%]:hover, \n#control[_ngcontent-%COMP%]:focus {\n  opacity: 1;\n}\n.btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.9);\n}\n#speed[_ngcontent-%COMP%]:active {\n  transform: scale(0.9);\n}\n#play[_ngcontent-%COMP%]:active {\n  transform: scale(0.9);\n}\n#mute[_ngcontent-%COMP%]:active {\n  transform: scale(0.9);\n}\n#fullscreen[_ngcontent-%COMP%]:active {\n  transform: scale(0.9);\n}\n/*# sourceMappingURL=vedio-player.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(VedioPlayerComponent, { className: "VedioPlayerComponent" });
})();

// projects/stream/src/app/meeting-room/meeting-room.component.ts
import * as i03 from "@angular/core";
import * as i22 from "@angular/common";
function MeetingRoomComponent_app_stream_vedio_player_3_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275element(0, "app-stream-vedio-player");
  }
}
function MeetingRoomComponent_div_4_div_6_strong_1_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275elementStart(0, "strong");
    i03.\u0275\u0275text(1);
    i03.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r3 = i03.\u0275\u0275nextContext().$implicit;
    i03.\u0275\u0275advance();
    i03.\u0275\u0275textInterpolate1("", message_r3.sender, ":");
  }
}
function MeetingRoomComponent_div_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    i03.\u0275\u0275elementStart(0, "div", 15);
    i03.\u0275\u0275template(1, MeetingRoomComponent_div_4_div_6_strong_1_Template, 2, 1, "strong", 3);
    i03.\u0275\u0275text(2);
    i03.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const message_r3 = ctx.$implicit;
    const i_r4 = ctx.index;
    const ctx_r1 = i03.\u0275\u0275nextContext(2);
    i03.\u0275\u0275advance();
    i03.\u0275\u0275property("ngIf", (ctx_r1.chatMessages[i_r4 - 1] == null ? null : ctx_r1.chatMessages[i_r4 - 1].sender) !== message_r3.sender);
    i03.\u0275\u0275advance();
    i03.\u0275\u0275textInterpolate1(" ", message_r3.text, " ");
  }
}
function MeetingRoomComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i03.\u0275\u0275getCurrentView();
    i03.\u0275\u0275elementStart(0, "div", 8)(1, "button", 9);
    i03.\u0275\u0275listener("click", function MeetingRoomComponent_div_4_Template_button_click_1_listener() {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      return i03.\u0275\u0275resetView(ctx_r1.toggleChat());
    });
    i03.\u0275\u0275text(2, "\xD7");
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(3, "div", 10);
    i03.\u0275\u0275text(4, " Chat ");
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(5, "div", 11);
    i03.\u0275\u0275template(6, MeetingRoomComponent_div_4_div_6_Template, 3, 2, "div", 12);
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(7, "div", 13)(8, "input", 14);
    i03.\u0275\u0275listener("keyup.enter", function MeetingRoomComponent_div_4_Template_input_keyup_enter_8_listener() {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      return i03.\u0275\u0275resetView(ctx_r1.sendMessage());
    })("input", function MeetingRoomComponent_div_4_Template_input_input_8_listener($event) {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      return i03.\u0275\u0275resetView(ctx_r1.onMessage($event));
    });
    i03.\u0275\u0275elementEnd();
    i03.\u0275\u0275elementStart(9, "button", 6);
    i03.\u0275\u0275listener("click", function MeetingRoomComponent_div_4_Template_button_click_9_listener() {
      i03.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i03.\u0275\u0275nextContext();
      return i03.\u0275\u0275resetView(ctx_r1.sendMessage());
    });
    i03.\u0275\u0275text(10, "Send");
    i03.\u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = i03.\u0275\u0275nextContext();
    i03.\u0275\u0275advance(6);
    i03.\u0275\u0275property("ngForOf", ctx_r1.chatMessages);
  }
}
var MeetingRoomComponent = class _MeetingRoomComponent {
  apiService;
  logined = new EventEmitter();
  isVideoActive = true;
  // Set to false if you want to hide the video
  isChatOpen = false;
  // Toggle to hide/show chat
  isControlsVisible = true;
  // Toggle to hide/show control buttons
  message;
  chatMessages = [
    { text: "Hi, welcome to public player", sender: "Coder" }
  ];
  constructor(apiService) {
    this.apiService = apiService;
  }
  participants = [
    { id: 1, name: "Participant 1" },
    { id: 1, name: "Participant 1" },
    { id: 1, name: "Participant 1" }
  ];
  onMessage(e) {
    this.message = e;
  }
  // Toggle visibility of chat
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  sendMessage() {
    this.chatMessages.push({ text: this.message.target.value, sender: "You" });
    const input = document.getElementById("mess");
    this.message.target.value = "";
  }
  toggleMute() {
  }
  endCall() {
    this.logined.emit(false);
  }
  // Dynamic calculation of video size based on participant count
  get participantVideoSize() {
    const participantCount = this.participants.length;
    if (participantCount <= 4)
      return "25%";
    if (participantCount <= 8)
      return "20%";
    return "15%";
  }
  static \u0275fac = function MeetingRoomComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MeetingRoomComponent)(i03.\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ i03.\u0275\u0275defineComponent({ type: _MeetingRoomComponent, selectors: [["app-stream-meeting-room"]], outputs: { logined: "logined" }, standalone: true, features: [i03.\u0275\u0275StandaloneFeature], decls: 10, vars: 2, consts: [[1, "app-container"], [1, "video-main"], [1, "video-player"], [4, "ngIf"], ["class", "chat-container", 4, "ngIf"], [1, "controls-bar"], [3, "click"], [2, "background-color", "red", 3, "click"], [1, "chat-container"], [1, "close-btn", 3, "click"], [1, "chat-header"], [1, "chat-body"], ["class", "chat-message", 4, "ngFor", "ngForOf"], [1, "chat-footer"], ["id", "mess", "type", "text", "placeholder", "Type a message", 3, "keyup.enter", "input"], [1, "chat-message"]], template: function MeetingRoomComponent_Template(rf, ctx) {
    if (rf & 1) {
      i03.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      i03.\u0275\u0275template(3, MeetingRoomComponent_app_stream_vedio_player_3_Template, 1, 0, "app-stream-vedio-player", 3);
      i03.\u0275\u0275elementEnd()();
      i03.\u0275\u0275template(4, MeetingRoomComponent_div_4_Template, 11, 1, "div", 4);
      i03.\u0275\u0275elementStart(5, "div", 5)(6, "button", 6);
      i03.\u0275\u0275listener("click", function MeetingRoomComponent_Template_button_click_6_listener() {
        return ctx.toggleChat();
      });
      i03.\u0275\u0275text(7, "Chat");
      i03.\u0275\u0275elementEnd();
      i03.\u0275\u0275elementStart(8, "button", 7);
      i03.\u0275\u0275listener("click", function MeetingRoomComponent_Template_button_click_8_listener() {
        return ctx.endCall();
      });
      i03.\u0275\u0275text(9, "End");
      i03.\u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      i03.\u0275\u0275advance(3);
      i03.\u0275\u0275property("ngIf", ctx.isVideoActive);
      i03.\u0275\u0275advance();
      i03.\u0275\u0275property("ngIf", ctx.isChatOpen);
    }
  }, dependencies: [CommonModule2, i22.NgForOf, i22.NgIf, VedioPlayerComponent], styles: ["\n\n.app-container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  background-color: #121212;\n  color: #fff;\n  overflow: hidden;\n}\n.app-container[_ngcontent-%COMP%]   .video-main[_ngcontent-%COMP%] {\n  background-color: #2a2a2a;\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.app-container[_ngcontent-%COMP%]   .video-player[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 90%;\n  background-color: #333;\n  border-radius: 10px;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%] {\n  background-color: #2a2a2a;\n  width: 300px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 15px;\n  height: 96%;\n  border-left: 2px solid #00bcd4;\n  position: relative;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background-color: transparent;\n  border: none;\n  color: #fff;\n  font-size: 20px;\n  cursor: pointer;\n  transition: color 0.3s ease;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  color: #00bcd4;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .chat-header[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: bold;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .chat-body[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  overflow-y: auto;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .chat-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .chat-footer[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 80%;\n  padding: 5px;\n  border-radius: 5px;\n  border: 1px solid #00bcd4;\n  background-color: #121212;\n  color: #fff;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .chat-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  background-color: #00bcd4;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  color: #fff;\n}\n.app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%]   .chat-footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #08e3ff;\n}\n.app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 20px;\n  left: 50%;\n  transform: translate(-50%, 50%);\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  background-color: #2a2a2a;\n  padding: 10px;\n  width: auto;\n  border-radius: 10px;\n}\n.app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  padding: 10px;\n  background-color: #00bcd4;\n  border: none;\n  border-radius: 50%;\n  cursor: pointer;\n  color: #fff;\n}\n.app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  background-color: #08e3ff;\n}\n@media (max-width: 1024px) {\n  .app-container[_ngcontent-%COMP%]   .app-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    height: 100vh;\n  }\n  .app-container[_ngcontent-%COMP%]   .video-main[_ngcontent-%COMP%] {\n    height: 60vh;\n  }\n  .app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%] {\n    width: 100%;\n    height: auto;\n    display: block;\n    padding: 10px;\n  }\n  .app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%] {\n    bottom: 0;\n    width: 100%;\n    justify-content: space-evenly;\n  }\n}\n@media (max-width: 300px) {\n  .app-container[_ngcontent-%COMP%] {\n  }\n  .app-container[_ngcontent-%COMP%]   .video-main[_ngcontent-%COMP%] {\n    height: 50vh;\n  }\n  .app-container[_ngcontent-%COMP%]   .video-player[_ngcontent-%COMP%] {\n    width: 100%;\n    height: auto;\n  }\n  .app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%] {\n    gap: 10px;\n    padding: 8px;\n  }\n  .app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    padding: 8px;\n    font-size: 14px;\n  }\n  .app-container[_ngcontent-%COMP%]   .chat-container[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n@media (max-width: 768px) {\n  .app-container[_ngcontent-%COMP%]   .app-container[_ngcontent-%COMP%] {\n    flex-direction: column;\n    height: 100vh;\n  }\n  .app-container[_ngcontent-%COMP%]   .controls-bar[_ngcontent-%COMP%] {\n    bottom: 0;\n    width: 100%;\n    justify-content: space-evenly;\n  }\n}\n/*# sourceMappingURL=meeting-room.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i03.\u0275setClassDebugInfo(MeetingRoomComponent, { className: "MeetingRoomComponent" });
})();

// projects/stream/src/app/app.component.ts
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule as CommonModule3 } from "@angular/common";
import * as i04 from "@angular/core";
import * as i23 from "@angular/common";
import * as i32 from "@angular/forms";
function AppComponent_app_stream_meeting_room_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i04.\u0275\u0275getCurrentView();
    i04.\u0275\u0275elementStart(0, "app-stream-meeting-room", 2);
    i04.\u0275\u0275listener("logined", function AppComponent_app_stream_meeting_room_0_Template_app_stream_meeting_room_logined_0_listener() {
      i04.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i04.\u0275\u0275nextContext();
      return i04.\u0275\u0275resetView(ctx_r1.endSession());
    });
    i04.\u0275\u0275elementEnd();
  }
}
function AppComponent_div_1_div_7_small_1_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "small");
    i04.\u0275\u0275text(1, "Username is required.");
    i04.\u0275\u0275elementEnd();
  }
}
function AppComponent_div_1_div_7_small_2_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "small");
    i04.\u0275\u0275text(1, "Username must be at least 3 characters long.");
    i04.\u0275\u0275elementEnd();
  }
}
function AppComponent_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "div", 15);
    i04.\u0275\u0275template(1, AppComponent_div_1_div_7_small_1_Template, 2, 0, "small", 16)(2, AppComponent_div_1_div_7_small_2_Template, 2, 0, "small", 16);
    i04.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i04.\u0275\u0275nextContext(2);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275property("ngIf", ctx_r1.loginForm.controls["username"].hasError("required"));
    i04.\u0275\u0275advance();
    i04.\u0275\u0275property("ngIf", ctx_r1.loginForm.controls["username"].hasError("minlength"));
  }
}
function AppComponent_div_1_div_8_div_4_small_1_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "small");
    i04.\u0275\u0275text(1, "Code is required.");
    i04.\u0275\u0275elementEnd();
  }
}
function AppComponent_div_1_div_8_div_4_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "div", 15);
    i04.\u0275\u0275template(1, AppComponent_div_1_div_8_div_4_small_1_Template, 2, 0, "small", 16);
    i04.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i04.\u0275\u0275nextContext(3);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275property("ngIf", ctx_r1.loginForm.controls["code"].hasError("required"));
  }
}
function AppComponent_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "div", 6)(1, "label", 17);
    i04.\u0275\u0275text(2, "Code");
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275element(3, "input", 18);
    i04.\u0275\u0275template(4, AppComponent_div_1_div_8_div_4_Template, 2, 1, "div", 9);
    i04.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i04.\u0275\u0275nextContext(2);
    i04.\u0275\u0275advance(4);
    i04.\u0275\u0275property("ngIf", ctx_r1.loginForm.controls["code"].invalid && ctx_r1.loginForm.controls["code"].touched);
  }
}
function AppComponent_div_1_button_9_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "button", 19);
    i04.\u0275\u0275text(1, "Join");
    i04.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i04.\u0275\u0275nextContext(2);
    i04.\u0275\u0275property("disabled", ctx_r1.loginForm.invalid);
  }
}
function AppComponent_div_1_button_10_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "button", 19);
    i04.\u0275\u0275text(1, "Create");
    i04.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = i04.\u0275\u0275nextContext(2);
    i04.\u0275\u0275property("disabled", ctx_r1.loginForm.invalid);
  }
}
function AppComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = i04.\u0275\u0275getCurrentView();
    i04.\u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "form", 5);
    i04.\u0275\u0275listener("ngSubmit", function AppComponent_div_1_Template_form_ngSubmit_2_listener() {
      i04.\u0275\u0275restoreView(_r3);
      const ctx_r1 = i04.\u0275\u0275nextContext();
      return i04.\u0275\u0275resetView(ctx_r1.onSubmit());
    });
    i04.\u0275\u0275elementStart(3, "div", 6)(4, "label", 7);
    i04.\u0275\u0275text(5, "Username");
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275element(6, "input", 8);
    i04.\u0275\u0275template(7, AppComponent_div_1_div_7_Template, 3, 2, "div", 9);
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275template(8, AppComponent_div_1_div_8_Template, 5, 1, "div", 10)(9, AppComponent_div_1_button_9_Template, 2, 1, "button", 11)(10, AppComponent_div_1_button_10_Template, 2, 1, "button", 11);
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275elementStart(11, "div", 12)(12, "button", 13);
    i04.\u0275\u0275listener("click", function AppComponent_div_1_Template_button_click_12_listener() {
      i04.\u0275\u0275restoreView(_r3);
      const ctx_r1 = i04.\u0275\u0275nextContext();
      return i04.\u0275\u0275resetView(ctx_r1.changePage(false));
    });
    i04.\u0275\u0275text(13, "Join Room");
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275elementStart(14, "button", 14);
    i04.\u0275\u0275text(15, "Create Room");
    i04.\u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = i04.\u0275\u0275nextContext();
    i04.\u0275\u0275advance(2);
    i04.\u0275\u0275property("formGroup", ctx_r1.loginForm);
    i04.\u0275\u0275advance(5);
    i04.\u0275\u0275property("ngIf", ctx_r1.loginForm.controls["username"].invalid && ctx_r1.loginForm.controls["username"].touched);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275property("ngIf", ctx_r1.isLoginFormActive);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275property("ngIf", ctx_r1.isLoginFormActive);
    i04.\u0275\u0275advance();
    i04.\u0275\u0275property("ngIf", !ctx_r1.isLoginFormActive);
    i04.\u0275\u0275advance(2);
    i04.\u0275\u0275classProp("active", ctx_r1.isLoginFormActive);
    i04.\u0275\u0275advance(2);
    i04.\u0275\u0275classProp("active", !ctx_r1.isLoginFormActive);
  }
}
var AppComponent = class _AppComponent {
  apiService;
  title = "stream";
  isLoginFormActive = true;
  loginForm;
  logined = false;
  constructor(apiService) {
    this.apiService = apiService;
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.minLength(3)
      ]),
      code: new FormControl({ value: "", disabled: false }, [Validators.required])
    });
    const userData = localStorage.getItem("userData");
    if (userData) {
      this.logined = true;
      const parsedUserData = JSON.parse(userData);
      console.log(parsedUserData.username);
    }
  }
  onSubmit() {
    this.loginForm.patchValue({
      username: this.loginForm.controls["username"]?.value?.trim(),
      code: this.loginForm.controls["code"]?.value?.trim()
    });
    if (this.loginForm.valid) {
      console.log("Login successful");
      this.apiService.vedioSrc = this.loginForm.controls["code"]?.value?.trim();
      this.logined = true;
    } else {
      console.log("Please fill in both fields");
    }
  }
  changePage(e) {
  }
  endSession() {
    this.logined = false;
  }
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)(i04.\u0275\u0275directiveInject(ApiService));
  };
  static \u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-stream-root"]], standalone: true, features: [i04.\u0275\u0275ProvidersFeature([ApiService]), i04.\u0275\u0275StandaloneFeature], decls: 2, vars: 2, consts: [[3, "logined", 4, "ngIf"], ["class", "modal-overlay", 4, "ngIf"], [3, "logined"], [1, "modal-overlay"], [1, "modal-content"], ["id", "qwerty", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "username"], ["id", "username", "formControlName", "username", "type", "text", "placeholder", "Enter your username", 1, "form-control"], ["class", "error", 4, "ngIf"], ["class", "form-group", 4, "ngIf"], ["type", "submit", "class", "btn btn-primary", 3, "disabled", 4, "ngIf"], [1, "tabs"], ["id", "join", 3, "click"], ["id", "create"], [1, "error"], [4, "ngIf"], ["for", "code"], ["id", "code", "formControlName", "code", "type", "code", "placeholder", "Enter your code", 1, "form-control"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]], template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      i04.\u0275\u0275template(0, AppComponent_app_stream_meeting_room_0_Template, 1, 0, "app-stream-meeting-room", 0)(1, AppComponent_div_1_Template, 16, 9, "div", 1);
    }
    if (rf & 2) {
      i04.\u0275\u0275property("ngIf", ctx.logined);
      i04.\u0275\u0275advance();
      i04.\u0275\u0275property("ngIf", !ctx.logined);
    }
  }, dependencies: [MeetingRoomComponent, CommonModule3, i23.NgIf, ReactiveFormsModule, i32.\u0275NgNoValidate, i32.DefaultValueAccessor, i32.NgControlStatus, i32.NgControlStatusGroup, i32.FormGroupDirective, i32.FormControlName], styles: ["\n\n.modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n.modal-content[_ngcontent-%COMP%] {\n  background: rgba(34, 34, 34, 0.8);\n  color: white;\n  padding: 2rem;\n  border-radius: 10px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);\n  width: 100%;\n  max-width: 400px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.form-control[_ngcontent-%COMP%] {\n  width: 96%;\n  padding: 10px;\n  margin: 0.5rem 0;\n  border: 1px solid #444;\n  border-radius: 4px;\n  background-color: #333;\n  color: white;\n}\nbutton[_ngcontent-%COMP%]:disabled {\n  background-color: #444;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: red;\n  font-size: 1.1rem;\n}\n.tabs[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-around;\n  margin-top: 1rem;\n}\n.tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 10px;\n  font-size: 16px;\n  cursor: pointer;\n  color: white;\n  transition: background-color 0.3s ease;\n}\n#join.active[_ngcontent-%COMP%] {\n  color: #00ff5e;\n}\n#create.active[_ngcontent-%COMP%] {\n  color: #ffc400;\n}\n.btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  margin: 1rem 0;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.btn[_ngcontent-%COMP%]:hover {\n  background-color: #0056b3;\n}\n/*# sourceMappingURL=app.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(AppComponent, { className: "AppComponent" });
})();
export {
  AppComponent
};
//# sourceMappingURL=Component.js.map
