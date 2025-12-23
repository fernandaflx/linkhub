/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


export function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Image
        src={'/logo-dark.png'}
        alt={'Logo'}
        width={120}
        height={32}
        priority
      />
    );
  }


  const isDark = resolvedTheme === "dark";
  const src = isDark ? "/logo-dark.png" : "/logo-light.png";

  return (
    <Image
      src={src}
      alt={'Logo'}
      width={120}
      height={32}
      priority
    />
  );
}
