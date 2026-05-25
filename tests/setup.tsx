import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google — return an inert loader for any requested font so tests
// don't need to track which family the app currently uses.
vi.mock("next/font/google", () => {
  const loader = () => ({
    className: "mock-font",
    variable: "mock-font-var",
    style: { fontFamily: "mock" },
  });
  return new Proxy(
    {},
    {
      get: () => loader,
    },
  );
});

// next/link → plain <a>
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
      <a
        href={typeof href === "string" ? href : String(href)}
        {...(rest as any)}
      >
        {children}
      </a>
    );
  },
}));

// next/navigation
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// next-mdx-remote/rsc — render content as a plain pre block in tests
vi.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: ({ source }: { source: string }) => (
    <div data-testid="mdx">{source}</div>
  ),
}));
