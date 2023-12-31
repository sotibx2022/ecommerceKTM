import React, { useState } from "react";
import "./Input.css";
const Input = ( props ) => {
  const { label, onChange, errorMessage,placeholder, ...otherInputData } = props;
  const [focus, setFocus] = useState(false);

  const focusHandler = () => {
    setFocus(true);
  };
  return (
    <div className="formItem">
    <label>{label}</label>
      <input
      placeholder={placeholder}
        {...otherInputData}
        onChange={onChange}
        onFocus={focusHandler}
        focus={focus.toString()}
      >
          
      </input>
     <span className="errorMessage">{errorMessage}</span>
    </div>
  );
};

export default Input;
