import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../assets/CustomStyles";
import { themes } from "../assets/EditorThemes";

const ThemeDropdown = ({ handleThemeChange }) => {
  return (
    <Select
      placeholder={`Select Theme`}
      options={themes}
      defaultValue={themes[0]}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
