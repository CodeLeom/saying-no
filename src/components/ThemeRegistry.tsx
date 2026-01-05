"use client";

import * as React from "react";
import { ThemeContextProvider } from "./ThemeContext";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}

