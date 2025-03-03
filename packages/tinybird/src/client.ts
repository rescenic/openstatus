import type { Tinybird } from "@chronark/zod-bird";

import {
  tbBuildMonitorList,
  tbBuildResponseList,
  tbIngestPingResponse,
  tbParameterMonitorList,
  tbParameterResponseList,
} from "./validation";

// REMINDER:
// const tb = new Tinybird({ token: process.env.TINYBIRD_TOKEN! });

export function publishPingResponse(tb: Tinybird) {
  return tb.buildIngestEndpoint({
    datasource: "ping_response__v2",
    // @ts-ignore TODO: this is caused by the metadata even though the
    // error says something regarding _input.cronTimestamp
    event: tbIngestPingResponse,
  });
}

export function getResponseList(tb: Tinybird) {
  return tb.buildPipe({
    pipe: "response_list__v2",
    parameters: tbParameterResponseList,
    data: tbBuildResponseList,
    opts: {
      revalidate: 60, // 60 seconds cache validation
    },
  });
}

export function getMonitorList(tb: Tinybird) {
  return tb.buildPipe({
    pipe: "monitor_list__v1",
    parameters: tbParameterMonitorList,
    data: tbBuildMonitorList,
    opts: {
      revalidate: 60,
    },
  });
}
