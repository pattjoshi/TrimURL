// __tests__/Hello.test.jsx
import { render, screen } from "@testing-library/react";

import Hello from "../Hello";
import { describe, expect, it } from "vitest";

describe("Hello Component ", () => {
  it("renders Hello world heading", () => {
    render(<Hello />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
