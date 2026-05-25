import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PostBody } from "@/components/post-body";

describe("PostBody", () => {
  it("hands the source string to the MDX renderer", () => {
    render(<PostBody source="# Hello world" />);
    const node = screen.getByTestId("mdx");
    expect(node).toHaveTextContent("# Hello world");
  });

  it("renders nothing extra around the MDX output", () => {
    const { container } = render(<PostBody source="content" />);
    // The setup mock renders MDXRemote as a single <div data-testid="mdx">.
    expect(container.firstChild).toHaveAttribute("data-testid", "mdx");
  });
});
