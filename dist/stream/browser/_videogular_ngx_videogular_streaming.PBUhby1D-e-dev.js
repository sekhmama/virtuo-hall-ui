var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {}) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)) {
    if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  }
  return a;
};

// node_modules/@videogular/ngx-videogular/fesm2022/videogular-ngx-videogular-streaming.mjs
import * as i0 from "@angular/core";
import { EventEmitter, Directive, Input, Output, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as i1 from "@videogular/ngx-videogular/core";
import { VgCoreModule } from "@videogular/ngx-videogular/core";
var VgDashDirective = class _VgDashDirective {
  constructor(ref, API) {
    this.ref = ref;
    this.API = API;
    this.onGetBitrates = new EventEmitter();
    this.subscriptions = [];
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.vgFor = this.ref.nativeElement.getAttribute("vgFor");
    this.target = this.API.getMediaById(this.vgFor);
    this.createPlayer();
  }
  ngOnChanges(changes) {
    changes.vgDash?.currentValue ? this.createPlayer() : this.destroyPlayer();
  }
  createPlayer() {
    if (this.dash) {
      this.destroyPlayer();
    }
    if (this.vgDash && (this.vgDash.indexOf(".mpd") > -1 || this.vgDash.indexOf("mpd-time-csf") > -1)) {
      let drmOptions;
      if (this.vgDRMLicenseServer) {
        drmOptions = this.vgDRMLicenseServer;
        if (this.vgDRMToken) {
          for (const drmServer in drmOptions) {
            if (drmServer.hasOwnProperty(drmServer)) {
              drmOptions[drmServer].httpRequestHeaders = {
                Authorization: this.vgDRMToken
              };
            }
          }
        }
      }
      this.dash = dashjs.MediaPlayer().create();
      this.dash.updateSettings({
        debug: {
          logLevel: dashjs.Debug.LOG_LEVEL_NONE
        }
      });
      this.dash.initialize(this.ref.nativeElement);
      this.dash.setAutoPlay(false);
      this.dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
        const audioList = this.dash.getBitrateInfoListFor("audio");
        const videoList = this.dash.getBitrateInfoListFor("video");
        if (audioList.length > 1) {
          audioList.forEach(item => item.qualityIndex = ++item.qualityIndex);
          audioList.unshift({
            qualityIndex: 0,
            width: 0,
            height: 0,
            bitrate: 0,
            mediaType: "video",
            scanType: "AUTO"
          });
          this.onGetBitrates.emit(audioList);
        }
        if (videoList.length > 1) {
          videoList.forEach(item => item.qualityIndex = ++item.qualityIndex);
          videoList.unshift({
            qualityIndex: 0,
            width: 0,
            height: 0,
            bitrate: 0,
            mediaType: "video",
            scanType: "AUTO"
          });
          this.onGetBitrates.emit(videoList);
        }
      });
      if (drmOptions) {
        this.dash.setProtectionData(drmOptions);
      }
      this.dash.attachSource(this.vgDash);
    } else {
      if (this.target) {
        this.target.pause();
        this.target.seekTime(0);
        this.ref.nativeElement.src = this.vgDash;
      }
    }
  }
  setBitrate({
    mediaType,
    qualityIndex
  }) {
    if (this.dash) {
      if (qualityIndex > 0) {
        if (this.dash.getSettings()) {
          this.dash.updateSettings({
            streaming: {
              abr: {
                autoSwitchBitrate: {
                  [mediaType]: false
                }
              }
            }
          });
        }
        const nextIndex = qualityIndex - 1;
        this.dash.setQualityFor(mediaType, nextIndex);
      } else {
        this.dash.updateSettings({
          streaming: {
            abr: {
              autoSwitchBitrate: {
                [mediaType]: true
              }
            }
          }
        });
      }
    }
  }
  destroyPlayer() {
    if (this.dash) {
      this.dash.reset();
      this.dash = null;
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.destroyPlayer();
  }
  static {
    this.ɵfac = function VgDashDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgDashDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
      type: _VgDashDirective,
      selectors: [["", "vgDash", ""]],
      inputs: {
        vgDash: "vgDash",
        vgDRMToken: "vgDRMToken",
        vgDRMLicenseServer: "vgDRMLicenseServer"
      },
      outputs: {
        onGetBitrates: "onGetBitrates"
      },
      exportAs: ["vgDash"],
      features: [i0.ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgDashDirective, [{
    type: Directive,
    args: [{
      selector: "[vgDash]",
      exportAs: "vgDash"
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgDash: [{
      type: Input
    }],
    vgDRMToken: [{
      type: Input
    }],
    vgDRMLicenseServer: [{
      type: Input
    }],
    onGetBitrates: [{
      type: Output
    }]
  });
})();
var VgHlsDirective = class _VgHlsDirective {
  constructor(ref, API) {
    this.ref = ref;
    this.API = API;
    this.vgHlsHeaders = {};
    this.onGetBitrates = new EventEmitter();
    this.subscriptions = [];
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.crossorigin = this.ref.nativeElement.getAttribute("crossorigin");
    this.preload = this.ref.nativeElement.getAttribute("preload") !== "none";
    this.vgFor = this.ref.nativeElement.getAttribute("vgFor");
    if (this.vgFor) {
      this.target = this.API.getMediaById(this.vgFor);
    } else {
      this.target = this.API.getDefaultMedia();
    }
    this.config = __spreadValues({
      autoStartLoad: this.preload,
      xhrSetup: xhr => {
        if (this.crossorigin === "use-credentials") {
          xhr.withCredentials = true;
        }
        for (const key of Object.keys(this.vgHlsHeaders)) {
          xhr.setRequestHeader(key, this.vgHlsHeaders[key]);
        }
      }
    }, this.config);
    this.createPlayer();
    if (!this.preload) {
      this.subscriptions.push(this.API.subscriptions.play.subscribe(() => {
        if (this.hls) {
          this.hls.startLoad(0);
        }
      }));
    }
  }
  ngOnChanges(changes) {
    if (changes.vgHls?.currentValue) {
      this.createPlayer();
    } else if (changes.vgHlsHeaders && changes.vgHlsHeaders.currentValue) {} else {
      this.destroyPlayer();
    }
  }
  createPlayer() {
    if (this.hls) {
      this.destroyPlayer();
    }
    if (this.vgHls && this.vgHls.indexOf("m3u8") > -1 && Hls.isSupported() && this.API.isPlayerReady) {
      const video = this.ref.nativeElement;
      this.hls = new Hls(this.config);
      this.hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
        const videoList = [];
        videoList.push({
          qualityIndex: 0,
          width: 0,
          height: 0,
          bitrate: 0,
          mediaType: "video",
          label: "AUTO"
        });
        data.levels.forEach((item, index) => {
          videoList.push({
            qualityIndex: ++index,
            width: item.width,
            height: item.height,
            bitrate: item.bitrate,
            mediaType: "video",
            label: item.name
          });
        });
        this.onGetBitrates.emit(videoList);
      });
      this.hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
        this.target.isLive = data.details.live;
      });
      this.hls.loadSource(this.vgHls);
      this.hls.attachMedia(video);
    } else {
      if (this.target && !!this.target.pause) {
        this.target.pause();
        this.target.seekTime(0);
        this.ref.nativeElement.src = this.vgHls;
      }
    }
  }
  setBitrate(bitrate) {
    if (this.hls) {
      this.hls.nextLevel = bitrate.qualityIndex - 1;
    }
  }
  destroyPlayer() {
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.destroyPlayer();
    delete this.hls;
  }
  static {
    this.ɵfac = function VgHlsDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgHlsDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
      type: _VgHlsDirective,
      selectors: [["", "vgHls", ""]],
      inputs: {
        vgHls: "vgHls",
        vgHlsHeaders: "vgHlsHeaders",
        config: "config"
      },
      outputs: {
        onGetBitrates: "onGetBitrates"
      },
      exportAs: ["vgHls"],
      features: [i0.ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgHlsDirective, [{
    type: Directive,
    args: [{
      selector: "[vgHls]",
      exportAs: "vgHls"
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgHls: [{
      type: Input
    }],
    vgHlsHeaders: [{
      type: Input
    }],
    config: [{
      type: Input
    }],
    onGetBitrates: [{
      type: Output
    }]
  });
})();
var VgStreamingModule = class _VgStreamingModule {
  static {
    this.ɵfac = function VgStreamingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgStreamingModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _VgStreamingModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      imports: [CommonModule, VgCoreModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgStreamingModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, VgCoreModule],
      declarations: [VgDashDirective, VgHlsDirective],
      exports: [VgDashDirective, VgHlsDirective]
    }]
  }], null, null);
})();
export { VgDashDirective, VgHlsDirective, VgStreamingModule };