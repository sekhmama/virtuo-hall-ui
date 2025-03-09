// node_modules/@videogular/ngx-videogular/fesm2022/videogular-ngx-videogular-buffering.mjs
import * as i0 from "@angular/core";
import { Component, ViewEncapsulation, Input, HostBinding, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as i1 from "@videogular/ngx-videogular/core";
import { VgCoreModule } from "@videogular/ngx-videogular/core";
var VgBufferingComponent = class _VgBufferingComponent {
  constructor(ref, API) {
    this.API = API;
    this.checkInterval = 50;
    this.currentPlayPos = 0;
    this.lastPlayPos = 0;
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
    this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe(isBuffering => this.onUpdateBuffer(isBuffering)));
  }
  onUpdateBuffer(isBuffering) {
    this.isBuffering = isBuffering;
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  static {
    this.ɵfac = function VgBufferingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgBufferingComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.VgApiService));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */i0.ɵɵdefineComponent({
      type: _VgBufferingComponent,
      selectors: [["vg-buffering"]],
      hostVars: 2,
      hostBindings: function VgBufferingComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          i0.ɵɵclassProp("is-buffering", ctx.isBuffering);
        }
      },
      inputs: {
        vgFor: "vgFor"
      },
      decls: 3,
      vars: 0,
      consts: [[1, "vg-buffering"], [1, "bufferingContainer"], [1, "loadingSpinner"]],
      template: function VgBufferingComponent_Template(rf, ctx) {
        if (rf & 1) {
          i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
          i0.ɵɵelement(2, "div", 2);
          i0.ɵɵelementEnd()();
        }
      },
      styles: ["vg-buffering{display:none;z-index:201}vg-buffering.is-buffering{display:block}.vg-buffering{position:absolute;display:block;width:100%;height:100%}.vg-buffering .bufferingContainer{width:100%;position:absolute;cursor:pointer;top:50%;margin-top:-50px;zoom:1;filter:alpha(opacity=60);opacity:.6}.vg-buffering .loadingSpinner{background-color:#0000;border:5px solid rgba(255,255,255,1);opacity:.9;border-top:5px solid rgba(0,0,0,0);border-left:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 35px #fff;width:50px;height:50px;margin:0 auto;-moz-animation:spin .5s infinite linear;-webkit-animation:spin .5s infinite linear}.vg-buffering .loadingSpinner .stop{-webkit-animation-play-state:paused;-moz-animation-play-state:paused}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}@-moz-keyframes spinoff{0%{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(-360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-webkit-keyframes spinoff{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg)}}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgBufferingComponent, [{
    type: Component,
    args: [{
      selector: "vg-buffering",
      encapsulation: ViewEncapsulation.None,
      template: `<div class="vg-buffering">
    <div class="bufferingContainer">
      <div class="loadingSpinner"></div>
    </div>
  </div>`,
      styles: ["vg-buffering{display:none;z-index:201}vg-buffering.is-buffering{display:block}.vg-buffering{position:absolute;display:block;width:100%;height:100%}.vg-buffering .bufferingContainer{width:100%;position:absolute;cursor:pointer;top:50%;margin-top:-50px;zoom:1;filter:alpha(opacity=60);opacity:.6}.vg-buffering .loadingSpinner{background-color:#0000;border:5px solid rgba(255,255,255,1);opacity:.9;border-top:5px solid rgba(0,0,0,0);border-left:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 35px #fff;width:50px;height:50px;margin:0 auto;-moz-animation:spin .5s infinite linear;-webkit-animation:spin .5s infinite linear}.vg-buffering .loadingSpinner .stop{-webkit-animation-play-state:paused;-moz-animation-play-state:paused}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(360deg)}}@-moz-keyframes spinoff{0%{-moz-transform:rotate(0deg)}to{-moz-transform:rotate(-360deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}@-webkit-keyframes spinoff{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg)}}\n"]
    }]
  }], () => [{
    type: i0.ElementRef
  }, {
    type: i1.VgApiService
  }], {
    vgFor: [{
      type: Input
    }],
    isBuffering: [{
      type: HostBinding,
      args: ["class.is-buffering"]
    }]
  });
})();
var VgBufferingModule = class _VgBufferingModule {
  static {
    this.ɵfac = function VgBufferingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _VgBufferingModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */i0.ɵɵdefineNgModule({
      type: _VgBufferingModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */i0.ɵɵdefineInjector({
      imports: [CommonModule, VgCoreModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VgBufferingModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, VgCoreModule],
      declarations: [VgBufferingComponent],
      exports: [VgBufferingComponent]
    }]
  }], null, null);
})();
export { VgBufferingComponent, VgBufferingModule };