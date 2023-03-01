import React from "react";
import { array } from "yup";

type Props = {
    icon:JSX.Element,
    text:string,
    big:string,
};

export default function NavigateMenu({icon,text,big}: Props) {
  return (
    <div>
      <div className="vertical-menu">
        <a href="#" className="active">
          {text}
        </a>
      </div>
    </div>
  );
}
