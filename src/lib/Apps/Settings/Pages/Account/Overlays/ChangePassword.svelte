<script lang="ts">
  import "../../../../../../css/desktop/apps/settings/account/changePswd.css";
  import { changePassword } from "../../../../../../ts/api/cred/mutate";
  import type { App } from "../../../../../../ts/applogic/interface";
  import { createOverlayableError } from "../../../../../../ts/errorlogic/overlay";
  import { PasswordIcon } from "../../../../../../ts/icon/general";
  import {
    UserData,
    UserName,
  } from "../../../../../../ts/userlogic/interfaces";
  import { getProfilePicture } from "../../../../../../ts/userlogic/pfp";
  import { hideOverlay } from "../../../../../../ts/window/overlay";
  import ProfilePicture from "../../../../../ProfilePicture.svelte";

  let img = "";

  export let id: string;
  export let app: App;

  let oldPswd = "";
  let newPswd = "";
  let confirm = "";

  UserData.subscribe((v) => {
    img = getProfilePicture(v.acc.profilePicture);
  });

  function cancel() {
    hideOverlay(id, app.id);
  }

  function closeThis() {
    reset();
    cancel();
  }

  async function apply() {
    const valid = await changePassword($UserName, oldPswd, newPswd, confirm);

    if (!valid)
      return createOverlayableError(
        {
          title: "Couldn't change password",
          message:
            "An error occured while changing your password. Please make sure the entered information is correct, and then try again.",
          buttons: [{ caption: "OK", action: reset, suggested: true }],
          image: PasswordIcon,
        },
        app.id
      );

    createOverlayableError(
      {
        title: "Password changed.",
        message: "Your password has been updated successfully.",
        buttons: [{ caption: "OK", action: closeThis, suggested: true }],
        image: PasswordIcon,
      },
      app.id
    );
  }

  function reset() {
    oldPswd = "";
    newPswd = "";
    confirm = "";
  }
</script>

<div class="changepswd-wrapper">
  <div><ProfilePicture src={img} height={50} /></div>
  <div class="field">
    <p>Fill out this form to change your password:</p>
    <input
      type="password"
      name="current"
      placeholder="Current password"
      bind:value={oldPswd}
    />
    <input
      type="password"
      name="current"
      placeholder="New password"
      bind:value={newPswd}
    />
    <input
      type="password"
      name="current"
      placeholder="Confirm new password"
      bind:value={confirm}
    />
    <div class="apply">
      <div>
        <button on:click={cancel}>Cancel</button>
        <button
          on:click={apply}
          disabled={newPswd != confirm || !newPswd || !confirm}
          type="button">Change</button
        >
      </div>
    </div>
  </div>
</div>
