import React from "react";

import Link from "next/link";
import { MDXRemote } from 'next-mdx-remote'
import { MarkdownResultType } from "@/types/Product.types";
import { isInternalLink } from "@/lib/helpers";

interface ComponentProps {
  children: MarkdownResultType;
}

function Markdown({ children }: ComponentProps) {
  return (
    <MDXRemote
      {...children}
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props} />;
          }

          return isInternalLink(href) ? (
            <Link href={href}>
              <a  {...props} />
            </Link>
          ) : <a {...props} href={href} rel="noopener noreferrer" />;
        },
      }}
    />
  );
}

export default Markdown;
