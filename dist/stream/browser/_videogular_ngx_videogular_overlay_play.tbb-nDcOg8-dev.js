// node_modules/@videogular/ngx-videogular/fesm2022/videogular-ngx-videogular-overlay-play.mjs
import * as i0 from "@angular/core";
import { Component, ViewEncapsulation, Input, HostBinding, HostListener, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as i1 from "@videogular/ngx-videogular/core";
import { VgStates, VgCoreModule } from "@videogular/ngx-videogular/core";
var VgOverlayPlayComponent = class _VgOverlayPlayComponent {
  constructor(ref, API, fsAPI, controlsHidden) {
    this.API = API;
    this.fsAPI = fsAPI;
    this.controlsHidden = controlsHidden;
    this.vgSkipIfControlsHidden = false;
    this.vgSkipIfControlsHiddenDelay = 0.5;
    this.isNativeFullscreen = false;
    this.areControlsHidden = false;
    this.areControlsHiddenChangeTime = 0;
    this.subscriptions = [];
    this.isBuffering = false;
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
    this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
    this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
    this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe(isBuffering => this.onUpdateBuffer(isBuffering)));
  }
  onUpdateBuffer(isBuffering) {
    this.isBuffering = isBuffering;
  }
  onChangeFullscreen(fsState) {
    if (this.fsAPI.nativeFullscreen) {
      this.isNativeFullscreen = fsState;
    }
  }
  onHideControls(hidden) {
    if (this.vgSkipIfControlsHidden && this.areControlsHidden != hidden) {
      this.areControlsHiddenChangeTime = Date.now();
    }
    this.areControlsHidden = hidden;
  }
  onClick() {
    if (this.vgSkipIfControlsHidden && (this.areControlsHidden || Date.now() - this.areControlsHiddenChangeTime < this.vgSkipIfControlsHiddenDelay * 1e3)) {
      return;
    }
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
    let state = VgStates.VG_PAUSED;
    if (this.target) {
      if (this.target.state instanceof Array) {
        for (let i = 0, l = this.target.state.length; i < l; i++) {
          if (this.target.state[i] === VgStates.VG_PLAYING) {
            state = VgStates.VG_PLAYING;
            break;
          }
        }
      } else {
        state = this.target.state;
      }
    }
    return state;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgOverlayPlayComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgOverlayPlayComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService), i0.ɵɵdirectiveInject(i1.VgFullscreenApiService), i0.ɵɵdirectiveInject(i1.VgControlsHiddenService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgOverlayPlayComponent,
      selectors: [["vg-overlay-play"]],
      hostVars: 2,
      hostBindings: function VgOverlayPlayComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵlistener("click", function VgOverlayPlayComponent_click_HostBindingHandler() {
            return ctx.onClick();
          });
        }
        if (rf & 2) {
          i0.ɵɵclassProp("is-buffering", ctx.isBuffering);
        }
      },
      inputs: {
        vgFor: "vgFor",
        vgSkipIfControlsHidden: "vgSkipIfControlsHidden",
        vgSkipIfControlsHiddenDelay: "vgSkipIfControlsHiddenDelay"
      },
      decls: 2,
      vars: 6,
      consts: [[1, "vg-overlay-play"], [1, "overlay-play-container"]],
      template: function VgOverlayPlayComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelementStart(0, "div", 0);
          i0.ɵɵelement(1, "div", 1);
          i0.ɵɵelementEnd();
        }
        if (rf & 2) {
          i0.ɵɵclassProp("native-fullscreen", ctx.isNativeFullscreen)("controls-hidden", ctx.areControlsHidden);
          i0.ɵɵadvance();
          i0.ɵɵclassProp("vg-icon-play_arrow", ctx.getState() !== "playing");
        }
      },
      styles: ["vg-overlay-play{z-index:200}vg-overlay-play.is-buffering{display:none}vg-overlay-play .vg-overlay-play{transition:all .5s;cursor:pointer;position:absolute;display:block;color:#fff;width:100%;height:100%;font-size:80px;filter:alpha(opacity=60);opacity:.6}vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden{cursor:none}vg-overlay-play .vg-overlay-play .overlay-play-container.vg-icon-play_arrow{pointer-events:none;width:100%;height:100%;position:absolute;display:flex;align-items:center;justify-content:center;font-size:80px}vg-overlay-play .vg-overlay-play:hover{filter:alpha(opacity=100);opacity:1}vg-overlay-play .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before{transform:scale(1.2)}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgOverlayPlayComponent, [{
    type: Component,
    args: [{
      selector: "vg-overlay-play",
      encapsulation: ViewEncapsulation.None,
      template: `<div
    class="vg-overlay-play"
    [class.native-fullscreen]="isNativeFullscreen"
    [class.controls-hidden]="areControlsHidden"
  >
    <div
      class="overlay-play-container"
      [class.vg-icon-play_arrow]="getState() !== 'playing'"
    ></div>
  </div>`,
      styles: ["vg-overlay-play{z-index:200}vg-overlay-play.is-buffering{display:none}vg-overlay-play .vg-overlay-play{transition:all .5s;cursor:pointer;position:absolute;display:block;color:#fff;width:100%;height:100%;font-size:80px;filter:alpha(opacity=60);opacity:.6}vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden{cursor:none}vg-overlay-play .vg-overlay-play .overlay-play-container.vg-icon-play_arrow{pointer-events:none;width:100%;height:100%;position:absolute;display:flex;align-items:center;justify-content:center;font-size:80px}vg-overlay-play .vg-overlay-play:hover{filter:alpha(opacity=100);opacity:1}vg-overlay-play .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before{transform:scale(1.2)}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }, {
    type: i1.VgFullscreenApiService
  }, {
    type: i1.VgControlsHiddenService
  }], {
    vgFor: [{
      type: Input
    }],
    vgSkipIfControlsHidden: [{
      type: Input
    }],
    vgSkipIfControlsHiddenDelay: [{
      type: Input
    }],
    isBuffering: [{
      type: HostBinding,
      args: ["class.is-buffering"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var VgOverlayPlayModule = class _VgOverlayPlayModule {
  static {
    this.ɵfac = function VgOverlayPlayModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgOverlayPlayModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _VgOverlayPlayModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      imports: [CommonModule, VgCoreModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgOverlayPlayModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, VgCoreModule],
      declarations: [VgOverlayPlayComponent],
      exports: [VgOverlayPlayComponent]
    }]
  }], null, null);
})();
export { VgOverlayPlayComponent, VgOverlayPlayModule };