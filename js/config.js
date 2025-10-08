'use strict';

const DPR_Config = (function () {
  DPR_G.atiIns = 0

  const dprBaseStyleSheet = Object.entries(document.styleSheets).find(([_, ss]) => ss.href && ss.href.match(DPR_PAL.mainStylesMatcher))[1]

  async function getconfig() {
    for (var i in DPR_G.DPR_prefs) {
      DPR_G.DPR_prefs[i] = DPR_prefload_mod.getPref(i);
    }

    if (/top\.htm/.exec(document.location.href) && DPR_G.DPR_prefs["ctrans"] && typeof(DPR_G.atiD) == 'undefined') {
      await addATIJS();
    }

    // update backgrounds

    checkbackground();

    // update fonts, colors

    dprBaseStyleSheet['cssRules'][0].style.color = DPR_G.DPR_prefs['coltext'];
    dprBaseStyleSheet['cssRules'][0].style.fontFamily = DPR_G.DPR_prefs['colfont'];
    dprBaseStyleSheet['cssRules'][1].style.fontSize = DPR_G.DPR_prefs['colsize'] + 'px';

    dprBaseStyleSheet['cssRules'][2].style.fontSize = Math.round(parseInt(DPR_G.DPR_prefs['colsize'])*.9) + 'px';  // select, etc.
    dprBaseStyleSheet['cssRules'][2].style.backgroundColor = DPR_G.DPR_prefs['colInput'];  // select, etc.

    dprBaseStyleSheet['cssRules'][3].style.fontSize = Math.round(parseInt(DPR_G.DPR_prefs['colsize'])*.8) + 'px';  // small
    dprBaseStyleSheet['cssRules'][4].style.fontSize = Math.round(parseInt(DPR_G.DPR_prefs['colsize'])*.7) + 'px';  // tiny
    dprBaseStyleSheet['cssRules'][5].style.fontSize = Math.round(parseInt(DPR_G.DPR_prefs['colsize'])*1.25) + 'px';  // large
    dprBaseStyleSheet['cssRules'][6].style.fontSize = Math.round(parseInt(DPR_G.DPR_prefs['colsize'])*1.5) + 'px';  // huge

    dprBaseStyleSheet['cssRules'][9].style.backgroundColor = DPR_G.DPR_prefs['colButton'];  // buttons
    dprBaseStyleSheet['cssRules'][10].style.backgroundImage = '-moz-radial-gradient('+DPR_G.DPR_prefs['colButtonSel']+','+DPR_G.DPR_prefs['colbkcp']+')';  // buttons
    dprBaseStyleSheet['cssRules'][11].style.backgroundImage = '-moz-radial-gradient('+DPR_G.DPR_prefs['colButtonSel']+','+DPR_G.DPR_prefs['colbkcp']+')';  // buttons
  }

  function changecss(myclass,element,value) {
    var CSSRules
    if (document.all) {
      CSSRules = 'rules'
    }
    else if (document.getElementById) {
      CSSRules = 'cssRules'
    }
    for (var i = 0; i < dprBaseStyleSheet[CSSRules].length; i++) {
      if (dprBaseStyleSheet[CSSRules][i].selectorText == myclass) {
        dprBaseStyleSheet[CSSRules][i].style[element] = value
      }
    }
  }

  function checkbackground() {
    var wbk = DPR_G.DPR_prefs['bktype'];

    if(/col/.exec(wbk)) {
      dprBaseStyleSheet['cssRules'][7].style.backgroundColor = DPR_G.DPR_prefs['colbk'];  // paperback
      document.body.style.backgroundColor = DPR_G.DPR_prefs['colbk'];
    }
    else {
      dprBaseStyleSheet['cssRules'][7].style.backgroundColor = '';  // paperback
      document.body.style.backgroundColor = '';
    }
    if(/img/.exec(wbk)) {
      dprBaseStyleSheet['cssRules'][7].style.backgroundImage = DPR_G.DPR_prefs['imgbk'];  // paperback
      document.body.style.backgroundImage = DPR_G.DPR_prefs['imgbk'];
    }
    else {
      dprBaseStyleSheet['cssRules'][7].style.backgroundImage = '';  // paperback
      document.body.style.backgroundImage = '';
    }

    var sbk = DPR_G.DPR_prefs['bkcptype'];

    if(/col/.exec(sbk)) {
      dprBaseStyleSheet['cssRules'][8].style.backgroundColor = DPR_G.DPR_prefs['colbkcp'];  // chromeback
    }
    else {
      dprBaseStyleSheet['cssRules'][8].style.backgroundColor = '';  // chromeback
    }
    if(/img/.exec(sbk)) {
      dprBaseStyleSheet['cssRules'][8].style.backgroundImage = DPR_G.DPR_prefs['imgbkcp'];  // chromeback
    }
    else {
      dprBaseStyleSheet['cssRules'][8].style.backgroundImage = '';  // chromeback
    }
  }

  async function addATIJS() {
    if (DPR_G.DPR_prefs['catioff']) {
      await DPR_PAL.addJS(['ati_list']);
    }
  }

  return {
    getconfig,
  }
})()

window.DPR_config_mod = DPR_Config
