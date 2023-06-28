import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import style from "../Theme-Sidebar/style.module.css";
import ThemeCard from "./Theme-Card/ThemeCard";
function ThemeSideBar(props) {
  function closeSideBar() {
    props.toggleSlide(false);
  }
  const themeArray = [
    {
      name: "green",
      secondary: "#006565",
      primary: "#F0f7f7",
      ternary: "#000000DE",
    },
    {
      name: "maroon",
      secondary: "#80485B",
      primary: "#FFF0DF",
      ternary: "#000000DE",
    },
    {
      name: "purple",
      secondary: "#5854B1",
      primary: "#f6f7fb",
      ternary: "#000000DE",
    },
    {
      name: "blue",
      secondary: "#68c8d5",
      primary: "#f7faff",
      ternary: "#000000DE",
    },
    {
      name: "pink",
      secondary: "#e66060",
      primary: "#f7e6e6",
      ternary: "#000000DE",
    },
  ];
  const [themeValue, setThemeValue] = useState("pink");
  function handleTheme(name) {
    localStorage.setItem("theme", name);
    document.documentElement.setAttribute("data-theme", name);
  }
  const themes = themeArray.map((theme) => {
    return (
      <ThemeCard
        name={theme.name}
        clickEvent={handleTheme}
        primary={theme.primary}
        secondary={theme.secondary}
        ternary={theme.ternary}
      />
    );
  });
  return (
    <div id="" className={style.themenavbarContainer}>
      <div className={style.themeNavbar}>
        <div className={style.title}>Theme Selector</div>
        <div>
          <ul className={style.navoptions}>{themes}</ul>
        </div>
        <div className={style.iconContainer}>
          <FontAwesomeIcon
            className={style.closeSliderIcon}
            icon={faAngleRight}
            onClick={closeSideBar}
          />
        </div>
      </div>
    </div>
  );
}

export default ThemeSideBar;
