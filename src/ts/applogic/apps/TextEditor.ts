import logo from "../../../assets/apps/apppoker.svg";
import TextView from "../../../lib/Apps/TextView.svelte";
import type { App } from "../interface";

export const TextEditor: App = {
  info: {
    name: "Text Editor",
    description: "Edit plain text files",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: false,
    icon: logo,
  },
  size: { w: 700, h: 550 },
  pos: { x: 30, y: 40 },
  minSize: { w: 400, h: 300 },
  maxSize: { w: 1000, h: 800 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: TextView,
  glass: true,
  fileMimes: ["text/plain; charset=utf-8"],
};
