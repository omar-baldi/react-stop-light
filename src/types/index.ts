import { STOPLIGHT_COLORS } from "../constants";

export type StopLightColor = (typeof STOPLIGHT_COLORS)[number];

export type SpotLightsTimeouts = Record<StopLightColor, number>;
