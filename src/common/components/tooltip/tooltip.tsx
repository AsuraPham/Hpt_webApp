import * as React from "react";
import { Tooltip } from "react-bootstrap";
import "./tooltip.css";

interface TooltipModal {
  title: string;
  required: any[];
}
export default function tooltips(tooltipConfig: TooltipModal) {
  return (
    <Tooltip id="reset-password">
      <div className="title-tooltip">{tooltipConfig.title}</div>
      <div className="tooltip-content">
        {tooltipConfig.required.map(function(item: any, i: number) {
          return (
            <div key={i} className={item.isValid ? "valid" : "invalid"}>
              <span className="icon">&nbsp;</span>
              {item.text}
            </div>
          );
        })}
      </div>
    </Tooltip>
  );
}
