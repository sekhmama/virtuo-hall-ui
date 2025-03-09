// node_modules/@videogular/ngx-videogular/fesm2022/videogular-ngx-videogular-controls.mjs
import * as i0 from "@angular/core";
import { Component, ViewEncapsulation, HostBinding, Input, ViewChild, HostListener, Pipe, EventEmitter, Output, NgModule } from "@angular/core";
import * as i2 from "@angular/common";
import { CommonModule } from "@angular/common";
import { fromEvent } from "rxjs";
import * as i1 from "@videogular/ngx-videogular/core";
import { VgStates, VgApiService as VgApiService2, VgCoreModule } from "@videogular/ngx-videogular/core";
var _c0 = ["*"];
var _c1 = ["volumeBar"];
var _c2 = a0 => ({
  dragging: a0
});
function VgTrackSelectorComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const track_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", track_r1.id)("selected", track_r1.selected === true);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", track_r1.label, " ");
  }
}
function VgTimeDisplayComponent_span_0_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "LIVE");
    i0.ɵɵelementEnd();
  }
}
function VgTimeDisplayComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "vgUtc");
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, ctx_r0.getTime(), ctx_r0.vgFormat));
  }
}
function VgQualitySelectorComponent_option_4_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
  }
  if (rf & 2) {
    const bitrate_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", bitrate_r1.qualityIndex)("selected", bitrate_r1.qualityIndex === (ctx_r1.bitrateSelected == null ? null : ctx_r1.bitrateSelected.qualityIndex));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", bitrate_r1.label, " ");
  }
}
function VgScrubBarCuePointsComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
  }
  if (rf & 2) {
    const cp_r1 = ctx.$implicit;
    i0.ɵɵstyleProp("width", cp_r1.$$style == null ? null : cp_r1.$$style.width)("left", cp_r1.$$style == null ? null : cp_r1.$$style.left);
  }
}
function VgScrubBarCurrentTimeComponent_span_1_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
  }
}
var VgControlsComponent = class _VgControlsComponent {
  // @ts-ignore
  constructor(API, ref, hidden) {
    this.API = API;
    this.hidden = hidden;
    this.isAdsPlaying = "initial";
    this.hideControls = false;
    this.vgAutohide = false;
    this.vgAutohideTime = 3;
    this.subscriptions = [];
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    this.mouseMove$ = fromEvent(this.API.videogularElement, "mousemove");
    this.subscriptions.push(this.mouseMove$.subscribe(this.show.bind(this)));
    this.touchStart$ = fromEvent(this.API.videogularElement, "touchstart");
    this.subscriptions.push(this.touchStart$.subscribe(this.show.bind(this)));
    this.mouseClick$ = fromEvent(this.API.videogularElement, "click");
    this.subscriptions.push(this.mouseClick$.subscribe(this.show.bind(this)));
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
    this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onPlay.bind(this)));
    this.subscriptions.push(this.target.subscriptions.pause.subscribe(this.onPause.bind(this)));
    this.subscriptions.push(this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this)));
    this.subscriptions.push(this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this)));
  }
  ngAfterViewInit() {
    if (this.vgAutohide) {
      this.hide();
    } else {
      this.show();
    }
  }
  onPlay() {
    if (this.vgAutohide) {
      this.hide();
    }
  }
  onPause() {
    clearTimeout(this.timer);
    this.hideControls = false;
    this.hidden.state(false);
  }
  onStartAds() {
    this.isAdsPlaying = "none";
  }
  onEndAds() {
    this.isAdsPlaying = "initial";
  }
  hide() {
    if (this.vgAutohide) {
      clearTimeout(this.timer);
      this.hideAsync();
    }
  }
  show() {
    clearTimeout(this.timer);
    this.hideControls = false;
    this.hidden.state(false);
    if (this.vgAutohide) {
      this.hideAsync();
    }
  }
  hideAsync() {
    if (this.API.state === VgStates.VG_PLAYING) {
      this.timer = setTimeout(() => {
        this.hideControls = true;
        this.hidden.state(true);
      }, this.vgAutohideTime * 1e3);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgControlsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgControlsComponent)(i0.ɵɵdirectiveInject(i1.VgApiService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgControlsHiddenService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgControlsComponent,
      selectors: [["vg-controls"]],
      hostVars: 4,
      hostBindings: function VgControlsComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          i0.ɵɵstyleProp("pointer-events", ctx.isAdsPlaying);
          i0.ɵɵclassProp("hide", ctx.hideControls);
        }
      },
      inputs: {
        vgFor: "vgFor",
        vgAutohide: "vgAutohide",
        vgAutohideTime: "vgAutohideTime"
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function VgControlsComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵprojectionDef();
          i0.ɵɵprojection(0);
        }
      },
      styles: ["vg-controls{position:absolute;display:flex;width:100%;height:50px;z-index:300;bottom:0;background-color:#00000080;-webkit-transition:bottom 1s;-khtml-transition:bottom 1s;-moz-transition:bottom 1s;-ms-transition:bottom 1s;transition:bottom 1s}vg-controls.hide{bottom:-50px}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgControlsComponent, [{
    type: Component,
    args: [{
      selector: "vg-controls",
      encapsulation: ViewEncapsulation.None,
      template: `<ng-content></ng-content>`,
      styles: ["vg-controls{position:absolute;display:flex;width:100%;height:50px;z-index:300;bottom:0;background-color:#00000080;-webkit-transition:bottom 1s;-khtml-transition:bottom 1s;-moz-transition:bottom 1s;-ms-transition:bottom 1s;transition:bottom 1s}vg-controls.hide{bottom:-50px}\n"]
    }]
  }], () => [{
    type: i1.VgApiService
  }, {
    type: i0.ElementRef
  }, {
    type: i1.VgControlsHiddenService
  }], {
    isAdsPlaying: [{
      type: HostBinding,
      args: ["style.pointer-events"]
    }],
    hideControls: [{
      type: HostBinding,
      args: ["class.hide"]
    }],
    vgFor: [{
      type: Input
    }],
    vgAutohide: [{
      type: Input
    }],
    vgAutohideTime: [{
      type: Input
    }]
  });
})();
var VgVolumeComponent = class _VgVolumeComponent {
  constructor(ref, API) {
    this.API = API;
    this.subscriptions = [];
    this.elem = ref.nativeElement;
    this.isDragging = false;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
    this.ariaValue = this.getVolume() * 100;
  }
  onClick(event) {
    this.setVolume(this.calculateVolume(event.clientX));
  }
  onMouseDown(event) {
    this.mouseDownPosX = event.clientX;
    this.isDragging = true;
  }
  onDrag(event) {
    if (this.isDragging) {
      this.setVolume(this.calculateVolume(event.clientX));
    }
  }
  onStopDrag(event) {
    if (this.isDragging) {
      this.isDragging = false;
      if (this.mouseDownPosX === event.clientX) {
        this.setVolume(this.calculateVolume(event.clientX));
      }
    }
  }
  arrowAdjustVolume(event) {
    if (event.keyCode === 38 || event.keyCode === 39) {
      event.preventDefault();
      this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 + 10)));
    } else if (event.keyCode === 37 || event.keyCode === 40) {
      event.preventDefault();
      this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 - 10)));
    }
  }
  calculateVolume(mousePosX) {
    const recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
    const volumeBarOffsetLeft = recObj.left;
    const volumeBarWidth = recObj.width;
    return (mousePosX - volumeBarOffsetLeft) / volumeBarWidth * 100;
  }
  setVolume(vol) {
    this.target.volume = Math.max(0, Math.min(1, vol / 100));
    this.ariaValue = this.target.volume * 100;
  }
  getVolume() {
    return this.target ? this.target.volume : 0;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgVolumeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgVolumeComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgVolumeComponent,
      selectors: [["vg-volume"]],
      viewQuery: function VgVolumeComponent_Query(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵviewQuery(_c1, 7);
        }
        if (rf & 2) {
          let _t;
          i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.volumeBarRef = _t.first);
        }
      },
      hostBindings: function VgVolumeComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("mousemove", function VgVolumeComponent_mousemove_HostBindingHandler($event) {
            return ctx.onDrag($event);
          }, false, i0.ɵɵresolveDocument)("mouseup", function VgVolumeComponent_mouseup_HostBindingHandler($event) {
            return ctx.onStopDrag($event);
          }, false, i0.ɵɵresolveDocument)("keydown", function VgVolumeComponent_keydown_HostBindingHandler($event) {
            return ctx.arrowAdjustVolume($event);
          });
        }
      },
      inputs: {
        vgFor: "vgFor"
      },
      decls: 5,
      vars: 9,
      consts: [["volumeBar", ""], ["tabindex", "0", "role", "slider", "aria-label", "volume level", "aria-level", "polite", "aria-valuemin", "0", "aria-valuemax", "100", "aria-orientation", "horizontal", 1, "volumeBar", 3, "click", "mousedown"], [1, "volumeBackground", 3, "ngClass"], [1, "volumeValue"], [1, "volumeKnob"]],
      template: function VgVolumeComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = i0.ɵɵgetCurrentView();
          i0.ɵɵelementStart(0, "div", 1, 0);
          i0.ɵɵlistener("click", function VgVolumeComponent_Template_div_click_0_listener($event) {
            i0.ɵɵrestoreView(_r1);
            return i0.ɵɵresetView(ctx.onClick($event));
          })("mousedown", function VgVolumeComponent_Template_div_mousedown_0_listener($event) {
            i0.ɵɵrestoreView(_r1);
            return i0.ɵɵresetView(ctx.onMouseDown($event));
          });
          i0.ɵɵelementStart(2, "div", 2);
          i0.ɵɵelement(3, "div", 3)(4, "div", 4);
          i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
          i0.ɵɵattribute("aria-valuenow", ctx.ariaValue)("aria-valuetext", ctx.ariaValue + "%");
          i0.ɵɵadvance(2);
          i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c2, ctx.isDragging));
          i0.ɵɵadvance();
          i0.ɵɵstyleProp("width", ctx.getVolume() * (100 - 15) + "%");
          i0.ɵɵadvance();
          i0.ɵɵstyleProp("left", ctx.getVolume() * (100 - 15) + "%");
        }
      },
      dependencies: [i2.NgClass],
      styles: ["vg-volume{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:100px;cursor:pointer;color:#fff;line-height:50px}vg-volume .volumeBar{position:relative;display:flex;flex-grow:1;align-items:center}vg-volume .volumeBackground{display:flex;flex-grow:1;height:5px;pointer-events:none;background-color:#333}vg-volume .volumeValue{display:flex;height:5px;pointer-events:none;background-color:#fff;transition:all .2s ease-out}vg-volume .volumeKnob{position:absolute;width:15px;height:15px;left:0;top:50%;transform:translateY(-50%);border-radius:15px;pointer-events:none;background-color:#fff;transition:all .2s ease-out}vg-volume .volumeBackground.dragging .volumeValue,vg-volume .volumeBackground.dragging .volumeKnob{transition:none}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgVolumeComponent, [{
    type: Component,
    args: [{
      selector: "vg-volume",
      encapsulation: ViewEncapsulation.None,
      template: `
    <div
      #volumeBar
      class="volumeBar"
      tabindex="0"
      role="slider"
      aria-label="volume level"
      aria-level="polite"
      [attr.aria-valuenow]="ariaValue"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-orientation="horizontal"
      [attr.aria-valuetext]="ariaValue + '%'"
      (click)="onClick($event)"
      (mousedown)="onMouseDown($event)"
    >
      <div class="volumeBackground" [ngClass]="{ dragging: isDragging }">
        <div
          class="volumeValue"
          [style.width]="getVolume() * (100 - 15) + '%'"
        ></div>
        <div
          class="volumeKnob"
          [style.left]="getVolume() * (100 - 15) + '%'"
        ></div>
      </div>
    </div>
  `,
      styles: ["vg-volume{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:100px;cursor:pointer;color:#fff;line-height:50px}vg-volume .volumeBar{position:relative;display:flex;flex-grow:1;align-items:center}vg-volume .volumeBackground{display:flex;flex-grow:1;height:5px;pointer-events:none;background-color:#333}vg-volume .volumeValue{display:flex;height:5px;pointer-events:none;background-color:#fff;transition:all .2s ease-out}vg-volume .volumeKnob{position:absolute;width:15px;height:15px;left:0;top:50%;transform:translateY(-50%);border-radius:15px;pointer-events:none;background-color:#fff;transition:all .2s ease-out}vg-volume .volumeBackground.dragging .volumeValue,vg-volume .volumeBackground.dragging .volumeKnob{transition:none}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }],
    volumeBarRef: [{
      type: ViewChild,
      args: ["volumeBar", {
        static: true
      }]
    }],
    onDrag: [{
      type: HostListener,
      args: ["document:mousemove", ["$event"]]
    }],
    onStopDrag: [{
      type: HostListener,
      args: ["document:mouseup", ["$event"]]
    }],
    arrowAdjustVolume: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var VgTrackSelectorComponent = class _VgTrackSelectorComponent {
  constructor(ref, API) {
    this.API = API;
    this.subscriptions = [];
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
    const subs = Array.from(this.API.getMasterMedia().elem.children).filter(item => item.tagName === "TRACK").filter(item => item.kind === "subtitles").map(item => ({
      label: item.label,
      selected: item.default === true,
      id: item.srclang
    }));
    this.tracks = [...subs, {
      id: null,
      label: "Off",
      selected: subs.every(item => item.selected === false)
    }];
    const track = this.tracks.filter(item => item.selected === true)[0];
    this.trackSelected = track.id;
    this.ariaValue = track.label;
  }
  selectTrack(trackId) {
    this.trackSelected = trackId === "null" ? null : trackId;
    this.ariaValue = "No track selected";
    Array.from(this.API.getMasterMedia().elem.textTracks).forEach(item => {
      if (item.language === trackId) {
        this.ariaValue = item.label;
        item.mode = "showing";
      } else {
        item.mode = "hidden";
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgTrackSelectorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgTrackSelectorComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgTrackSelectorComponent,
      selectors: [["vg-track-selector"]],
      inputs: {
        vgFor: "vgFor"
      },
      decls: 5,
      vars: 5,
      consts: [[1, "container"], [1, "track-selected"], ["tabindex", "0", "aria-label", "track selector", 1, "trackSelector", 3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]],
      template: function VgTrackSelectorComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
          i0.ɵɵtext(2);
          i0.ɵɵelementEnd();
          i0.ɵɵelementStart(3, "select", 2);
          i0.ɵɵlistener("change", function VgTrackSelectorComponent_Template_select_change_3_listener($event) {
            return ctx.selectTrack($event.target.value);
          });
          i0.ɵɵtemplate(4, VgTrackSelectorComponent_option_4_Template, 2, 3, "option", 3);
          i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
          i0.ɵɵadvance();
          i0.ɵɵclassProp("vg-icon-closed_caption", !ctx.trackSelected);
          i0.ɵɵadvance();
          i0.ɵɵtextInterpolate1(" ", ctx.trackSelected || "", " ");
          i0.ɵɵadvance();
          i0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
          i0.ɵɵadvance();
          i0.ɵɵproperty("ngForOf", ctx.tracks);
        }
      },
      dependencies: [i2.NgForOf],
      styles: ["vg-track-selector{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;width:50px;height:50px;cursor:pointer;color:#fff;line-height:50px}vg-track-selector .container{position:relative;display:flex;flex-grow:1;align-items:center;padding:0;margin:5px}vg-track-selector select.trackSelector{width:50px;padding:5px 8px;border:none;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:transparent;font-size:16px}vg-track-selector select.trackSelector::-ms-expand{display:none}vg-track-selector select.trackSelector option{color:#000}vg-track-selector .track-selected{position:absolute;width:100%;height:50px;top:-6px;text-align:center;text-transform:uppercase;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding-top:2px;pointer-events:none}vg-track-selector .vg-icon-closed_caption:before{width:100%}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgTrackSelectorComponent, [{
    type: Component,
    args: [{
      selector: "vg-track-selector",
      encapsulation: ViewEncapsulation.None,
      template: `
    <div class="container">
      <div
        class="track-selected"
        [class.vg-icon-closed_caption]="!trackSelected"
      >
        {{ trackSelected || '' }}
      </div>
      <select
        class="trackSelector"
        (change)="selectTrack($event.target.value)"
        tabindex="0"
        aria-label="track selector"
        [attr.aria-valuetext]="ariaValue"
      >
        <option
          *ngFor="let track of tracks"
          [value]="track.id"
          [selected]="track.selected === true"
        >
          {{ track.label }}
        </option>
      </select>
    </div>
  `,
      styles: ["vg-track-selector{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;width:50px;height:50px;cursor:pointer;color:#fff;line-height:50px}vg-track-selector .container{position:relative;display:flex;flex-grow:1;align-items:center;padding:0;margin:5px}vg-track-selector select.trackSelector{width:50px;padding:5px 8px;border:none;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:transparent;font-size:16px}vg-track-selector select.trackSelector::-ms-expand{display:none}vg-track-selector select.trackSelector option{color:#000}vg-track-selector .track-selected{position:absolute;width:100%;height:50px;top:-6px;text-align:center;text-transform:uppercase;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding-top:2px;pointer-events:none}vg-track-selector .vg-icon-closed_caption:before{width:100%}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }]
  });
})();
var VgUtcPipe = class _VgUtcPipe {
  transform(value, format) {
    let date = new Date(value);
    let result = format;
    let ss = date.getUTCSeconds();
    let mm = date.getUTCMinutes();
    let hh = date.getUTCHours();
    if (ss < 10) {
      ss = "0" + ss;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    result = result.replace(/ss/g, ss);
    result = result.replace(/mm/g, mm);
    result = result.replace(/hh/g, hh);
    return result;
  }
  static {
    this.ɵfac = function VgUtcPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgUtcPipe)();
    };
  }
  static {
    this.ɵpipe = /* @__PURE__ */i0.ɵɵdefinePipe({
      name: "vgUtc",
      type: _VgUtcPipe,
      pure: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgUtcPipe, [{
    type: Pipe,
    args: [{
      name: "vgUtc"
    }]
  }], null, null);
})();
var VgTimeDisplayComponent = class _VgTimeDisplayComponent {
  constructor(ref, API) {
    this.API = API;
    this.vgProperty = "current";
    this.vgFormat = "mm:ss";
    this.subscriptions = [];
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  getTime() {
    let t = 0;
    if (this.target) {
      t = Math.round(this.target.time[this.vgProperty]);
      t = isNaN(t) || this.target.isLive ? 0 : t;
    }
    return t;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgTimeDisplayComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgTimeDisplayComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgTimeDisplayComponent,
      selectors: [["vg-time-display"]],
      inputs: {
        vgFor: "vgFor",
        vgProperty: "vgProperty",
        vgFormat: "vgFormat"
      },
      ngContentSelectors: _c0,
      decls: 3,
      vars: 2,
      consts: [[4, "ngIf"]],
      template: function VgTimeDisplayComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵprojectionDef();
          i0.ɵɵtemplate(0, VgTimeDisplayComponent_span_0_Template, 2, 0, "span", 0)(1, VgTimeDisplayComponent_span_1_Template, 3, 4, "span", 0);
          i0.ɵɵprojection(2);
        }
        if (rf & 2) {
          i0.ɵɵproperty("ngIf", ctx.target == null ? null : ctx.target.isLive);
          i0.ɵɵadvance();
          i0.ɵɵproperty("ngIf", !(ctx.target == null ? null : ctx.target.isLive));
        }
      },
      dependencies: [i2.NgIf, VgUtcPipe],
      styles: ["vg-time-display{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:60px;cursor:pointer;color:#fff;line-height:50px;pointer-events:none;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgTimeDisplayComponent, [{
    type: Component,
    args: [{
      selector: "vg-time-display",
      encapsulation: ViewEncapsulation.None,
      template: `
    <span *ngIf="target?.isLive">LIVE</span>
    <span *ngIf="!target?.isLive">{{ getTime() | vgUtc: vgFormat }}</span>
    <ng-content></ng-content>
  `,
      styles: ["vg-time-display{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:60px;cursor:pointer;color:#fff;line-height:50px;pointer-events:none;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }],
    vgProperty: [{
      type: Input
    }],
    vgFormat: [{
      type: Input
    }]
  });
})();
var VgScrubBarComponent = class _VgScrubBarComponent {
  constructor(ref, API, vgControlsHiddenState) {
    this.API = API;
    this.hideScrubBar = false;
    this.vgSlider = true;
    this.isSeeking = false;
    this.wasPlaying = false;
    this.subscriptions = [];
    this.elem = ref.nativeElement;
    this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe(hide => this.onHideScrubBar(hide)));
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  seekStart() {
    if (this.target.canPlay) {
      this.isSeeking = true;
      if (this.target.state === VgStates.VG_PLAYING) {
        this.wasPlaying = true;
      }
      this.target.pause();
    }
  }
  seekMove(offset) {
    if (this.isSeeking) {
      const percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
      this.target.time.current = percentage * this.target.time.total / 100;
      this.target.seekTime(percentage, true);
    }
  }
  seekEnd(offset) {
    this.isSeeking = false;
    if (this.target.canPlay) {
      if (offset !== false) {
        const percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
        this.target.seekTime(percentage, true);
      }
      if (this.wasPlaying) {
        this.wasPlaying = false;
        this.target.play();
      }
    }
  }
  touchEnd() {
    this.isSeeking = false;
    if (this.wasPlaying) {
      this.wasPlaying = false;
      this.target.play();
    }
  }
  getTouchOffset(event) {
    let offsetLeft = 0;
    let element = event.target;
    while (element) {
      offsetLeft += element.offsetLeft;
      element = element.offsetParent;
    }
    return event.touches[0].pageX - offsetLeft;
  }
  onMouseDownScrubBar($event) {
    if (this.target) {
      if (!this.target.isLive) {
        if (!this.vgSlider) {
          this.seekEnd($event.offsetX);
        } else {
          this.seekStart();
        }
      }
    }
  }
  onMouseMoveScrubBar($event) {
    if (this.target) {
      if (!this.target.isLive && this.vgSlider && this.isSeeking) {
        this.seekMove($event.offsetX);
      }
    }
  }
  onMouseUpScrubBar($event) {
    if (this.target) {
      if (!this.target.isLive && this.vgSlider && this.isSeeking) {
        this.seekEnd($event.offsetX);
      }
    }
  }
  onTouchStartScrubBar(_$event) {
    if (this.target) {
      if (!this.target.isLive) {
        if (!this.vgSlider) {
          this.seekEnd(false);
        } else {
          this.seekStart();
        }
      }
    }
  }
  onTouchMoveScrubBar($event) {
    if (this.target) {
      if (!this.target.isLive && this.vgSlider && this.isSeeking) {
        this.seekMove(this.getTouchOffset($event));
      }
    }
  }
  // @ts-ignore
  onTouchCancelScrubBar(_$event) {
    if (this.target) {
      if (!this.target.isLive && this.vgSlider && this.isSeeking) {
        this.touchEnd();
      }
    }
  }
  // @ts-ignore
  onTouchEndScrubBar(_$event) {
    if (this.target) {
      if (!this.target.isLive && this.vgSlider && this.isSeeking) {
        this.touchEnd();
      }
    }
  }
  arrowAdjustVolume(event) {
    if (this.target) {
      if (event.keyCode === 38 || event.keyCode === 39) {
        event.preventDefault();
        this.target.seekTime((this.target.time.current + 5e3) / 1e3, false);
      } else if (event.keyCode === 37 || event.keyCode === 40) {
        event.preventDefault();
        this.target.seekTime((this.target.time.current - 5e3) / 1e3, false);
      }
    }
  }
  getPercentage() {
    return this.target ? Math.round(this.target.time.current * 100 / this.target.time.total) + "%" : "0%";
  }
  onHideScrubBar(hide) {
    this.hideScrubBar = hide;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgScrubBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgScrubBarComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService), i0.ɵɵdirectiveInject(i1.VgControlsHiddenService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgScrubBarComponent,
      selectors: [["vg-scrub-bar"]],
      hostVars: 2,
      hostBindings: function VgScrubBarComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("mousedown", function VgScrubBarComponent_mousedown_HostBindingHandler($event) {
            return ctx.onMouseDownScrubBar($event);
          })("mousemove", function VgScrubBarComponent_mousemove_HostBindingHandler($event) {
            return ctx.onMouseMoveScrubBar($event);
          }, false, i0.ɵɵresolveDocument)("mouseup", function VgScrubBarComponent_mouseup_HostBindingHandler($event) {
            return ctx.onMouseUpScrubBar($event);
          }, false, i0.ɵɵresolveDocument)("touchstart", function VgScrubBarComponent_touchstart_HostBindingHandler($event) {
            return ctx.onTouchStartScrubBar($event);
          })("touchmove", function VgScrubBarComponent_touchmove_HostBindingHandler($event) {
            return ctx.onTouchMoveScrubBar($event);
          }, false, i0.ɵɵresolveDocument)("touchcancel", function VgScrubBarComponent_touchcancel_HostBindingHandler($event) {
            return ctx.onTouchCancelScrubBar($event);
          }, false, i0.ɵɵresolveDocument)("touchend", function VgScrubBarComponent_touchend_HostBindingHandler($event) {
            return ctx.onTouchEndScrubBar($event);
          }, false, i0.ɵɵresolveDocument)("keydown", function VgScrubBarComponent_keydown_HostBindingHandler($event) {
            return ctx.arrowAdjustVolume($event);
          });
        }
        if (rf & 2) {
          i0.ɵɵclassProp("hide", ctx.hideScrubBar);
        }
      },
      inputs: {
        vgFor: "vgFor",
        vgSlider: "vgSlider"
      },
      ngContentSelectors: _c0,
      decls: 2,
      vars: 2,
      consts: [["tabindex", "0", "role", "slider", "aria-label", "scrub bar", "aria-level", "polite", "aria-valuemin", "0", "aria-valuemax", "100", 1, "scrubBar"]],
      template: function VgScrubBarComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵprojectionDef();
          i0.ɵɵelementStart(0, "div", 0);
          i0.ɵɵprojection(1);
          i0.ɵɵelementEnd();
        }
        if (rf & 2) {
          i0.ɵɵattribute("aria-valuenow", ctx.getPercentage())("aria-valuetext", ctx.getPercentage());
        }
      },
      styles: ["vg-scrub-bar{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;width:100%;height:5px;bottom:50px;margin:0;cursor:pointer;align-items:center;background:#000000bf;z-index:250;-webkit-transition:bottom 1s,opacity .5s;-khtml-transition:bottom 1s,opacity .5s;-moz-transition:bottom 1s,opacity .5s;-ms-transition:bottom 1s,opacity .5s;transition:bottom 1s,opacity .5s}vg-scrub-bar .scrubBar{position:relative;display:flex;flex-grow:1;align-items:center;height:100%}vg-controls vg-scrub-bar{position:relative;bottom:0;background:transparent;height:50px;flex-grow:1;flex-basis:0;margin:0 10px;-webkit-transition:initial;-khtml-transition:initial;-moz-transition:initial;-ms-transition:initial;transition:initial}vg-scrub-bar.hide{bottom:0;opacity:0}vg-controls vg-scrub-bar.hide{bottom:initial;opacity:initial}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgScrubBarComponent, [{
    type: Component,
    args: [{
      selector: "vg-scrub-bar",
      encapsulation: ViewEncapsulation.None,
      template: `
    <div
      class="scrubBar"
      tabindex="0"
      role="slider"
      aria-label="scrub bar"
      aria-level="polite"
      [attr.aria-valuenow]="getPercentage()"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuetext]="getPercentage()"
    >
      <ng-content></ng-content>
    </div>
  `,
      styles: ["vg-scrub-bar{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:absolute;width:100%;height:5px;bottom:50px;margin:0;cursor:pointer;align-items:center;background:#000000bf;z-index:250;-webkit-transition:bottom 1s,opacity .5s;-khtml-transition:bottom 1s,opacity .5s;-moz-transition:bottom 1s,opacity .5s;-ms-transition:bottom 1s,opacity .5s;transition:bottom 1s,opacity .5s}vg-scrub-bar .scrubBar{position:relative;display:flex;flex-grow:1;align-items:center;height:100%}vg-controls vg-scrub-bar{position:relative;bottom:0;background:transparent;height:50px;flex-grow:1;flex-basis:0;margin:0 10px;-webkit-transition:initial;-khtml-transition:initial;-moz-transition:initial;-ms-transition:initial;transition:initial}vg-scrub-bar.hide{bottom:0;opacity:0}vg-controls vg-scrub-bar.hide{bottom:initial;opacity:initial}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }, {
    type: i1.VgControlsHiddenService
  }], {
    hideScrubBar: [{
      type: HostBinding,
      args: ["class.hide"]
    }],
    vgFor: [{
      type: Input
    }],
    vgSlider: [{
      type: Input
    }],
    onMouseDownScrubBar: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    onMouseMoveScrubBar: [{
      type: HostListener,
      args: ["document:mousemove", ["$event"]]
    }],
    onMouseUpScrubBar: [{
      type: HostListener,
      args: ["document:mouseup", ["$event"]]
    }],
    onTouchStartScrubBar: [{
      type: HostListener,
      args: ["touchstart", ["$event"]]
    }],
    onTouchMoveScrubBar: [{
      type: HostListener,
      args: ["document:touchmove", ["$event"]]
    }],
    onTouchCancelScrubBar: [{
      type: HostListener,
      args: ["document:touchcancel", ["$event"]]
    }],
    onTouchEndScrubBar: [{
      type: HostListener,
      args: ["document:touchend", ["$event"]]
    }],
    arrowAdjustVolume: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var VgQualitySelectorComponent = class _VgQualitySelectorComponent {
  constructor(ref, API) {
    this.API = API;
    this.onBitrateChange = new EventEmitter();
    this.subscriptions = [];
    this.elem = ref.nativeElement;
  }
  ngOnInit() {}
  ngOnChanges(changes) {
    if (changes.bitrates.currentValue && changes.bitrates.currentValue.length) {
      this.bitrates.forEach(item => item.label = item.label || Math.round(item.bitrate / 1e3).toString());
    }
  }
  selectBitrate(index) {
    this.bitrateSelected = this.bitrates[index];
    this.onBitrateChange.emit(this.bitrates[index]);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgQualitySelectorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgQualitySelectorComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgQualitySelectorComponent,
      selectors: [["vg-quality-selector"]],
      inputs: {
        bitrates: "bitrates"
      },
      outputs: {
        onBitrateChange: "onBitrateChange"
      },
      features: [i0.ɵɵNgOnChangesFeature],
      decls: 5,
      vars: 5,
      consts: [[1, "container"], [1, "quality-selected"], ["tabindex", "0", "aria-label", "quality selector", 1, "quality-selector", 3, "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [3, "value", "selected"]],
      template: function VgQualitySelectorComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
          i0.ɵɵtext(2);
          i0.ɵɵelementEnd();
          i0.ɵɵelementStart(3, "select", 2);
          i0.ɵɵlistener("change", function VgQualitySelectorComponent_Template_select_change_3_listener($event) {
            return ctx.selectBitrate($event.target.value);
          });
          i0.ɵɵtemplate(4, VgQualitySelectorComponent_option_4_Template, 2, 3, "option", 3);
          i0.ɵɵelementEnd()();
        }
        if (rf & 2) {
          i0.ɵɵadvance();
          i0.ɵɵclassProp("vg-icon-hd", !ctx.bitrateSelected);
          i0.ɵɵadvance();
          i0.ɵɵtextInterpolate1(" ", ctx.bitrateSelected == null ? null : ctx.bitrateSelected.label, " ");
          i0.ɵɵadvance();
          i0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
          i0.ɵɵadvance();
          i0.ɵɵproperty("ngForOf", ctx.bitrates);
        }
      },
      dependencies: [i2.NgForOf],
      styles: ["vg-quality-selector{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;width:50px;height:50px;cursor:pointer;color:#fff;line-height:50px}vg-quality-selector .container{position:relative;display:flex;flex-grow:1;align-items:center;padding:0;margin:5px}vg-quality-selector select.quality-selector{width:50px;padding:5px 8px;border:none;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:transparent;font-size:16px}vg-quality-selector select.quality-selector::-ms-expand{display:none}vg-quality-selector select.quality-selector option{color:#000}vg-quality-selector .quality-selected{position:absolute;width:100%;height:50px;top:-6px;text-align:center;text-transform:uppercase;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding-top:2px;pointer-events:none}vg-quality-selector .vg-icon-closed_caption:before{width:100%}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgQualitySelectorComponent, [{
    type: Component,
    args: [{
      selector: "vg-quality-selector",
      encapsulation: ViewEncapsulation.None,
      template: `
    <div class="container">
      <div class="quality-selected" [class.vg-icon-hd]="!bitrateSelected">
        {{ bitrateSelected?.label }}
      </div>
      <select
        class="quality-selector"
        (change)="selectBitrate($event.target.value)"
        tabindex="0"
        aria-label="quality selector"
        [attr.aria-valuetext]="ariaValue"
      >
        <option
          *ngFor="let bitrate of bitrates"
          [value]="bitrate.qualityIndex"
          [selected]="bitrate.qualityIndex === bitrateSelected?.qualityIndex"
        >
          {{ bitrate.label }}
        </option>
      </select>
    </div>
  `,
      styles: ["vg-quality-selector{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;width:50px;height:50px;cursor:pointer;color:#fff;line-height:50px}vg-quality-selector .container{position:relative;display:flex;flex-grow:1;align-items:center;padding:0;margin:5px}vg-quality-selector select.quality-selector{width:50px;padding:5px 8px;border:none;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:transparent;font-size:16px}vg-quality-selector select.quality-selector::-ms-expand{display:none}vg-quality-selector select.quality-selector option{color:#000}vg-quality-selector .quality-selected{position:absolute;width:100%;height:50px;top:-6px;text-align:center;text-transform:uppercase;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;padding-top:2px;pointer-events:none}vg-quality-selector .vg-icon-closed_caption:before{width:100%}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    bitrates: [{
      type: Input
    }],
    onBitrateChange: [{
      type: Output
    }]
  });
})();
var VgPlaybackButtonComponent = class _VgPlaybackButtonComponent {
  constructor(ref, API, cdr) {
    this.API = API;
    this.cdr = cdr;
    this.subscriptions = [];
    this.ariaValue = 1;
    this.elem = ref.nativeElement;
    this.playbackValues = ["0.5", "1.0", "1.5", "2.0"];
    this.playbackIndex = 1;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  onClick() {
    this.updatePlaybackSpeed();
  }
  onKeyDown(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      this.updatePlaybackSpeed();
    }
  }
  updatePlaybackSpeed() {
    this.playbackValues.forEach((playbackValue, index) => {
      if (playbackValue.length === 1) {
        this.playbackValues[index] = playbackValue + ".0";
      }
    });
    this.playbackIndex = ++this.playbackIndex % this.playbackValues.length;
    if (this.target instanceof VgApiService2) {
      this.target.playbackRate = this.playbackValues[this.playbackIndex];
    } else {
      this.target.playbackRate[this.vgFor] = this.playbackValues[this.playbackIndex];
    }
    this.detectChanges();
  }
  getPlaybackRate() {
    this.ariaValue = this.target ? this.target.playbackRate : 1;
    return this.ariaValue;
  }
  detectChanges() {
    try {
      this.cdr.detectChanges();
    } catch (e) {
      console.warn(e);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgPlaybackButtonComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgPlaybackButtonComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgPlaybackButtonComponent,
      selectors: [["vg-playback-button"]],
      hostBindings: function VgPlaybackButtonComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("click", function VgPlaybackButtonComponent_click_HostBindingHandler() {
            return ctx.onClick();
          })("keydown", function VgPlaybackButtonComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          });
        }
      },
      inputs: {
        vgFor: "vgFor",
        playbackValues: "playbackValues"
      },
      decls: 2,
      vars: 2,
      consts: [["tabindex", "0", "role", "button", "aria-label", "playback speed", 1, "button"]],
      template: function VgPlaybackButtonComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelementStart(0, "span", 0);
          i0.ɵɵtext(1);
          i0.ɵɵelementEnd();
        }
        if (rf & 2) {
          i0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
          i0.ɵɵadvance();
          i0.ɵɵtextInterpolate1(" ", ctx.getPlaybackRate(), "x ");
        }
      },
      styles: ["vg-playback-button{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}vg-playback-button .button{display:flex;align-items:center;justify-content:center;width:50px}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgPlaybackButtonComponent, [{
    type: Component,
    args: [{
      selector: "vg-playback-button",
      encapsulation: ViewEncapsulation.None,
      template: ` <span
    class="button"
    tabindex="0"
    role="button"
    aria-label="playback speed"
    [attr.aria-valuetext]="ariaValue"
  >
    {{ getPlaybackRate() }}x
  </span>`,
      styles: ["vg-playback-button{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif}vg-playback-button .button{display:flex;align-items:center;justify-content:center;width:50px}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }, {
    type: i0.ChangeDetectorRef
  }], {
    vgFor: [{
      type: Input
    }],
    playbackValues: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var VgPlayPauseComponent = class _VgPlayPauseComponent {
  constructor(ref, API) {
    this.API = API;
    this.subscriptions = [];
    this.ariaValue = VgStates.VG_PAUSED;
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  onClick() {
    this.playPause();
  }
  onKeyDown(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      this.playPause();
    }
  }
  playPause() {
    const state = this.getState();
    switch (state) {
      case VgStates.VG_PLAYING:
        this.target.pause();
        break;
      case VgStates.VG_PAUSED:
      case VgStates.VG_ENDED:
        this.target.play();
        break;
    }
  }
  getState() {
    this.ariaValue = this.target ? this.target.state : VgStates.VG_PAUSED;
    return this.ariaValue;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgPlayPauseComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgPlayPauseComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgPlayPauseComponent,
      selectors: [["vg-play-pause"]],
      hostBindings: function VgPlayPauseComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("click", function VgPlayPauseComponent_click_HostBindingHandler() {
            return ctx.onClick();
          })("keydown", function VgPlayPauseComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          });
        }
      },
      inputs: {
        vgFor: "vgFor"
      },
      decls: 1,
      vars: 6,
      consts: [["tabindex", "0", "role", "button", 1, "icon"]],
      template: function VgPlayPauseComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelement(0, "div", 0);
        }
        if (rf & 2) {
          i0.ɵɵclassProp("vg-icon-pause", ctx.getState() === "playing")("vg-icon-play_arrow", ctx.getState() === "paused" || ctx.getState() === "ended");
          i0.ɵɵattribute("aria-label", ctx.getState() === "paused" ? "play" : "pause")("aria-valuetext", ctx.ariaValue);
        }
      },
      styles: ["vg-play-pause{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px}vg-play-pause .icon{pointer-events:none}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgPlayPauseComponent, [{
    type: Component,
    args: [{
      selector: "vg-play-pause",
      encapsulation: ViewEncapsulation.None,
      template: ` <div
    class="icon"
    [class.vg-icon-pause]="getState() === 'playing'"
    [class.vg-icon-play_arrow]="
      getState() === 'paused' || getState() === 'ended'
    "
    tabindex="0"
    role="button"
    [attr.aria-label]="getState() === 'paused' ? 'play' : 'pause'"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
      styles: ["vg-play-pause{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px}vg-play-pause .icon{pointer-events:none}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var VgMuteComponent = class _VgMuteComponent {
  constructor(ref, API) {
    this.API = API;
    this.subscriptions = [];
    this.ariaValue = "unmuted";
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
    this.currentVolume = this.target.volume;
  }
  onClick() {
    this.changeMuteState();
  }
  onKeyDown(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      this.changeMuteState();
    }
  }
  changeMuteState() {
    const volume = this.getVolume();
    if (volume === 0) {
      if (this.target.volume === 0 && this.currentVolume === 0) {
        this.currentVolume = 1;
      }
      this.target.volume = this.currentVolume;
    } else {
      this.currentVolume = volume;
      this.target.volume = 0;
    }
  }
  getVolume() {
    const volume = this.target ? this.target.volume : 0;
    this.ariaValue = volume ? "unmuted" : "muted";
    return volume;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgMuteComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgMuteComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgMuteComponent,
      selectors: [["vg-mute"]],
      hostBindings: function VgMuteComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("click", function VgMuteComponent_click_HostBindingHandler() {
            return ctx.onClick();
          })("keydown", function VgMuteComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          });
        }
      },
      inputs: {
        vgFor: "vgFor"
      },
      decls: 1,
      vars: 9,
      consts: [["tabindex", "0", "role", "button", "aria-label", "mute", 1, "icon"]],
      template: function VgMuteComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelement(0, "div", 0);
        }
        if (rf & 2) {
          i0.ɵɵclassProp("vg-icon-volume_up", ctx.getVolume() >= 0.75)("vg-icon-volume_down", ctx.getVolume() >= 0.25 && ctx.getVolume() < 0.75)("vg-icon-volume_mute", ctx.getVolume() > 0 && ctx.getVolume() < 0.25)("vg-icon-volume_off", ctx.getVolume() === 0);
          i0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
        }
      },
      styles: ["vg-mute{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px}vg-mute .icon{pointer-events:none}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgMuteComponent, [{
    type: Component,
    args: [{
      selector: "vg-mute",
      encapsulation: ViewEncapsulation.None,
      template: ` <div
    class="icon"
    [class.vg-icon-volume_up]="getVolume() >= 0.75"
    [class.vg-icon-volume_down]="getVolume() >= 0.25 && getVolume() < 0.75"
    [class.vg-icon-volume_mute]="getVolume() > 0 && getVolume() < 0.25"
    [class.vg-icon-volume_off]="getVolume() === 0"
    tabindex="0"
    role="button"
    aria-label="mute"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
      styles: ["vg-mute{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px}vg-mute .icon{pointer-events:none}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var VgFullscreenComponent = class _VgFullscreenComponent {
  constructor(ref, API, fsAPI) {
    this.API = API;
    this.fsAPI = fsAPI;
    this.isFullscreen = false;
    this.subscriptions = [];
    this.ariaValue = "normal mode";
    this.elem = ref.nativeElement;
    this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  onChangeFullscreen(fsState) {
    this.ariaValue = fsState ? "fullscreen mode" : "normal mode";
    this.isFullscreen = fsState;
  }
  onClick() {
    this.changeFullscreenState();
  }
  onKeyDown(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      this.changeFullscreenState();
    }
  }
  changeFullscreenState() {
    let element = this.target;
    if (this.target instanceof VgApiService2) {
      element = null;
    }
    this.fsAPI.toggleFullscreen(element);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgFullscreenComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgFullscreenComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService), i0.ɵɵdirectiveInject(i1.VgFullscreenApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgFullscreenComponent,
      selectors: [["vg-fullscreen"]],
      hostBindings: function VgFullscreenComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("click", function VgFullscreenComponent_click_HostBindingHandler() {
            return ctx.onClick();
          })("keydown", function VgFullscreenComponent_keydown_HostBindingHandler($event) {
            return ctx.onKeyDown($event);
          });
        }
      },
      decls: 1,
      vars: 5,
      consts: [["tabindex", "0", "role", "button", "aria-label", "fullscreen", 1, "icon"]],
      template: function VgFullscreenComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelement(0, "div", 0);
        }
        if (rf & 2) {
          i0.ɵɵclassProp("vg-icon-fullscreen", !ctx.isFullscreen)("vg-icon-fullscreen_exit", ctx.isFullscreen);
          i0.ɵɵattribute("aria-valuetext", ctx.ariaValue);
        }
      },
      styles: ["vg-fullscreen{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px}vg-fullscreen .icon{pointer-events:none}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgFullscreenComponent, [{
    type: Component,
    args: [{
      selector: "vg-fullscreen",
      encapsulation: ViewEncapsulation.None,
      template: ` <div
    class="icon"
    [class.vg-icon-fullscreen]="!isFullscreen"
    [class.vg-icon-fullscreen_exit]="isFullscreen"
    tabindex="0"
    role="button"
    aria-label="fullscreen"
    [attr.aria-valuetext]="ariaValue"
  ></div>`,
      styles: ["vg-fullscreen{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;justify-content:center;height:50px;width:50px;cursor:pointer;color:#fff;line-height:50px}vg-fullscreen .icon{pointer-events:none}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }, {
    type: i1.VgFullscreenApiService
  }], {
    onClick: [{
      type: HostListener,
      args: ["click"]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var VgScrubBarBufferingTimeComponent = class _VgScrubBarBufferingTimeComponent {
  constructor(ref, API) {
    this.API = API;
    this.subscriptions = [];
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  getBufferTime() {
    let bufferTime = "0%";
    if (this.target?.buffered?.length) {
      if (this.target.time.total === 0) {
        bufferTime = "0%";
      } else {
        bufferTime = this.target.buffer.end / this.target.time.total * 100 + "%";
      }
    }
    return bufferTime;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgScrubBarBufferingTimeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgScrubBarBufferingTimeComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgScrubBarBufferingTimeComponent,
      selectors: [["vg-scrub-bar-buffering-time"]],
      inputs: {
        vgFor: "vgFor"
      },
      decls: 1,
      vars: 2,
      consts: [[1, "background"]],
      template: function VgScrubBarBufferingTimeComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelement(0, "div", 0);
        }
        if (rf & 2) {
          i0.ɵɵstyleProp("width", ctx.getBufferTime());
        }
      },
      styles: ["vg-scrub-bar-buffering-time{display:flex;width:100%;height:5px;pointer-events:none;position:absolute}vg-scrub-bar-buffering-time .background{background-color:#ffffff4d}vg-controls vg-scrub-bar-buffering-time{position:absolute;top:calc(50% - 3px)}vg-controls vg-scrub-bar-buffering-time .background{-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgScrubBarBufferingTimeComponent, [{
    type: Component,
    args: [{
      selector: "vg-scrub-bar-buffering-time",
      encapsulation: ViewEncapsulation.None,
      template: `<div class="background" [style.width]="getBufferTime()"></div>`,
      styles: ["vg-scrub-bar-buffering-time{display:flex;width:100%;height:5px;pointer-events:none;position:absolute}vg-scrub-bar-buffering-time .background{background-color:#ffffff4d}vg-controls vg-scrub-bar-buffering-time{position:absolute;top:calc(50% - 3px)}vg-controls vg-scrub-bar-buffering-time .background{-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }]
  });
})();
var VgScrubBarCuePointsComponent = class _VgScrubBarCuePointsComponent {
  constructor(ref, API) {
    this.API = API;
    this.onLoadedMetadataCalled = false;
    this.cuePoints = [];
    this.subscriptions = [];
    this.totalCues = 0;
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
    const onTimeUpdate = this.target.subscriptions.loadedMetadata;
    this.subscriptions.push(onTimeUpdate.subscribe(this.onLoadedMetadata.bind(this)));
    if (this.onLoadedMetadataCalled) {
      this.onLoadedMetadata();
    }
  }
  onLoadedMetadata() {
    if (this.vgCuePoints) {
      this.cuePoints = [];
      for (let i = 0, l = this.vgCuePoints.length; i < l; i++) {
        const end = this.vgCuePoints[i].endTime >= 0 ? this.vgCuePoints[i].endTime : this.vgCuePoints[i].startTime + 1;
        const cuePointDuration = (end - this.vgCuePoints[i].startTime) * 1e3;
        let position = "0";
        let percentWidth = "0";
        if (typeof cuePointDuration === "number" && this.target.time.total) {
          percentWidth = cuePointDuration * 100 / this.target.time.total + "%";
          position = this.vgCuePoints[i].startTime * 100 / Math.round(this.target.time.total / 1e3) + "%";
        }
        this.vgCuePoints[i].$$style = {
          width: percentWidth,
          left: position
        };
        this.cuePoints.push(this.vgCuePoints[i]);
      }
    }
  }
  updateCuePoints() {
    if (!this.target) {
      this.onLoadedMetadataCalled = true;
      return;
    }
    this.onLoadedMetadata();
  }
  ngOnChanges(changes) {
    if (changes.vgCuePoints.currentValue) {
      this.updateCuePoints();
    }
  }
  ngDoCheck() {
    if (this.vgCuePoints) {
      const changes = this.totalCues !== this.vgCuePoints.length;
      if (changes) {
        this.totalCues = this.vgCuePoints.length;
        this.updateCuePoints();
      }
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgScrubBarCuePointsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgScrubBarCuePointsComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgScrubBarCuePointsComponent,
      selectors: [["vg-scrub-bar-cue-points"]],
      inputs: {
        vgCuePoints: "vgCuePoints",
        vgFor: "vgFor"
      },
      features: [i0.ɵɵNgOnChangesFeature],
      decls: 2,
      vars: 1,
      consts: [[1, "cue-point-container"], ["class", "cue-point", 3, "width", "left", 4, "ngFor", "ngForOf"], [1, "cue-point"]],
      template: function VgScrubBarCuePointsComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelementStart(0, "div", 0);
          i0.ɵɵtemplate(1, VgScrubBarCuePointsComponent_span_1_Template, 1, 4, "span", 1);
          i0.ɵɵelementEnd();
        }
        if (rf & 2) {
          i0.ɵɵadvance();
          i0.ɵɵproperty("ngForOf", ctx.cuePoints);
        }
      },
      dependencies: [i2.NgForOf],
      styles: ["vg-scrub-bar-cue-points{display:flex;width:100%;height:5px;pointer-events:none;position:absolute}vg-scrub-bar-cue-points .cue-point-container .cue-point{position:absolute;height:5px;background-color:#ffcc00b3}vg-controls vg-scrub-bar-cue-points{position:absolute;top:calc(50% - 3px)}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgScrubBarCuePointsComponent, [{
    type: Component,
    args: [{
      selector: "vg-scrub-bar-cue-points",
      encapsulation: ViewEncapsulation.None,
      template: `
    <div class="cue-point-container">
      <span
        *ngFor="let cp of cuePoints"
        [style.width]="cp.$$style?.width"
        [style.left]="cp.$$style?.left"
        class="cue-point"
      ></span>
    </div>
  `,
      styles: ["vg-scrub-bar-cue-points{display:flex;width:100%;height:5px;pointer-events:none;position:absolute}vg-scrub-bar-cue-points .cue-point-container .cue-point{position:absolute;height:5px;background-color:#ffcc00b3}vg-controls vg-scrub-bar-cue-points{position:absolute;top:calc(50% - 3px)}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgCuePoints: [{
      type: Input
    }],
    vgFor: [{
      type: Input
    }]
  });
})();
var VgScrubBarCurrentTimeComponent = class _VgScrubBarCurrentTimeComponent {
  constructor(ref, API) {
    this.API = API;
    this.vgSlider = false;
    this.subscriptions = [];
    this.elem = ref.nativeElement;
  }
  ngOnInit() {
    if (this.API.isPlayerReady) {
      this.onPlayerReady();
    } else {
      this.subscriptions.push(this.API.playerReadyEvent.subscribe(() => this.onPlayerReady()));
    }
  }
  onPlayerReady() {
    this.target = this.API.getMediaById(this.vgFor);
  }
  getPercentage() {
    return this.target ? Math.round(this.target.time.current * 100 / this.target.time.total) + "%" : "0%";
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgScrubBarCurrentTimeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgScrubBarCurrentTimeComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgScrubBarCurrentTimeComponent,
      selectors: [["vg-scrub-bar-current-time"]],
      inputs: {
        vgFor: "vgFor",
        vgSlider: "vgSlider"
      },
      decls: 2,
      vars: 3,
      consts: [[1, "background"], ["class", "slider", 4, "ngIf"], [1, "slider"]],
      template: function VgScrubBarCurrentTimeComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelement(0, "div", 0);
          i0.ɵɵtemplate(1, VgScrubBarCurrentTimeComponent_span_1_Template, 1, 0, "span", 1);
        }
        if (rf & 2) {
          i0.ɵɵstyleProp("width", ctx.getPercentage());
          i0.ɵɵadvance();
          i0.ɵɵproperty("ngIf", ctx.vgSlider);
        }
      },
      dependencies: [i2.NgIf],
      styles: ["vg-scrub-bar-current-time{display:flex;width:100%;height:5px;pointer-events:none;position:absolute}vg-scrub-bar-current-time .background{background-color:#fff}vg-controls vg-scrub-bar-current-time{position:absolute;top:calc(50% - 3px);-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}vg-controls vg-scrub-bar-current-time .background{border:1px solid white;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}vg-scrub-bar-current-time .slider{background:#fff;height:15px;width:15px;border-radius:50%;box-shadow:0 0 10px #000;margin-top:-5px;margin-left:-10px}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgScrubBarCurrentTimeComponent, [{
    type: Component,
    args: [{
      selector: "vg-scrub-bar-current-time",
      encapsulation: ViewEncapsulation.None,
      template: `<div class="background" [style.width]="getPercentage()"></div>
    <span class="slider" *ngIf="vgSlider"></span>`,
      styles: ["vg-scrub-bar-current-time{display:flex;width:100%;height:5px;pointer-events:none;position:absolute}vg-scrub-bar-current-time .background{background-color:#fff}vg-controls vg-scrub-bar-current-time{position:absolute;top:calc(50% - 3px);-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}vg-controls vg-scrub-bar-current-time .background{border:1px solid white;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}vg-scrub-bar-current-time .slider{background:#fff;height:15px;width:15px;border-radius:50%;box-shadow:0 0 10px #000;margin-top:-5px;margin-left:-10px}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }],
    vgSlider: [{
      type: Input
    }]
  });
})();
var components = [VgControlsComponent, VgVolumeComponent, VgTrackSelectorComponent, VgTimeDisplayComponent, VgScrubBarComponent, VgQualitySelectorComponent, VgPlaybackButtonComponent, VgPlayPauseComponent, VgMuteComponent, VgFullscreenComponent, VgUtcPipe, VgScrubBarBufferingTimeComponent, VgScrubBarCuePointsComponent, VgScrubBarCurrentTimeComponent];
var VgControlsModule = class _VgControlsModule {
  static {
    this.ɵfac = function VgControlsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgControlsModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _VgControlsModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      imports: [CommonModule, VgCoreModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgControlsModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, VgCoreModule],
      declarations: [...components],
      exports: [...components]
    }]
  }], null, null);
})();
export { VgControlsComponent, VgControlsModule, VgFullscreenComponent, VgMuteComponent, VgPlayPauseComponent, VgPlaybackButtonComponent, VgQualitySelectorComponent, VgScrubBarBufferingTimeComponent, VgScrubBarComponent, VgScrubBarCuePointsComponent, VgScrubBarCurrentTimeComponent, VgTimeDisplayComponent, VgTrackSelectorComponent, VgUtcPipe, VgVolumeComponent };