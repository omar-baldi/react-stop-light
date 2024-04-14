import { STOPLIGHT_COLORS } from "../constants";
import { useStopLight } from "../hooks/useStopLight";

export default function StopLight() {
  const activeStopLight = useStopLight();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {STOPLIGHT_COLORS.map((stopLight) => {
        const isStopLightSelected = activeStopLight === stopLight;

        return (
          <div
            key={stopLight}
            data-testid={`stop-light stop-light-${stopLight}`}
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
