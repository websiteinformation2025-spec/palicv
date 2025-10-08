import * as Navigation from '../features/navigation/init.js'
import * as Search from '../features/search/init.js'
import * as Dictionary from '../features/dictionary/init.js'
import * as DprGlobals from '../dpr_globals.js'

export class DprViewModel {
  constructor() {
    this.sidebarVisible = ko.observable(DPR_prefload_mod.loadSideBarVisibleState());
    this.loadingFeatureVisible = ko.observable(true);
    this.landingFeatureVisible = ko.observable(false);
    this.activeTab = ko.observable(Navigation.featureName);
    this.mainFeaturesVisible = ko.observable(false);
    this.navigationFeatureVisible = ko.computed(function() {
        return this.mainFeaturesVisible() && this.activeTab() === Navigation.featureName
    }, this);
    this.searchFeatureVisible = ko.computed(function() {
        return this.mainFeaturesVisible() && this.activeTab() === Search.featureName
    }, this);
    this.dictionaryFeatureVisible = ko.computed(function() {
        return this.mainFeaturesVisible() && this.activeTab() === Dictionary.featureName
    }, this);
    this.installationOngoing = ko.observable(false);
    this.installationBar = ko.observable();
    this.installationBarWidth = ko.observable(0);
    this.commands = createCommands();
    this.parseURLParameters();
  }

  showLandingFeature() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(true);
    this.mainFeaturesVisible(false);
  }

  showMainFeatures() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(false);
    this.mainFeaturesVisible(true);
  }

  parseURLParameters() {
    if (DPR_PAL.isNavigationFeature()) {
      this.activeTab(Navigation.featureName);
    } else if (DPR_PAL.isSearchFeature()) {
      this.activeTab(Search.featureName);
    } else if (DPR_PAL.isDictionaryFeature()) {
      this.activeTab(Dictionary.featureName);
    } else {
      // NOTE: Default is navigation tab.
      this.activeTab(Navigation.featureName);
    }
  }

  updateCommand(id, cmd) {
    const cmdVM =
      Object
        .entries(this.commands)
        .find(([_, x]) => x().id === id);

    if (cmdVM) {
      let c = cmd;
      if (cmdVM[1]().id.startsWith(DPR_CMD_TRANSLATE_)) {
        c = {...c, ...{ title: `${cmd.title} (Shift + click to open in new window)`}};
      }
      cmdVM[1]({...cmdVM[1](), ...c});
    } else {
      console.error('Unable to find command:', id, 'to update with', cmd);
    }
  }
}

window.DPR_CMD_GOTO_PREV = 'gotoPrevCmd';
window.DPR_CMD_GOTO_INDEX = 'gotoIndexCmd';
window.DPR_CMD_GOTO_NEXT = 'gotoNextCmd';
window.DPR_CMD_GOTO_MYANMAR = 'gotoMyanmarCmd';
window.DPR_CMD_GOTO_THAI = 'gotoThaiCmd';
window.DPR_CMD_GOTO_RELM = 'gotoRelmCmd';
window.DPR_CMD_GOTO_RELA = 'gotoRelaCmd';
window.DPR_CMD_GOTO_RELT = 'gotoReltCmd';
window.DPR_CMD_COPY_PERMALINK = 'copyPermalinkCmd';
window.DPR_CMD_SEND_TO_CONVERTER = 'sendToConverter';
window.DPR_CMD_SEND_TO_TEXTPAD = 'sendToTextPad';
window.DPR_CMD_APPEND_TO_TEXTPAD = 'appendToTextpad';
window.DPR_CMD_SAVE_TO_DESKTOP = 'saveToDesktop';
window.DPR_CMD_SEARCH_IN_BOOK = 'searchInBook';
window.DPR_CMD_COPY_PLACE_TO_SIDEBAR = 'copyPlaceToSidebar';
window.DPR_CMD_BOOKMARK_SECTION = 'bookmarkSection';
window.DPR_CMD_TRANSLATE_ = 'translate';
window.DPR_CMD_TRANSLATE_0 = 'translate0';
window.DPR_CMD_TRANSLATE_1 = 'translate1';
window.DPR_CMD_TRANSLATE_2 = 'translate2';
window.DPR_CMD_TRANSLATE_3 = 'translate3';
window.DPR_CMD_TRANSLATE_4 = 'translate4';
window.DPR_CMD_TRANSLATE_5 = 'translate5';
window.DPR_CMD_TRANSLATE_6 = 'translate6';
window.DPR_CMD_TRANSLATE_7 = 'translate7';
window.DPR_CMD_TRANSLATE_8 = 'translate8';
window.DPR_CMD_TRANSLATE_9 = 'translate9';
window.DPR_CMD_TRANSLATE_10 = 'translate10';
window.DPR_CMD_ENTER_QUICK_REFERENCE = 'enterQuickReference';
window.DPR_CMD_OPEN_SETTINGS = 'openSettings';
window.DPR_CMD_GOTO_HOME = 'gotoHome';
window.DPR_CMD_GOTO_PREV_DICT_ENTRY = 'gotoPrevDictEntry';
window.DPR_CMD_GOTO_NEXT_DICT_ENTRY = 'gotoNextDictEntry';
window.DPR_CMD_TOGGLE_DPR_SIDEBAR = 'toggleDPRSidebar';
window.DPR_CMD_SHOW_BOTTOM_PANE = 'showBottomPane';
window.DPR_CMD_SHOW_PALI_QUOTE = 'showPaliQuote';
window.DPR_CMD_RESET_SETTINGS = 'resetSettings';
window.DPR_CMD_OPEN_NEW_QUIZZ = 'openNewQuizz';
window.DPR_CMD_OPEN_HELP = 'openHelp';
window.DPR_CMD_OPEN_HELP_VIDEO = 'openHelpVideo';
window.DPR_CMD_LAUNCH_FEEDBACK_FORM = 'launchFeedbackForm';
window.DPR_CMD_INSTALL_OFFLINE_APP = 'installOfflineApp';

