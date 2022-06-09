import React, {ReactNode} from 'react'

interface ComponentProps {
    children: ReactNode;
}

export default function Layout({children}: ComponentProps) {
  return (
    <main>{children}</main>
  )
}
