import React from "react";
import renderer, { act } from "react-test-renderer";

import { HomeScreen } from "../src/screens/HomeScreen.jsx";
import { api } from "../src/services/api.js";

jest.mock("../src/services/api.js", () => ({
  api: {
    getHealth: jest.fn(),
  },
}));

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    api.getHealth.mockResolvedValueOnce({ data: { status: "ok" } });

    const component = renderer.create(<HomeScreen />);

    expect(component.root.findByProps({ children: "Loading health status" })).toBeDefined();
  });

  it("renders health success state when api.getHealth succeeds", async () => {
    api.getHealth.mockResolvedValueOnce({ data: { status: "ok", service: "api", timestamp: "now" } });

    let component;
    await act(async () => {
      component = renderer.create(<HomeScreen />);
    });

    expect(component.root.findByProps({ children: "ok" })).toBeDefined();
  });

  it("renders error state when api.getHealth fails", async () => {
    api.getHealth.mockRejectedValueOnce(new Error("boom"));

    let component;
    await act(async () => {
      component = renderer.create(<HomeScreen />);
    });

    expect(component.root.findByProps({ children: "Unable to reach the API right now." })).toBeDefined();
  });

  it("retry button calls api.getHealth again", async () => {
    api.getHealth.mockResolvedValueOnce({ data: { status: "ok" } });

    let component;
    await act(async () => {
      component = renderer.create(<HomeScreen />);
    });

    const button = component.root.findByProps({ title: "Retry" });

    await act(async () => {
      button.props.onPress();
    });

    expect(api.getHealth).toHaveBeenCalledTimes(2);
  });
});
