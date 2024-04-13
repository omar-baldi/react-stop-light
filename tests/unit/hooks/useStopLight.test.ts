import { renderHook } from "@testing-library/react";
import { useStopLight } from "../../../src/hooks/useStopLight";

describe("useStopLight", () => {
  it("should custom hook be initialized with default active stop light if none specified", () => {
    const { result } = renderHook(() => useStopLight());
    const activeStopLight = result.current;
    expect(activeStopLight).toBe("red");
  });

  it("should custom hook be initialized with specified active stop light", () => {
    const { result } = renderHook(() => useStopLight({ startStopLight: "yellow" }));
    const activeStopLight = result.current;
    expect(activeStopLight).toBe("yellow");
  });
});
