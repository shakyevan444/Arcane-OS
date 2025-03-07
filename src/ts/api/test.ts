import { get } from "svelte/store";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { CurrentState } from "../state/main";
import ttlFetch from "../ttlFetch";
import { ConnectedServer, ServerAuthCode } from "./main";
import { minArcAPI } from "../env/main";

// [https?,port][]
export const TEST_MODES: [boolean, number][] = [
  [true, 443],
  [false, 3333],
  [true, 80],
  [false, 80],
  [true, 3333],
];

export async function testConnection(
  server: string,
  authCode: string = "",
  set = true
) {
  for (let i = 0; i < TEST_MODES.length; i++) {
    const proto = `http${TEST_MODES[i][0] ? "s" : ""}`;
    const port = TEST_MODES[i][1];
    const url = `${proto}://${server}:${port}/users/get?ac=${authCode}`;

    Log(
      "api/test.ts: testConnection",
      `Testing ${server} on port ${port} and protocol ${proto}...`,
      LogLevel.info
    );

    try {
      const req = await (await ttlFetch(url, {})).json();

      Log(
        "api/test.ts: testConnection",
        `Got a response from URL ${url}`,
        LogLevel.warn
      );

      const connectReq = await (
        await ttlFetch(url.replace("users/get", "connect"), {})
      ).json();

      const rev = connectReq.revision || 0;

      if (rev < minArcAPI) return false;

      if (set) {
        ConnectedServer.set(`${proto}://${server}:${port}`);
        ServerAuthCode.set(authCode);
      }

      return req && !!req.valid;
    } catch {
      Log(
        "api/test.ts: testConnection",
        `Did not get a valid response from ${url}`,
        LogLevel.error
      );

      continue;
    }
  }

  Log(
    "api/test.ts: testConnection",
    `Can't connect to server ${server}: none of the modes match`,
    CurrentState.key != "fts" ? LogLevel.critical : LogLevel.error
  );

  return false;
}
