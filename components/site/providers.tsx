"use client"

import type { ReactNode } from "react"
import { Direction } from "radix-ui"

export function Providers({
  dir,
  children,
}: {
  dir: "ltr" | "rtl"
  children: ReactNode
}) {
  return <Direction.Provider dir={dir}>{children}</Direction.Provider>
}
