import { useEffect, useState } from "react";

export function useCooldown(seconds = 60) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  return { remaining, start: () => setRemaining(seconds), active: remaining > 0 };
}
