import React from "react";
import "../Theme-Card/style.css";
function ThemeCard(props) {
  let { primary, secondary, ternary, clickEvent, name } = props;
  console.log(name);

  return (
    <div className="Card_container" onClick={() => clickEvent(name)}>
      <div className="primary" style={{ backgroundColor: `${secondary}` }}>
        Primary
      </div>
      <div className="paper" style={{ backgroundColor: `${ternary}` }}>
        Text
      </div>
      <div className="background" style={{ backgroundColor: `${primary}` }}>
        <p>Background</p>
      </div>
    </div>
  );
}

export default ThemeCard;
