import { writable } from "svelte/store";
import sleep from "../sleep";

export const ArcOSVersion = "5.0.11";
export const minArcAPI = 2;
export const Busy = writable<boolean>(false);

Busy.subscribe(async (v) => {
  if (!v) return;

  await sleep(10000);

  Busy.set(false);
});
