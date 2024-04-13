import type { SpotLightsTimeouts, StopLightColor } from "./types";

export const STOPLIGHT_COLORS = ["red", "yellow", "green"] as const;

export const DEFAULT_STARTING_STOPLIGHT_COLOR = "red" satisfies StopLightColor;

export const DEFAULT_STOPLIGHT_TIMEOUTS = {
  red: 5000,
  yellow: 500,
  green: 2000,
} satisfies SpotLightsTimeouts;
