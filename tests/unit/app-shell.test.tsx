/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import AppLayout from "@/app/app/layout";

describe("App Shell Layout", () => {
  it("renders sidebar links and children", () => {
    render(
      <AppLayout>
        <div data-testid="child">Hello</div>
      </AppLayout>,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("File Manager")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });
});
