import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock next/font/google — returns inert className/variable hooks
vi.mock("next/font/google", () => {
  const make = () => () => ({
    className: "mock-font",
    variable: "mock-font-var",
    style: { fontFamily: "mock" },
  });
  return {
    Fraunces: make(),
    Inter: make(),
    JetBrains_Mono: make(),
  };
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
