import { useEffect, useMemo, useState } from "react";

const stopLightsColors = ["red", "yellow", "green"] as const;

type StopLightColor = (typeof stopLightsColors)[number];

type SpotLightsTimeouts = Record<StopLightColor, number>;

type Props = {
  startStopLight?: StopLightColor;
  stopLightTimeouts?: Partial<SpotLightsTimeouts>;
};

const defaultStopLightTimeouts = {
  red: 5000,
  yellow: 500,
  green: 2000,
} satisfies SpotLightsTimeouts;

export default function StopLight({
  startStopLight = "red",
  stopLightTimeouts = defaultStopLightTimeouts,
}: Props) {
  const [activeStopLight, setActiveStopLight] = useState<StopLightColor>(startStopLight);

  const updatedStopLightTimeouts = useMemo(() => {
    return {
      ...defaultStopLightTimeouts,
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {stopLightsColors.map((stopLight) => {
        const isStopLightSelected = activeStopLight === stopLight;

        return (
          <div
            key={stopLight}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
              backgroundColor: isStopLightSelected ? stopLight : "grey",
            }}
          />
        );
      })}
    </div>
  );
}
