import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const arrayClasses = [classes.InputElement];

  if (props.isValid && props.shouldValidate && props.touched) {
    arrayClasses.push(classes.Invalid);
  }

  switch (props.inputtype) {
    case "imput":
      inputElement = (
        <props.inputtype
          className={arrayClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <props.inputtype
          className={arrayClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <props.inputtype
          className={arrayClasses.join(" ")}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </props.inputtype>
      );
      break;

    default:
      inputElement = (
        <props.inputtype
          className={arrayClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
  }

  return <div className={classes.Input}>{inputElement}</div>;
};

export default Input;
