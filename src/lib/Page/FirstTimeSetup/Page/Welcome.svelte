<script lang="ts">
  import "../../../../css/fts/page/welcome.css";
  import { Logo } from "../../../../ts/branding";
  import { applyFTSState } from "../../../../ts/fts/main";
</script>

<div class="center-flex">
  <div>
    <img src={Logo()} alt="ArcaneOS" class="logo" />
    <h1 class="center-header">Welcome</h1>
    <p class="center">Time to set-up ArcaneOS.</p>
    <button on:click={() => applyFTSState("updates")}>Let's begin</button>
  </div>
</div>
