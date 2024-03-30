import { useEffect, useState } from "react";
//hook used to keep track of screen resizing, and use it for conditionaly rendar based on screen size
const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  return windowWidth;
};

export default useWindowResize;
