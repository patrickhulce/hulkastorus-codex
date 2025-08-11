/** @jest-environment jsdom */
import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import Home from "@/app/page";

describe("Homepage", () => {
  it("renders the hero headline and CTAs", () => {
    render(<Home />);
    expect(screen.getByTestId("headline")).toHaveTextContent(
      /Dev-Friendly Cloud Storage/i,
    );
    expect(screen.getByText(/Request Invite/i)).toBeInTheDocument();
    expect(screen.getByText(/Read the Docs/i)).toBeInTheDocument();
  });
});
