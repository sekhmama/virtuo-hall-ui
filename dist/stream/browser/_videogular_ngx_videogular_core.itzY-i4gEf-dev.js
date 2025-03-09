// node_modules/@videogular/ngx-videogular/fesm2022/videogular-ngx-videogular-core.mjs
import * as i0 from "@angular/core";
import { Injectable, EventEmitter, Directive, Output, Input, Component, ViewEncapsulation, HostBinding, ContentChildren, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subject, fromEvent, Observable, combineLatest, timer } from "rxjs";
import { map } from "rxjs/operators";
var _c0 = ["*"];
var VgStates = class _VgStates {
  static {
    this.VG_ENDED = "ended";
  }
  static {
    this.VG_PAUSED = "paused";
  }
  static {
    this.VG_PLAYING = "playing";
  }
  static {
    this.VG_LOADING = "waiting";
  }
  static {
    this.ɵfac = function VgStates_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgStates)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _VgStates,
      factory: _VgStates.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgStates, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var VgApiService = class _VgApiService {
  constructor() {
    this.medias = {};
    this.playerReadyEvent = new EventEmitter(true);
    this.isPlayerReady = false;
  }
  onPlayerReady(fsAPI) {
    this.fsAPI = fsAPI;
    this.isPlayerReady = true;
    this.playerReadyEvent.emit(this);
  }
  getDefaultMedia() {
    for (const item in this.medias) {
      if (this.medias[item]) {
        return this.medias[item];
      }
    }
  }
  getMasterMedia() {
    let master;
    for (const id in this.medias) {
      if (this.medias[id].vgMaster === "true" || this.medias[id].vgMaster === true) {
        master = this.medias[id];
        break;
      }
    }
    return master || this.getDefaultMedia();
  }
  isMasterDefined() {
    let result = false;
    for (const id in this.medias) {
      if (this.medias[id].vgMaster === "true" || this.medias[id].vgMaster === true) {
        result = true;
        break;
      }
    }
    return result;
  }
  getMediaById(id = null) {
    let media = this.medias[id];
    if (!id || id === "*") {
      media = this;
    }
    return media;
  }
  play() {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.medias[id].play();
      }
    }
  }
  pause() {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.medias[id].pause();
      }
    }
  }
  get duration() {
    return this.$$getAllProperties("duration");
  }
  set currentTime(seconds) {
    this.$$setAllProperties("currentTime", seconds);
  }
  get currentTime() {
    return this.$$getAllProperties("currentTime");
  }
  set state(state) {
    this.$$setAllProperties("state", state);
  }
  get state() {
    return this.$$getAllProperties("state");
  }
  set volume(volume) {
    this.$$setAllProperties("volume", volume);
  }
  get volume() {
    return this.$$getAllProperties("volume");
  }
  set playbackRate(rate) {
    this.$$setAllProperties("playbackRate", rate);
  }
  get playbackRate() {
    return this.$$getAllProperties("playbackRate");
  }
  get canPlay() {
    return this.$$getAllProperties("canPlay");
  }
  get canPlayThrough() {
    return this.$$getAllProperties("canPlayThrough");
  }
  get isMetadataLoaded() {
    return this.$$getAllProperties("isMetadataLoaded");
  }
  get isWaiting() {
    return this.$$getAllProperties("isWaiting");
  }
  get isCompleted() {
    return this.$$getAllProperties("isCompleted");
  }
  get isLive() {
    return this.$$getAllProperties("isLive");
  }
  get isMaster() {
    return this.$$getAllProperties("isMaster");
  }
  get time() {
    return this.$$getAllProperties("time");
  }
  get buffer() {
    return this.$$getAllProperties("buffer");
  }
  get buffered() {
    return this.$$getAllProperties("buffered");
  }
  get subscriptions() {
    return this.$$getAllProperties("subscriptions");
  }
  get textTracks() {
    return this.$$getAllProperties("textTracks");
  }
  seekTime(value, byPercent = false) {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.$$seek(this.medias[id], value, byPercent);
      }
    }
  }
  $$seek(media, value, byPercent = false) {
    let second;
    let duration = media.duration;
    if (byPercent) {
      if (this.isMasterDefined()) {
        duration = this.getMasterMedia().duration;
      }
      second = value * duration / 100;
    } else {
      second = value;
    }
    media.currentTime = second;
  }
  addTextTrack(type, label, language) {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.$$addTextTrack(this.medias[id], type, label, language);
      }
    }
  }
  $$addTextTrack(media, type, label, language) {
    media.addTextTrack(type, label, language);
  }
  $$getAllProperties(property) {
    const medias = {};
    let result;
    for (const id in this.medias) {
      if (this.medias[id]) {
        medias[id] = this.medias[id];
      }
    }
    const nMedias = Object.keys(medias).length;
    switch (nMedias) {
      case 0:
        switch (property) {
          case "state":
            result = VgStates.VG_PAUSED;
            break;
          case "playbackRate":
          case "volume":
            result = 1;
            break;
          case "time":
            result = {
              current: 0,
              total: 0,
              left: 0
            };
            break;
        }
        break;
      case 1:
        const firstMediaId = Object.keys(medias)[0];
        result = medias[firstMediaId][property];
        break;
      default:
        const master = this.getMasterMedia();
        result = medias[master.id][property];
    }
    return result;
  }
  $$setAllProperties(property, value) {
    for (const id in this.medias) {
      if (this.medias[id]) {
        this.medias[id][property] = value;
      }
    }
  }
  registerElement(elem) {
    this.videogularElement = elem;
  }
  registerMedia(media) {
    this.medias[media.id] = media;
  }
  unregisterMedia(media) {
    delete this.medias[media.id];
  }
  static {
    this.ɵfac = function VgApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgApiService)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _VgApiService,
      factory: _VgApiService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var VgControlsHiddenService = class _VgControlsHiddenService {
  constructor() {
    this.isHiddenSubject = new Subject();
    this.isHidden = this.isHiddenSubject.asObservable();
  }
  state(hidden) {
    this.isHiddenSubject.next(hidden);
  }
  static {
    this.ɵfac = function VgControlsHiddenService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgControlsHiddenService)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _VgControlsHiddenService,
      factory: _VgControlsHiddenService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgControlsHiddenService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var VgUtilsService = class _VgUtilsService {
  /**
   * Inspired by Paul Irish
   * https://gist.github.com/paulirish/211209
   */
  static getZIndex() {
    let zIndex = 1;
    let elementZIndex;
    const tags = document.getElementsByTagName("*");
    for (let i = 0, l = tags.length; i < l; i++) {
      elementZIndex = parseInt(window.getComputedStyle(tags[i])["z-index"], 10);
      if (elementZIndex > zIndex) {
        zIndex = elementZIndex + 1;
      }
    }
    return zIndex;
  }
  // Very simple mobile detection, not 100% reliable
  static isMobileDevice() {
    return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1;
  }
  static isiOSDevice() {
    return (navigator.userAgent.match(/ip(hone|ad|od)/i) || _VgUtilsService.isIpadOS()) && !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i);
  }
  static isIpadOS() {
    return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
  }
  static isCordova() {
    return document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1;
  }
  static {
    this.ɵfac = function VgUtilsService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgUtilsService)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _VgUtilsService,
      factory: _VgUtilsService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgUtilsService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var VgFullscreenApiService = class _VgFullscreenApiService {
  constructor() {
    this.nativeFullscreen = true;
    this.isFullscreen = false;
    this.onChangeFullscreen = new EventEmitter();
  }
  init(elem, medias) {
    this.videogularElement = elem;
    this.medias = medias;
    const APIs = {
      w3: {
        enabled: "fullscreenEnabled",
        element: "fullscreenElement",
        request: "requestFullscreen",
        exit: "exitFullscreen",
        onchange: "fullscreenchange",
        onerror: "fullscreenerror"
      },
      newWebkit: {
        enabled: "webkitFullscreenEnabled",
        element: "webkitFullscreenElement",
        request: "webkitRequestFullscreen",
        exit: "webkitExitFullscreen",
        onchange: "webkitfullscreenchange",
        onerror: "webkitfullscreenerror"
      },
      oldWebkit: {
        enabled: "webkitIsFullScreen",
        element: "webkitCurrentFullScreenElement",
        request: "webkitRequestFullScreen",
        exit: "webkitCancelFullScreen",
        onchange: "webkitfullscreenchange",
        onerror: "webkitfullscreenerror"
      },
      moz: {
        enabled: "mozFullScreen",
        element: "mozFullScreenElement",
        request: "mozRequestFullScreen",
        exit: "mozCancelFullScreen",
        onchange: "mozfullscreenchange",
        onerror: "mozfullscreenerror"
      },
      ios: {
        enabled: "webkitFullscreenEnabled",
        element: "webkitFullscreenElement",
        request: "webkitEnterFullscreen",
        exit: "webkitExitFullscreen",
        onchange: "webkitendfullscreen",
        // Hack for iOS: webkitfullscreenchange it's not firing
        onerror: "webkitfullscreenerror"
      },
      ms: {
        enabled: "msFullscreenEnabled",
        element: "msFullscreenElement",
        request: "msRequestFullscreen",
        exit: "msExitFullscreen",
        onchange: "MSFullscreenChange",
        onerror: "MSFullscreenError"
      }
    };
    for (const browser in APIs) {
      if (APIs[browser].enabled in document) {
        this.polyfill = APIs[browser];
        break;
      }
    }
    if (VgUtilsService.isiOSDevice()) {
      this.polyfill = APIs.ios;
    }
    this.isAvailable = this.polyfill != null;
    if (this.polyfill == null) {
      return;
    }
    let fsElemDispatcher;
    switch (this.polyfill.onchange) {
      case "mozfullscreenchange":
        fsElemDispatcher = document;
        break;
      case "webkitendfullscreen":
        fsElemDispatcher = this.medias.toArray()[0].elem;
        break;
      default:
        fsElemDispatcher = elem;
    }
    this.fsChangeSubscription = fromEvent(fsElemDispatcher, this.polyfill.onchange).subscribe(() => {
      this.onFullscreenChange();
    });
  }
  onFullscreenChange() {
    this.isFullscreen = !!document[this.polyfill.element];
    this.onChangeFullscreen.emit(this.isFullscreen);
  }
  toggleFullscreen(element = null) {
    if (this.isFullscreen) {
      return this.exit();
    }
    return this.request(element);
  }
  request(elem) {
    if (!elem) {
      elem = this.videogularElement;
    }
    this.isFullscreen = true;
    this.onChangeFullscreen.emit(true);
    if (this.isAvailable && this.nativeFullscreen) {
      if (VgUtilsService.isMobileDevice()) {
        if (!this.polyfill.enabled && elem === this.videogularElement || VgUtilsService.isiOSDevice()) {
          elem = this.medias.toArray()[0].elem;
        }
        return this.enterElementInFullScreen(elem);
      }
      return this.enterElementInFullScreen(this.videogularElement);
    }
    return Promise.resolve();
  }
  enterElementInFullScreen(elem) {
    return elem[this.polyfill.request]();
  }
  exit() {
    this.isFullscreen = false;
    this.onChangeFullscreen.emit(false);
    if (this.isAvailable && this.nativeFullscreen) {
      return document[this.polyfill.exit]();
    }
    return Promise.resolve();
  }
  static {
    this.ɵfac = function VgFullscreenApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgFullscreenApiService)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _VgFullscreenApiService,
      factory: _VgFullscreenApiService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgFullscreenApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var VgEvents = class _VgEvents {
  static {
    this.VG_ABORT = "abort";
  }
  static {
    this.VG_CAN_PLAY = "canplay";
  }
  static {
    this.VG_CAN_PLAY_THROUGH = "canplaythrough";
  }
  static {
    this.VG_DURATION_CHANGE = "durationchange";
  }
  static {
    this.VG_EMPTIED = "emptied";
  }
  static {
    this.VG_ENCRYPTED = "encrypted";
  }
  static {
    this.VG_ENDED = "ended";
  }
  static {
    this.VG_ERROR = "error";
  }
  static {
    this.VG_LOADED_DATA = "loadeddata";
  }
  static {
    this.VG_LOADED_METADATA = "loadedmetadata";
  }
  static {
    this.VG_LOAD_START = "loadstart";
  }
  static {
    this.VG_PAUSE = "pause";
  }
  static {
    this.VG_PLAY = "play";
  }
  static {
    this.VG_PLAYING = "playing";
  }
  static {
    this.VG_PROGRESS = "progress";
  }
  static {
    this.VG_RATE_CHANGE = "ratechange";
  }
  static {
    this.VG_SEEK = "seek";
  }
  static {
    this.VG_SEEKED = "seeked";
  }
  static {
    this.VG_SEEKING = "seeking";
  }
  static {
    this.VG_STALLED = "stalled";
  }
  static {
    this.VG_SUSPEND = "suspend";
  }
  static {
    this.VG_TIME_UPDATE = "timeupdate";
  }
  static {
    this.VG_VOLUME_CHANGE = "volumechange";
  }
  static {
    this.VG_WAITING = "waiting";
  }
  static {
    this.VG_LOAD = "load";
  }
  static {
    this.VG_ENTER = "enter";
  }
  static {
    this.VG_EXIT = "exit";
  }
  static {
    this.VG_START_ADS = "startads";
  }
  static {
    this.VG_END_ADS = "endads";
  }
  static {
    this.ɵfac = function VgEvents_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgEvents)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */i0.ɵɵdefineInjectable({
      token: _VgEvents,
      factory: _VgEvents.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgEvents, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var VgCuePointsDirective = class _VgCuePointsDirective {
  constructor(ref) {
    this.ref = ref;
    this.onEnterCuePoint = new EventEmitter();
    this.onUpdateCuePoint = new EventEmitter();
    this.onExitCuePoint = new EventEmitter();
    this.onCompleteCuePoint = new EventEmitter();
    this.subscriptions = [];
    this.cuesSubscriptions = [];
    this.totalCues = 0;
  }
  ngOnInit() {
    this.onLoad$ = fromEvent(this.ref.nativeElement, VgEvents.VG_LOAD);
    this.subscriptions.push(this.onLoad$.subscribe(this.onLoad.bind(this)));
  }
  onLoad(event) {
    const cues = event.target.track.cues;
    this.ref.nativeElement.cues = cues;
    this.updateCuePoints(cues);
  }
  updateCuePoints(cues) {
    this.cuesSubscriptions.forEach(s => s.unsubscribe());
    for (let i = 0, l = cues.length; i < l; i++) {
      this.onEnter$ = fromEvent(cues[i], VgEvents.VG_ENTER);
      this.cuesSubscriptions.push(this.onEnter$.subscribe(this.onEnter.bind(this)));
      this.onExit$ = fromEvent(cues[i], VgEvents.VG_EXIT);
      this.cuesSubscriptions.push(this.onExit$.subscribe(this.onExit.bind(this)));
    }
  }
  onEnter(event) {
    this.onEnterCuePoint.emit(event.target);
  }
  onExit(event) {
    this.onExitCuePoint.emit(event.target);
  }
  ngDoCheck() {
    if (this.ref.nativeElement.track && this.ref.nativeElement.track.cues) {
      const changes = this.totalCues !== this.ref.nativeElement.track.cues.length;
      if (changes) {
        this.totalCues = this.ref.nativeElement.track.cues.length;
        this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
        this.updateCuePoints(this.ref.nativeElement.track.cues);
      }
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgCuePointsDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgCuePointsDirective)(i0.ɵɵdirectiveInject(i0.ElementRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
      type: _VgCuePointsDirective,
      selectors: [["", "vgCuePoints", ""]],
      outputs: {
        onEnterCuePoint: "onEnterCuePoint",
        onUpdateCuePoint: "onUpdateCuePoint",
        onExitCuePoint: "onExitCuePoint",
        onCompleteCuePoint: "onCompleteCuePoint"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgCuePointsDirective, [{
    type: Directive,
    args: [{
      selector: "[vgCuePoints]"
    }]
  }], () => [{
    type: i0.ElementRef
  }], {
    onEnterCuePoint: [{
      type: Output
    }],
    onUpdateCuePoint: [{
      type: Output
    }],
    onExitCuePoint: [{
      type: Output
    }],
    onCompleteCuePoint: [{
      type: Output
    }]
  });
})();
var VgMediaDirective = class _VgMediaDirective {
  constructor(api, ref) {
    this.api = api;
    this.ref = ref;
    this.state = VgStates.VG_PAUSED;
    this.time = {
      current: 0,
      total: 0,
      left: 0
    };
    this.buffer = {
      end: 0
    };
    this.canPlay = false;
    this.canPlayThrough = false;
    this.isMetadataLoaded = false;
    this.isWaiting = false;
    this.isCompleted = false;
    this.isLive = false;
    this.isBufferDetected = false;
    this.checkInterval = 200;
    this.currentPlayPos = 0;
    this.lastPlayPos = 0;
    this.playAtferSync = false;
    this.bufferDetected = new Subject();
  }
  ngOnInit() {
    if (this.vgMedia.nodeName) {
      this.elem = this.vgMedia;
    } else {
      this.elem = this.vgMedia.elem;
    }
    this.api.registerMedia(this);
    this.subscriptions = {
      // Native events
      abort: fromEvent(this.elem, VgEvents.VG_ABORT),
      canPlay: fromEvent(this.elem, VgEvents.VG_CAN_PLAY),
      canPlayThrough: fromEvent(this.elem, VgEvents.VG_CAN_PLAY_THROUGH),
      durationChange: fromEvent(this.elem, VgEvents.VG_DURATION_CHANGE),
      emptied: fromEvent(this.elem, VgEvents.VG_EMPTIED),
      encrypted: fromEvent(this.elem, VgEvents.VG_ENCRYPTED),
      ended: fromEvent(this.elem, VgEvents.VG_ENDED),
      error: fromEvent(this.elem, VgEvents.VG_ERROR),
      loadedData: fromEvent(this.elem, VgEvents.VG_LOADED_DATA),
      loadedMetadata: fromEvent(this.elem, VgEvents.VG_LOADED_METADATA),
      loadStart: fromEvent(this.elem, VgEvents.VG_LOAD_START),
      pause: fromEvent(this.elem, VgEvents.VG_PAUSE),
      play: fromEvent(this.elem, VgEvents.VG_PLAY),
      playing: fromEvent(this.elem, VgEvents.VG_PLAYING),
      progress: fromEvent(this.elem, VgEvents.VG_PROGRESS),
      rateChange: fromEvent(this.elem, VgEvents.VG_RATE_CHANGE),
      seeked: fromEvent(this.elem, VgEvents.VG_SEEKED),
      seeking: fromEvent(this.elem, VgEvents.VG_SEEKING),
      stalled: fromEvent(this.elem, VgEvents.VG_STALLED),
      suspend: fromEvent(this.elem, VgEvents.VG_SUSPEND),
      timeUpdate: fromEvent(this.elem, VgEvents.VG_TIME_UPDATE),
      volumeChange: fromEvent(this.elem, VgEvents.VG_VOLUME_CHANGE),
      waiting: fromEvent(this.elem, VgEvents.VG_WAITING),
      // Advertisement only events
      startAds: fromEvent(window, VgEvents.VG_START_ADS),
      endAds: fromEvent(window, VgEvents.VG_END_ADS),
      // See changes on <source> child elements to reload the video file
      mutation: new Observable(observer => {
        const domObs = new MutationObserver(mutations => {
          observer.next(mutations);
        });
        domObs.observe(this.elem, {
          childList: true,
          attributes: true
        });
        return () => {
          domObs.disconnect();
        };
      }),
      // Custom buffering detection
      bufferDetected: this.bufferDetected
    };
    this.mutationObs = this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
    this.canPlayObs = this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
    this.canPlayThroughObs = this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
    this.loadedMetadataObs = this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
    this.waitingObs = this.subscriptions.waiting.subscribe(this.onWait.bind(this));
    this.progressObs = this.subscriptions.progress.subscribe(this.onProgress.bind(this));
    this.endedObs = this.subscriptions.ended.subscribe(this.onComplete.bind(this));
    this.playingObs = this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
    this.playObs = this.subscriptions.play.subscribe(this.onPlay.bind(this));
    this.pauseObs = this.subscriptions.pause.subscribe(this.onPause.bind(this));
    this.timeUpdateObs = this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
    this.volumeChangeObs = this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
    this.errorObs = this.subscriptions.error.subscribe(this.onError.bind(this));
    if (this.vgMaster) {
      this.api.playerReadyEvent.subscribe(() => {
        this.prepareSync();
      });
    }
  }
  prepareSync() {
    const canPlayAll = [];
    for (const media in this.api.medias) {
      if (this.api.medias[media]) {
        canPlayAll.push(this.api.medias[media].subscriptions.canPlay);
      }
    }
    this.canPlayAllSubscription = combineLatest(canPlayAll).pipe(map((...params) => {
      const checkReadyState = event => {
        if (!event?.target) {
          return false;
        }
        return event.target.readyState === 4;
      };
      const allReady = params.some(checkReadyState);
      if (allReady && !this.syncSubscription) {
        this.startSync();
        this.syncSubscription.unsubscribe();
      }
    })).subscribe();
  }
  startSync() {
    this.syncSubscription = timer(0, 1e3).subscribe(() => {
      for (const media in this.api.medias) {
        if (this.api.medias[media] !== this) {
          const diff = this.api.medias[media].currentTime - this.currentTime;
          if (diff < -0.3 || diff > 0.3) {
            this.playAtferSync = this.state === VgStates.VG_PLAYING;
            this.pause();
            this.api.medias[media].pause();
            this.api.medias[media].currentTime = this.currentTime;
          } else {
            if (this.playAtferSync) {
              this.play();
              this.api.medias[media].play();
              this.playAtferSync = false;
            }
          }
        }
      }
    });
  }
  onMutation(mutations) {
    for (let i = 0, l = mutations.length; i < l; i++) {
      const mut = mutations[i];
      if (mut.type === "attributes" && mut.attributeName === "src") {
        if (mut.target.src && mut.target.src.length > 0 && mut.target.src.indexOf("blob:") < 0) {
          this.loadMedia();
          break;
        }
      } else if (mut.type === "childList" && mut.removedNodes.length && mut.removedNodes[0].nodeName.toLowerCase() === "source") {
        this.loadMedia();
        break;
      }
    }
  }
  loadMedia() {
    this.vgMedia.pause();
    this.vgMedia.currentTime = 0;
    this.stopBufferCheck();
    this.isBufferDetected = true;
    this.bufferDetected.next(this.isBufferDetected);
    setTimeout(() => this.vgMedia.load(), 10);
  }
  play() {
    if (this.playPromise || this.state !== VgStates.VG_PAUSED && this.state !== VgStates.VG_ENDED) {
      return;
    }
    this.playPromise = this.vgMedia.play();
    if (this.playPromise && this.playPromise.then && this.playPromise.catch) {
      this.playPromise.then(() => {
        this.playPromise = null;
      }).catch(() => {
        this.playPromise = null;
      });
    }
    return this.playPromise;
  }
  pause() {
    if (this.playPromise) {
      this.playPromise.then(() => {
        this.vgMedia.pause();
      });
    } else {
      this.vgMedia.pause();
    }
  }
  get id() {
    let result;
    if (this.vgMedia) {
      result = this.vgMedia.id;
    }
    return result;
  }
  get duration() {
    return this.vgMedia.duration === Infinity ? this.specifiedDuration : this.vgMedia.duration;
  }
  set currentTime(seconds) {
    this.vgMedia.currentTime = seconds;
  }
  get currentTime() {
    return this.vgMedia.currentTime;
  }
  set volume(volume) {
    this.vgMedia.volume = volume;
  }
  get volume() {
    return this.vgMedia.volume;
  }
  set playbackRate(rate) {
    this.vgMedia.playbackRate = rate;
  }
  get playbackRate() {
    return this.vgMedia.playbackRate;
  }
  get buffered() {
    return this.vgMedia.buffered;
  }
  get textTracks() {
    return this.vgMedia.textTracks;
  }
  // @ts-ignore
  onCanPlay(event) {
    this.isBufferDetected = false;
    this.bufferDetected.next(this.isBufferDetected);
    this.canPlay = true;
    this.ref.detectChanges();
  }
  // @ts-ignore
  onCanPlayThrough(event) {
    this.isBufferDetected = false;
    this.bufferDetected.next(this.isBufferDetected);
    this.canPlayThrough = true;
    this.ref.detectChanges();
  }
  // @ts-ignore
  onLoadMetadata(event) {
    this.isMetadataLoaded = true;
    this.time = {
      current: 0,
      left: 0,
      total: this.duration * 1e3
    };
    this.state = VgStates.VG_PAUSED;
    const t = Math.round(this.time.total);
    this.isLive = t === Infinity;
    this.ref.detectChanges();
  }
  // @ts-ignore
  onWait(event) {
    this.isWaiting = true;
    this.ref.detectChanges();
  }
  // @ts-ignore
  onComplete(event) {
    this.isCompleted = true;
    this.state = VgStates.VG_ENDED;
    this.ref.detectChanges();
  }
  // @ts-ignore
  onStartPlaying(event) {
    this.state = VgStates.VG_PLAYING;
    this.ref.detectChanges();
  }
  // @ts-ignore
  onPlay(event) {
    this.state = VgStates.VG_PLAYING;
    if (this.vgMaster) {
      if (!this.syncSubscription || this.syncSubscription.closed) {
        this.startSync();
      }
    }
    this.startBufferCheck();
    this.ref.detectChanges();
  }
  // @ts-ignore
  onPause(event) {
    this.state = VgStates.VG_PAUSED;
    if (this.vgMaster) {
      if (!this.playAtferSync) {
        this.syncSubscription.unsubscribe();
      }
    }
    this.stopBufferCheck();
    this.ref.detectChanges();
  }
  // @ts-ignore
  onTimeUpdate(event) {
    const end = this.buffered.length - 1;
    this.time = {
      current: this.currentTime * 1e3,
      total: this.time.total,
      left: (this.duration - this.currentTime) * 1e3
    };
    if (end >= 0) {
      this.buffer = {
        end: this.buffered.end(end) * 1e3
      };
    }
    this.ref.detectChanges();
  }
  // @ts-ignore
  onProgress(event) {
    const end = this.buffered.length - 1;
    if (end >= 0) {
      this.buffer = {
        end: this.buffered.end(end) * 1e3
      };
    }
    this.ref.detectChanges();
  }
  // @ts-ignore
  onVolumeChange(event) {
    this.ref.detectChanges();
  }
  // @ts-ignore
  onError(event) {
    this.ref.detectChanges();
  }
  // http://stackoverflow.com/a/23828241/779529
  bufferCheck() {
    const offset = 1 / this.checkInterval;
    this.currentPlayPos = this.currentTime;
    if (!this.isBufferDetected && this.currentPlayPos < this.lastPlayPos + offset) {
      this.isBufferDetected = true;
    }
    if (this.isBufferDetected && this.currentPlayPos > this.lastPlayPos + offset) {
      this.isBufferDetected = false;
    }
    if (!this.bufferDetected.closed) {
      this.bufferDetected.next(this.isBufferDetected);
    }
    this.lastPlayPos = this.currentPlayPos;
  }
  startBufferCheck() {
    this.checkBufferSubscription = timer(0, this.checkInterval).subscribe(() => {
      this.bufferCheck();
    });
  }
  stopBufferCheck() {
    if (this.checkBufferSubscription) {
      this.checkBufferSubscription.unsubscribe();
    }
    this.isBufferDetected = false;
    this.bufferDetected.next(this.isBufferDetected);
  }
  seekTime(value, byPercent = false) {
    let second;
    const duration = this.duration;
    if (byPercent) {
      second = value * duration / 100;
    } else {
      second = value;
    }
    this.currentTime = second;
  }
  addTextTrack(type, label, language, mode) {
    const newTrack = this.vgMedia.addTextTrack(type, label, language);
    if (mode) {
      newTrack.mode = mode;
    }
    return newTrack;
  }
  ngOnDestroy() {
    this.vgMedia.src = "";
    this.mutationObs?.unsubscribe();
    this.canPlayObs?.unsubscribe();
    this.canPlayThroughObs?.unsubscribe();
    this.loadedMetadataObs?.unsubscribe();
    this.waitingObs?.unsubscribe();
    this.progressObs?.unsubscribe();
    this.endedObs?.unsubscribe();
    this.playingObs?.unsubscribe();
    this.playObs?.unsubscribe();
    this.pauseObs?.unsubscribe();
    this.timeUpdateObs?.unsubscribe();
    this.volumeChangeObs?.unsubscribe();
    this.errorObs?.unsubscribe();
    this.checkBufferSubscription?.unsubscribe();
    this.syncSubscription?.unsubscribe();
    this.bufferDetected?.complete();
    this.bufferDetected?.unsubscribe();
    this.api.unregisterMedia(this);
  }
  static {
    this.ɵfac = function VgMediaDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgMediaDirective)(i0.ɵɵdirectiveInject(VgApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */i0.ɵɵdefineDirective({
      type: _VgMediaDirective,
      selectors: [["", "vgMedia", ""]],
      inputs: {
        vgMedia: "vgMedia",
        vgMaster: "vgMaster"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgMediaDirective, [{
    type: Directive,
    args: [{
      selector: "[vgMedia]"
    }]
  }], () => [{
    type: VgApiService
  }, {
    type: i0.ChangeDetectorRef
  }], {
    vgMedia: [{
      type: Input
    }],
    vgMaster: [{
      type: Input
    }]
  });
})();
var VgPlayerComponent = class _VgPlayerComponent {
  constructor(ref, api, fsAPI, controlsHidden) {
    this.api = api;
    this.fsAPI = fsAPI;
    this.controlsHidden = controlsHidden;
    this.isFullscreen = false;
    this.isNativeFullscreen = false;
    this.areControlsHidden = false;
    this.onPlayerReady = new EventEmitter();
    this.onMediaReady = new EventEmitter();
    this.subscriptions = [];
    this.elem = ref.nativeElement;
    this.api.registerElement(this.elem);
  }
  ngAfterContentInit() {
    this.medias.toArray().forEach(media => {
      this.api.registerMedia(media);
    });
    this.fsAPI.init(this.elem, this.medias);
    this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
    this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
    this.api.onPlayerReady(this.fsAPI);
    this.onPlayerReady.emit(this.api);
  }
  onChangeFullscreen(fsState) {
    if (!this.fsAPI.nativeFullscreen) {
      this.isFullscreen = fsState;
      this.zIndex = fsState ? VgUtilsService.getZIndex().toString() : "auto";
    } else {
      this.isNativeFullscreen = fsState;
    }
  }
  onHideControls(hidden) {
    this.areControlsHidden = hidden;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgPlayerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgPlayerComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(VgApiService), i0.ɵɵdirectiveInject(VgFullscreenApiService), i0.ɵɵdirectiveInject(VgControlsHiddenService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgPlayerComponent,
      selectors: [["vg-player"]],
      contentQueries: function VgPlayerComponent_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          i0.ɵɵcontentQuery(dirIndex, VgMediaDirective, 5);
        }
        if (rf & 2) {
          let _t;
          i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.medias = _t);
        }
      },
      hostVars: 8,
      hostBindings: function VgPlayerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          i0.ɵɵstyleProp("z-index", ctx.zIndex);
          i0.ɵɵclassProp("fullscreen", ctx.isFullscreen)("native-fullscreen", ctx.isNativeFullscreen)("controls-hidden", ctx.areControlsHidden);
        }
      },
      outputs: {
        onPlayerReady: "onPlayerReady",
        onMediaReady: "onMediaReady"
      },
      features: [i0.ɵɵProvidersFeature([VgApiService, VgFullscreenApiService, VgControlsHiddenService])],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function VgPlayerComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵprojectionDef();
          i0.ɵɵprojection(0);
        }
      },
      styles: ["vg-player{font-family:videogular;position:relative;display:flex;width:100%;height:100%;overflow:hidden;background-color:#000}vg-player.fullscreen{position:fixed;left:0;top:0}vg-player.native-fullscreen.controls-hidden{cursor:none}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgPlayerComponent, [{
    type: Component,
    args: [{
      selector: "vg-player",
      encapsulation: ViewEncapsulation.None,
      template: `<ng-content></ng-content>`,
      providers: [VgApiService, VgFullscreenApiService, VgControlsHiddenService],
      styles: ["vg-player{font-family:videogular;position:relative;display:flex;width:100%;height:100%;overflow:hidden;background-color:#000}vg-player.fullscreen{position:fixed;left:0;top:0}vg-player.native-fullscreen.controls-hidden{cursor:none}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: VgApiService
  }, {
    type: VgFullscreenApiService
  }, {
    type: VgControlsHiddenService
  }], {
    isFullscreen: [{
      type: HostBinding,
      args: ["class.fullscreen"]
    }],
    isNativeFullscreen: [{
      type: HostBinding,
      args: ["class.native-fullscreen"]
    }],
    areControlsHidden: [{
      type: HostBinding,
      args: ["class.controls-hidden"]
    }],
    zIndex: [{
      type: HostBinding,
      args: ["style.z-index"]
    }],
    onPlayerReady: [{
      type: Output
    }],
    onMediaReady: [{
      type: Output
    }],
    medias: [{
      type: ContentChildren,
      args: [VgMediaDirective, {
        descendants: true
      }]
    }]
  });
})();
var services = [VgApiService, VgControlsHiddenService, VgFullscreenApiService, VgUtilsService, VgEvents, VgStates];
var directives = [VgCuePointsDirective, VgMediaDirective];
var VgCoreModule = class _VgCoreModule {
  static {
    this.ɵfac = function VgCoreModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgCoreModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _VgCoreModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      providers: [...services],
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgCoreModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      providers: [...services],
      declarations: [...directives, VgPlayerComponent],
      exports: [...directives, VgPlayerComponent]
    }]
  }], null, null);
})();
var VgMediaElement = class {
  get audioTracks() {
    return null;
  }
  // @ts-ignore
  addTextTrack(kind, label, language) {
    return null;
  }
  // @ts-ignore
  canPlayType(type) {
    return null;
  }
  load() {}
  msClearEffects() {}
  msGetAsCastingSource() {
    return null;
  }
  // @ts-ignore
  msInsertAudioEffect(_activatableClassId, _effectRequired, _config) {}
  // @ts-ignore
  msSetMediaProtectionManager(mediaProtectionManager) {}
  pause() {}
  play() {
    return null;
  }
  // @ts-ignore
  setMediaKeys(mediaKeys) {
    return null;
  }
  // @ts-ignore
  addEventListener(_type, _listener, _useCapture) {}
};
export { VgApiService, VgControlsHiddenService, VgCoreModule, VgCuePointsDirective, VgEvents, VgFullscreenApiService, VgMediaDirective, VgMediaElement, VgPlayerComponent, VgStates, VgUtilsService };