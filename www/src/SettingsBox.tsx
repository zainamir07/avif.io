import React, { ChangeEvent, useEffect, useState } from "react";
import PercentageSlider from "./PercentageSlider";
import "./SettingsBox.css";

export interface Settings {
  effort: number;
  quality: number;
  useYuv444: boolean;
  keepTransparency: boolean;
}

export interface SettingsBoxProps {
  open: boolean;

  onSettingsUpdate(settings: Settings): void;
}

export default function SettingsBox(props: SettingsBoxProps) {
  const [effort, setEffort] = useState(10);
  const [quality, setQuality] = useState(90);
  const [useYuv444, setUseYuv444] = useState(false);
  const [keepTransparency, setKeepTransparency] = useState(true);
  const [lossless, setLossless] = useState(false);

  useEffect(
    () =>
      props.onSettingsUpdate({ effort, quality, useYuv444, keepTransparency }),
    [effort, quality, useYuv444, keepTransparency]
  );

  function onLosslessChanged(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setLossless(true);
      props.onSettingsUpdate({
        useYuv444,
        quality: 100,
        effort,
        keepTransparency,
      });
    } else {
      setLossless(false);
      props.onSettingsUpdate({ useYuv444, quality, effort, keepTransparency });
    }
  }

  function on420Changed(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.checked) return;

    setUseYuv444(false);
  }

  function on444Changed(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.checked) return;

    setUseYuv444(true);
  }

  function onKeepTransparencyChanged(event: ChangeEvent<HTMLInputElement>) {
    setKeepTransparency(event.target.checked);
  }

  return (
    <div
      className={"settings-box align-left " + (props.open ? "open" : "closed")}
    >
      <div className={"align-left"}>
        <PercentageSlider
          className={"align-left"}
          value={effort}
          name={"Effort"}
          onChange={setEffort}
        />
        <PercentageSlider
          className={"align-left " + (lossless ? "disabled" : "")}
          value={quality}
          name={"Quality"}
          onChange={setQuality}
        />
        <label className={"lossless-checkbox"}>
          <input
            type={"checkbox"}
            checked={lossless}
            onChange={onLosslessChanged}
          />
          <p className={"checkbox-text"}>Lossless</p>
        </label>
      </div>
      <div className={"subsampling"}>
        <p>Subsample Chroma</p>
        <div className={"subsampling-options"}>
          <label>
            <input
              type={"checkbox"}
              checked={!useYuv444}
              onChange={on420Changed}
            />
            <p className={"checkbox-text"}>4:2:0</p>
          </label>
          <label>
            <input
              type={"checkbox"}
              checked={useYuv444}
              onChange={on444Changed}
            />
            <p className={"checkbox-text"}>4:4:4</p>
          </label>
        </div>
        <label>
          <input
            type={"checkbox"}
            checked={keepTransparency}
            onChange={onKeepTransparencyChanged}
          />
          <p className={"checkbox-text"}>Keep transparency</p>
        </label>
      </div>
    </div>
  );
}
