import { useEffect, useState } from "react";

const stopLightsColors = ["red", "yellow", "green"] as const;

type StopLightColor = (typeof stopLightsColors)[number];

export default function StopLight() {
  const [activeStopLight, setActiveStopLight] = useState<StopLightColor>("red");

  useEffect(() => {
    const timeoutAmount = 1000;

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
  }, [activeStopLight]);

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
