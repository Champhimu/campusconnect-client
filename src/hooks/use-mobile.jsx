<<<<<<< HEAD
import * as React from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> dev

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
<<<<<<< HEAD
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
=======
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
>>>>>>> dev
    const mql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

<<<<<<< HEAD
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
=======
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return Boolean(isMobile);
}


>>>>>>> dev
