'use strict';

const DPR_Web_Chrome_Sidebar = (function () {
  function giveIDtoTabs() { // startup function, give ids to

    var main = 0; //no main dpr tabs
    var dict = 0; // no dict tabs
    var search = 0; // no dict tabs
    var etc = 0;
    for (var index = 0, tb = DPR_PAL.mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tb.tabContainer.childNodes[index];
      var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
      if (DPR_PAL.dprUrlMatcher.test(ctloc)) { // a dpr tab
        tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
        if (/^DPR/.test(currentTab.id)) continue;
        if (/index\.xul/.test(ctloc)) currentTab.setAttribute('id', (main++ == 0 ? 'DPR-main' : 'DPRm'));
        else if (/dict\.htm/.test(ctloc)) currentTab.setAttribute('id', (dict++ == 0 ? 'DPR-dict' : 'DPRd'));
        else if (/search\.xul/.test(ctloc)) currentTab.setAttribute('id', (search++ == 0 ? 'DPR-search' : 'DPRs'));
        else currentTab.setAttribute('id', (etc++ == 0 ? 'DPR-x' : 'DPRx'));
      }
    }
    if (main > 0) return true;
    return false;
  }

  function openDPRTab(permalink,id,reuse) {
    permalink = DPR_PAL.toWebUrl(permalink);

    if(reuse) { // reuse old tab
      var oldTab = this.findDPRTab(id);

      if (!oldTab) {
        DPRChrome.openDPRTab(permalink,id);
        return true;
      }
    }

    // get last DPR tab

    var start = 0;  // no DPR tabs yet
    var newIdx = 0;

    for (var index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
      if (!/^DPR/.test(currentTab.getAttribute('id')) || !DPR_PAL.dprUrlMatcher.test(ctloc)) { // not a dpr tab
        if (start == 1) { // prev was a DPR tab
          newIdx = index;
          break;
        }
      }
      else {
        start = 1; // got a DPR tab
        newIdx = index+1;
      }
    }
    var newTab = DPR_PAL.mainWindow.gBrowser.addTab(permalink);
    if(id) newTab.setAttribute('id', id);
    DPR_PAL.mainWindow.gBrowser.moveTabTo(newTab, newIdx)
    DPR_PAL.mainWindow.gBrowser.selectedTab = newTab;

  }

  function openFirstDPRTab() {
    if (!this.findDPRTab()) this.openDPRTab(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul'), 'DPR-main');
  }

  function findDPRTab(id) {
    for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

      if ((currentTab.getAttribute('id') == id && DPR_PAL.dprUrlMatcher.test(ctloc) && (!DPR_PAL.DPR_tabs[id] || DPR_PAL.DPR_tabs[id].test(ctloc)))
        || (currentTab.getAttribute('id') == "DPR-main" && ((DPR_PAL.DPR_tabs["DPRs"].test(ctloc) && id == 'DPR-search') || (DPR_PAL.DPR_tabs["DPRd"].test(ctloc) && id == 'DPR-dict')))) {

        return currentTab;
      }
    }
    return false;
  }

  function isThisDPRTab(id) {
    var currentTab = DPR_PAL.mainWindow.gBrowser.selectedTab;
    var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
    if (DPR_PAL.mainWindow.gBrowser.selectedTab.id == id && DPR_PAL.dprUrlMatcher.test(ctloc) && (!DPR_PAL.DPR_tabs[id] || DPR_PAL.DPR_tabs[id].test(ctloc))) return DPR_PAL.mainWindow.gBrowser.selectedTab;
    else return false;
  }

  function DPRTab(id) {
    for (var found = false, index = 0, tabbrowser = DPR_PAL.mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = DPR_PAL.mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

      // Does this tab contain our custom attribute?
      if (DPR_PAL.dprUrlMatcher.test(ctloc)) {

        return currentTab;
      }
    }
    return false;
  }

  function promptData(title, data) {
    DPR_G.G_prompts.alert(null, title, data);
  }

  function DPRSidebarDocument() {
    var sidebar = DPR_PAL.mainWindow.document.getElementById("sidebar").contentDocument;

    if (sidebar.location.href == DPR_PAL.toWebUrl("chrome://digitalpalireader/content/digitalpalireader.xul")) {
      return sidebar;
    }
    else return false
  }

  function openSidebar() {
    toggleSidebar('viewDPR');
  }

  return {
    giveIDtoTabs,
    openDPRTab,
    openFirstDPRTab,
    findDPRTab,
    isThisDPRTab,
    DPRTab,
    promptData,
    DPRSidebarDocument,
    openSidebar,
  }
})()

window.DPRChrome = DPR_Web_Chrome_Sidebar;
