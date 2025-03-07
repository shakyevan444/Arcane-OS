import MediaPlayer from "../../../lib/Apps/MediaPlayer.svelte";
import { createTrayIcon, disposeTrayIcon } from "../../desktop/tray/main";
import { MediaPlayerIcon } from "../../icon/apps";
import { openWindow } from "../events";
import type { App } from "../interface";

export const MediaPlayerApp: App = {
  info: {
    name: "Media Player",
    description: "Play audio files",
    builtin: true,
    version: "2.0.0",
    author: "Izaak Kuipers",
    icon: MediaPlayerIcon,
    hidden: true,
    appGroup: "entertainment",
    requiresFile: true,
  },
  size: { w: 442, h: NaN },
  pos: { x: 100, y: 100 },
  minSize: { w: 442, h: 121 },
  maxSize: { w: 442, h: NaN },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: MediaPlayer,
  glass: true,
  fileMimes: [
    "audio/x-flac",
    "audio/wave",
    "audio/mpeg",
    "audio/x-wav",
    "audio/",
  ],
  events: {
    open: (app: App) => {
      /*  if (!app.openedFile) {
        disposeTrayIcon("MediaPlayerApp");
        return closeWindow("MediaPlayerApp");
      } */

      createTrayIcon({
        onOpen() {
          openWindow("MediaPlayerApp");
        },
        image: MediaPlayerIcon,
        identifier: "MediaPlayerApp",
      });
    },

    close() {
      disposeTrayIcon("MediaPlayerApp");
    },
  },
};
