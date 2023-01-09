import React from "react";

import styles from "./SVG.module.css";

const SVG = (props) => {
  return (
    <React.Fragment>
      <svg
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={props.viewBox}
      >
        <path d={props.d} />
      </svg>
    </React.Fragment>
  );
};

export default SVG;
