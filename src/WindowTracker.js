import React from "react";

export default function WindowTracker() {
  const [windowsWidth, setWindowsWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function watchWidth() {
      console.log("Setting Up");
      setWindowsWidth(window.innerWidth);
    }
    window.addEventListener("resize", watchWidth);

    // clean up function, and we don't get memeory leak error

    return function () {
      console.log("Cleaning Up");
      window.removeEventListener("resize", watchWidth);
    };
  }, []);

  return <h1>{windowsWidth}</h1>;
}
