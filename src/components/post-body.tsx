import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
  defaultLang: "plaintext",
};

// Owns the MDX → React wiring (Shiki theme, rehype plugins) so the route file
// stays declarative and the rendering pipeline has one home.
export function PostBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
        },
      }}
    />
  );
}
