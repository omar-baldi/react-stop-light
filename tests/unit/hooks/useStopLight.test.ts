import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useStopLight } from "../../../src/hooks/useStopLight";

vi.useFakeTimers();
vi.spyOn(global, "setTimeout");
vi.spyOn(global, "clearTimeout");

describe("useStopLight", () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

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

  describe("Switching colors", () => {
    it("should switch from 'red' to 'green' after correct timeout value", () => {
      const { result } = renderHook(() => useStopLight());
      expect(result.current).toBe("red");
      act(() => vi.advanceTimersByTime(5000));
      expect(result.current).toBe("green");
    });

    it("should switch from 'green' to 'yellow' after correct timeout value", () => {
      const { result } = renderHook(() => useStopLight({ startStopLight: "green" }));
      expect(result.current).toBe("green");
      act(() => vi.advanceTimersByTime(2000));
      expect(result.current).toBe("yellow");
    });

    it("should switch from 'yellow' to 'red' after correct timeout", () => {
      const { result } = renderHook(() => useStopLight({ startStopLight: "yellow" }));
      expect(result.current).toBe("yellow");
      act(() => vi.advanceTimersByTime(500));
      expect(result.current).toBe("red");
    });
  });
});
