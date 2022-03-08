(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      var dom = domIds();
      var animFrames = 7,
          fps = 7,
          animTime = animFrames / fps; // Animation ---------------------------------------------------

      function display() {
        es5() ? animation() : dom.backup.classList.add('backup');

        function animation() {
          var tl = gsap.timeline({
            defaults: {
              ease: 'sine.inOut'
            },
            onComplete: rollover
          });
          tl // .to("#brand_wrap",0.5,{y:-50},'+=0.1')
          // .staggerFrom(["#txt_1","#txt_2","#txt_3"],1,{autoAlpha:0,ease: 'sine.in'},0.2)
          // .to(["#txt_1,#txt_2,#txt_3"],1,{autoAlpha:0},'+=0.5')
          // .staggerFrom(["#txt_4","#txt_5"],1,{autoAlpha:0,ease: 'sine.in'},0.2)
          // .from("#pack_1",0.5,{autoAlpha:0},'-=0.9')
          // .to("#pack_1",0.5,{scale:1.11,scaleY:0.9,yoyo:true,repeat:1},'-=0.8')
          // .add("packs")
          // .from("#pack_2",0.5,{autoAlpha:0,x:-30,scale:1.1},"packs-=0.5")
          // .from("#pack_3",0.5,{autoAlpha:0,x:30,scale:1.1},"packs-=0.5")
          // .from("#cta",0.5,{autoAlpha:0,y:10},'-=0.5')
          .staggerFrom(["#txt_1", "#txt_2", "#txt_3"], 0.5, {
            autoAlpha: 0,
            ease: 'sine.in'
          }, 0.2).add("animate").to(["#txt_1,#txt_2,#txt_3"], 0.5, {
            autoAlpha: 0
          }, '+=1.5').to('#animation', {
            duration: 1,
            x: 20,
            y: 18,
            yoyo: true,
            repeat: 1,
            repeatDelay: 1.3
          }, '-=2').staggerFrom(["#txt_4", "#txt_5"], 0.5, {
            autoAlpha: 0,
            ease: 'sine.in'
          }, 0.2, '-=1.4').from("#pack_1", 0.5, {
            autoAlpha: 0
          }, '-=0.2').to("#pack_1", 0.5, {
            scale: 1.11,
            scaleY: 0.9,
            yoyo: true,
            repeat: 1
          }, '-=0.4').add("packs").from("#pack_2", 0.5, {
            autoAlpha: 0,
            x: -30,
            scale: 1.1
          }, "packs-=0.4").from("#pack_3", 0.5, {
            autoAlpha: 0,
            x: 30,
            scale: 1.1
          }, "packs-=0.4").from("#cta", 0.5, {
            autoAlpha: 0,
            y: 10
          }, '-=0.5').from('#animation', {
            duration: animTime,
            backgroundPosition: "100%",
            ease: "steps(7)",
            yoyo: true,
            repeat: 1,
            repeatDelay: 1.3
          }, "animate");
          dom.ad_content.classList.remove('invisible');
        }
      } // Events ------------------------------------------------------


      function rollover() {
        dom.ad_content.addEventListener('mouseenter', function () {// gsap.to("#cta",0.5,{scale:1.01})
        });
        dom.ad_content.addEventListener('mouseleave', function () {// gsap.to("#cta",0.5,{scale:1})
        });
      }

      function clickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } // Init --------------------------------------------------------


      clickThru();
      display();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
