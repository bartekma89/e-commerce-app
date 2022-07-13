import React from "react";

import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ComponentProps {
  children: string;
}

function Markdown({children}: ComponentProps) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (!href) {
            return <a {...props} />;
          }
          console.log(href);
          return (
            <Link href={href}>
              <a {...props} />
            </Link>
          );
        },
      }}
    >{children}</ReactMarkdown>
  );
}

export default Markdown;
