import type { SvelteComponentDev } from "svelte/internal";

export interface WindowControls {
  caption: string;
  author: string;
  content: typeof SvelteComponentDev;
}
