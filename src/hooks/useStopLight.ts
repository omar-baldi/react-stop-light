import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_STARTING_STOPLIGHT_COLOR,
  DEFAULT_STOPLIGHT_TIMEOUTS,
} from "../constants";
import type { SpotLightsTimeouts, StopLightColor } from "../types";

export const useStopLight = ({
  startStopLight = DEFAULT_STARTING_STOPLIGHT_COLOR,
  stopLightTimeouts = DEFAULT_STOPLIGHT_TIMEOUTS,
}: {
  startStopLight?: StopLightColor;
  stopLightTimeouts?: Partial<SpotLightsTimeouts>;
} = {}) => {
  const [activeStopLight, setActiveStopLight] = useState<StopLightColor>(startStopLight);

  const updatedStopLightTimeouts = useMemo(() => {
    return {
      ...DEFAULT_STOPLIGHT_TIMEOUTS,
      ...stopLightTimeouts,
    };
  }, [stopLightTimeouts]);

  useEffect(() => {
    setActiveStopLight(startStopLight);
  }, [startStopLight]);

  useEffect(() => {
    const timeoutAmount = updatedStopLightTimeouts[activeStopLight];

    const timeout = setTimeout(() => {
      setActiveStopLight((prevStopLight) => {
        if (prevStopLight === "red") return "green";
        if (prevStopLight === "yellow") return "red";
        if (prevStopLight === "green") return "yellow";
        return prevStopLight;
      });
    }, timeoutAmount);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeStopLight, updatedStopLightTimeouts]);

  return activeStopLight;
};
