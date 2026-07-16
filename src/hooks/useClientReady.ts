"use client";

import { useEffect, useState } from "react";

/** True after client hydration — use before triggering mount animations. */
export function useClientReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
}
