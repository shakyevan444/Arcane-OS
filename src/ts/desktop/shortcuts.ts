import { get } from "svelte/store";
import { closeWindow, openWindow } from "../applogic/events";
import { registerShortcuts } from "../applogic/keyboard/main";
import {
  focusedWindowId,
  getOpenedStore,
  getWindow,
  isFullscreenWindow,
} from "../applogic/store";
import { startOpened } from "./main";
import { ActionCenterOpened } from "./actioncenter/main";
import { CurrentNotification } from "../notiflogic/main";
import { arcFindValue, showArcFind } from "../search/main";
import { CurrentState } from "../state/main";
import { closeError } from "../errorlogic/main";

export function registerDesktopShortcuts() {
  registerShortcuts([
    {
      key: "q",
      alt: true,
      action() {
        const id = get(focusedWindowId);
        if (id && id.startsWith("error_"))
          return closeError(parseInt(id.replace("error_", "")));
        if (!getOpenedStore().length) {
          openWindow("Exit");
        } else {
          const window = getWindow(get(focusedWindowId));

          if (window.state.windowState.fll) isFullscreenWindow.set(false);

          closeWindow(get(focusedWindowId));
        }

        startOpened.set(false);
        ActionCenterOpened.set(false);
        CurrentNotification.set(null);

        focusedWindowId.set(null);
      },
      global: true,
    },
    {
      key: "s",
      shift: true,
      alt: true,
      global: true,
      action: () => {
        showArcFind.set(!get(showArcFind));
      },
    },
    {
      key: "n",
      alt: true,
      global: true,
      action: () => {
        ActionCenterOpened.set(!get(ActionCenterOpened));
      },
    },
    {
      key: "z",
      alt: true,
      shift: true,
      global: true,
      action: () => {
        openWindow("AppMan");
      },
    },
  ]);

  // TODO: fix this or remove it completely.
  /* document.addEventListener("keydown", (e) => {
    const valid = "abcdefghijklmnopqrstuvwxyz0123456789 ";

    if (!e.key) return;

    const key = e.key.toLowerCase();

    if (!valid.includes(key) || key.length > 1) return;

    if (get(CurrentState).name != "Desktop" || !get(startOpened)) return;

    startOpened.set(false);
    showArcFind.set(true);
    arcFindValue.set(e.key);
  }); */
}