const emptyFn = () => {};

const dprCommandList = [
  {
    id: DPR_CMD_GOTO_PREV,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to previous section (Keyboard shortcut: p)",
    matchKey: e => e.key === 'p',
    matchGesture: e => e.dpr_gesture === 'swipe_right',
  },
  {
    id: DPR_CMD_GOTO_INDEX,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Open book index (Keyboard shortcut: i)",
    matchKey: e => e.key === 'i',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_NEXT,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Go to next section (Keyboard shortcut: n)",
    matchKey: e => e.key === 'n',
    matchGesture: e => e.dpr_gesture === 'swipe_left',
  },
  {
    id: DPR_CMD_GOTO_MYANMAR,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Switch to Myanmar tipitika",
    matchKey: _ => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_THAI,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Switch to Thai tipitika",
    matchKey: _ => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_RELM,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Open relative section in Mūla side by side (Keyboard shortcut: m). Shift+click to open in same pane (Keyboard shortcut: M).",
    matchKey: e => e.key === 'm' || e.key === 'M',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_RELA,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Open relative section in Aṭṭhakathā side by side (Keyboard shortcut: a). Shift+click to open in same pane (Keyboard shortcut: A).",
    matchKey: e => e.key === 'a' || e.key === 'A',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_RELT,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Open relative section in Ṭīkā side by side (Keyboard shortcut: t). Shift+click to open in same pane (Keyboard shortcut: T).",
    matchKey: e => e.key === 't' || e.key === 'T',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_COPY_PERMALINK,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Copy permalink to clipboard (Keyboard shortcut: c)",
    matchKey: e => e.key === 'c',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_SEND_TO_CONVERTER,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:sendToConvert'),
    visible: true,
    isDynamic: false,
    title: "Send text to converter (Keyboard shortcut: s)",
    matchKey: e => e.key === 's',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_SEND_TO_TEXTPAD,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:sendToTextpad'),
    visible: true,
    isDynamic: false,
    title: "Send text to textpad (Keyboard shortcut: e)",
    matchKey: e => e.key === 'e',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_APPEND_TO_TEXTPAD,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:appendToTextpad'),
    visible: true,
    isDynamic: false,
    title: "Append selection to textpad (Keyboard shortcut: E)",
    matchKey: e => e.key === 'E',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_SAVE_TO_DESKTOP,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Save text to desktop",
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_SEARCH_IN_BOOK,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Search in book",
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_COPY_PLACE_TO_SIDEBAR,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: "Copy place to sidebar",
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_BOOKMARK_SECTION,
    notImplemented: false,
    canExecute: false,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:showBookmarksDialog'),
    visible: true,
    isDynamic: true,
    title: "Bookmark section (Keyboard shortcut: b)",
    matchKey: e => e.key === 'b',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_0,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_1,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_2,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_3,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_4,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_5,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_6,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_7,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_8,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_9,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TRANSLATE_10,
    notImplemented: false,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: true,
    title: '',
    icon: null,
    matchKey: e => false,
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_OPEN_SETTINGS,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:showSettingsDialog'),
    visible: true,
    isDynamic: false,
    title: "Open settings dialog (Keyboard shortcut: %)",
    matchKey: e => e.key === '%',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_ENTER_QUICK_REFERENCE,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:showQuickLinksDialog', { }), // F.OtherDialogs.ViewModel.showQuickLinksDialog(),
    visible: true,
    isDynamic: false,
    title: "Enter quick reference (Keyboard shortcut: q)",
    matchKey: e => e.key === 'q',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_HOME,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:gotoHome'),
    visible: true,
    isDynamic: false,
    title: "Go to home page (Keyboard shortcut: v)",
    matchKey: e => e.key === 'v',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_PREV_DICT_ENTRY,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: false,
    title: "Go to previous dictionary entry (Keyboard shortcut: ,)",
    matchKey: e => e.key === ',',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_GOTO_NEXT_DICT_ENTRY,
    notImplemented: true,
    canExecute: false,
    execute: emptyFn,
    visible: false,
    isDynamic: false,
    title: "Go to next dictionary entry (Keyboard shortcut: .)",
    matchKey: e => e.key === '.',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_TOGGLE_DPR_SIDEBAR,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:toggleDPRSidebar'),
    visible: true,
    isDynamic: false,
    title: "Toggle DPR Sidebar (Keyboard shortcut: & or `)",
    matchKey: e => e.key === '&' || e.key === '`',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_SHOW_BOTTOM_PANE,
    notImplemented: false,
    canExecute: true,
    execute: (e) => window.DPR_Mediator.emit('OtherDialogs:showBottomPane'),
    visible: true,
    isDynamic: false,
    title: "Show bottom panes (Keyboard shortcuts: 1, 2, 3, 4, 5)",
    matchKey: e => ['1', '2', '3', '4', '5'].includes(e.key),
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_SHOW_PALI_QUOTE,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:displayPaliQuote'),
    visible: true,
    isDynamic: false,
    title: "Display Pali Quote (Keyboard shortcut: *)",
    matchKey: e => e.key === '*',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_RESET_SETTINGS,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:resetSettings'),
    visible: true,
    isDynamic: false,
    title: "Reset all settings (Keyboard shortcut: R)",
    matchKey: e => e.key === 'R',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_OPEN_NEW_QUIZZ,
    notImplemented: true,
    canExecute: false,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:openNewQuizz'),
    visible: true,
    isDynamic: false,
    title: "Open new quizz (Keyboard shortcut: #)",
    matchKey: e => e.key === '#',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_OPEN_HELP,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:openHelp'),
    visible: true,
    isDynamic: false,
    title: "Open help dialog (Keyboard shortcut: ?)",
    matchKey: e => e.key === '?',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_OPEN_HELP_VIDEO,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:openHelpVideo'),
    visible: true,
    isDynamic: false,
    title: "Open help video (Keyboard shortcut: h)",
    matchKey: e => e.key === 'h',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_LAUNCH_FEEDBACK_FORM,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:launchFeedbackForm'),
    visible: true,
    isDynamic: false,
    title: "Launch feedback form (Keyboard shortcut: @)",
    matchKey: e => e.key === '@',
    matchGesture: _ => false,
  },
  {
    id: DPR_CMD_INSTALL_OFFLINE_APP,
    notImplemented: false,
    canExecute: true,
    execute: () => window.DPR_Mediator.emit('OtherDialogs:showInstallationDialog'),
    visible: true,
    isDynamic: false,
    title: "Install for offline use (Keyboard shortcut: I)",
    matchKey: e => e.key === 'I',
    matchGesture: _ => false,
  },
];

export const ViewModel = new DprViewModel();

export const DprKeyboardHandler = (e) => {
  if (document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey || e.metaKey) {
    return null;
  }

  const cmd = Object.entries(ViewModel.commands).find(([_, x]) => x().matchKey(e));
  if (cmd && !cmd[1]().notImplemented && cmd[1]().canExecute && cmd[1]().visible) {
    cmd[1]().execute(e);
    event && event.preventDefault();
    return cmd[1]();
  }
}

const __dprCommandsMap = {};
dprCommandList.forEach(x => __dprCommandsMap[x.id] = x);
Object.freeze(__dprCommandsMap);

function createCommands() {
  const cmds = {};
  dprCommandList.forEach(x => cmds[x.id] = ko.observable(x));
  Object.freeze(cmds);

  return cmds;
}

window.dprCommandList = dprCommandList
window.__dprCommandsMap = __dprCommandsMap

DprGlobals.singleton.DprViewModel = ViewModel
