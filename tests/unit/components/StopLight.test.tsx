import StopLight from "@/components/StopLight";
import type { StopLightColor } from "@/types";
import "@testing-library/jest-dom";
import { act, render, RenderResult } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/constants", () => {
  return {
    STOPLIGHT_COLORS: ["red", "yellow", "green"],
    DEFAULT_STARTING_STOPLIGHT_COLOR: "red",
    DEFAULT_STOPLIGHT_TIMEOUTS: {
      red: 2000,
      yellow: 500,
      green: 1000,
    },
  };
});

vi.useFakeTimers();

describe("StopLight", () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  function getStopLightElement(wrapper: RenderResult, stopLight: StopLightColor) {
    const dataTestId = `stop-light-${stopLight}`;
    return wrapper.getByTestId(dataTestId, { exact: false });
  }

  it.each([
    ["red", "red"],
    ["yellow", "grey"],
    ["green", "grey"],
  ])(
    "should %s stop-light be having correct background-color property on component mount",
    async (stopLight, expectedBackgroundColor) => {
      const wrapper = render(<StopLight />);
      const stopLightElement = getStopLightElement(wrapper, stopLight as StopLightColor);
      expect(stopLightElement).toHaveStyle({ backgroundColor: expectedBackgroundColor });
    }
  );

  it("should switch stop-light colors after defined milliseconds", async () => {
    const wrapper = render(<StopLight />);

    act(() => vi.advanceTimersByTime(2000));

    expect(getStopLightElement(wrapper, "red")).toHaveStyle({
      backgroundColor: "grey",
    });
    expect(getStopLightElement(wrapper, "yellow")).toHaveStyle({
      backgroundColor: "grey",
    });
    expect(getStopLightElement(wrapper, "green")).toHaveStyle({
      backgroundColor: "green",
    });

    act(() => vi.advanceTimersByTime(1000));

    expect(getStopLightElement(wrapper, "red")).toHaveStyle({
      backgroundColor: "grey",
    });
    expect(getStopLightElement(wrapper, "yellow")).toHaveStyle({
      backgroundColor: "yellow",
    });
    expect(getStopLightElement(wrapper, "green")).toHaveStyle({
      backgroundColor: "grey",
    });

    act(() => vi.advanceTimersByTime(500));

    expect(getStopLightElement(wrapper, "red")).toHaveStyle({
      backgroundColor: "red",
    });
    expect(getStopLightElement(wrapper, "yellow")).toHaveStyle({
      backgroundColor: "grey",
    });
    expect(getStopLightElement(wrapper, "green")).toHaveStyle({
      backgroundColor: "grey",
    });
  });
});
