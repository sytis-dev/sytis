import React, { Fragment } from "react";

const TextSplit = ({
  text = "",
  separator = "\n",
  children = "",
  color = "white",
  hoveredColor = "black",
  hovered = true,
  padding = "", // additional styles to apply to the outer span element
}) => {
  const newText = children || text;
  const arr = newText.split(separator);
  const lastIndex = arr.length - 1;

  return (
    <Fragment >
      {arr.map((t, i) => (
        <Fragment key={i}>
          <span
            style={{
              paddingTop: padding,
              paddingBottom: padding,
              color: hovered ? color : hoveredColor,
            }}
          >
            {t.trim()} {i !== lastIndex && <br />}
          </span>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default TextSplit;
