import PercentageSlider from "@components/Home/PercentageSlider";
import { getCookieJson, setCookieJson } from "@utils/cookies";
import React, { ChangeEvent, useEffect, useState } from "react";
import Tooltip from "./Tooltip";

export interface Settings {
  effort: number;
  quality: number;
  useYuv444: boolean;
  keepTransparency: boolean;
  keepExif: boolean;
  adaptive: boolean;
  autoDownload: boolean;
}

interface StoredSettings extends Settings {
  lossless: boolean;
}

export interface SettingsBoxProps {
  open: boolean;
  onSettingsUpdate(settings: Settings): void;
}

const settingsCookieKey = "settings";

export default function SettingsBox(props: SettingsBoxProps) {
  const [effort, setEffort] = useState(40);
  const [quality, setQuality] = useState(65);
  const [useYuv444, setUseYuv444] = useState(true);
  const [keepTransparency, setKeepTransparency] = useState(true);
  const [keepExif, setKeepExif] = useState(true);
  const [adaptive, setAdaptive] = useState(true);
  const [lossless, setLossless] = useState(false);
  const [autoDownload, setAutoDownload] = useState(false);

  function saveSettings() {
    setCookieJson(settingsCookieKey, {
      effort,
      quality,
      useYuv444,
      keepTransparency,
      adaptive,
      keepExif,
      lossless,
      autoDownload,
    });
  }

  function loadSettings(): StoredSettings | undefined {
    return getCookieJson(settingsCookieKey);
  }

  useEffect(() => {
    const loadedSettings = loadSettings();
    if (loadedSettings !== undefined) {
      setEffort(loadedSettings.effort);
      setQuality(loadedSettings.quality);
      setUseYuv444(loadedSettings.useYuv444);
      setKeepTransparency(loadedSettings.keepTransparency);
      setAdaptive(loadedSettings.adaptive);
      setKeepExif(loadedSettings.keepExif);
      setLossless(loadedSettings.lossless);
      setAutoDownload(loadedSettings.autoDownload);
    }
  }, []);

  useEffect(() => {
    saveSettings();
    props.onSettingsUpdate({
      effort,
      quality,
      useYuv444,
      keepTransparency,
      adaptive,
      keepExif,
      autoDownload,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effort, quality, useYuv444, keepTransparency, autoDownload, adaptive]);

  useEffect(() => {
    saveSettings();
    if (lossless) {
      props.onSettingsUpdate({
        useYuv444,
        quality: 100,
        effort,
        keepTransparency,
        adaptive,
        keepExif,
        autoDownload,
      });
    } else {
      props.onSettingsUpdate({
        useYuv444,
        quality,
        effort,
        keepTransparency,
        adaptive,
        keepExif,
        autoDownload,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lossless]);

  function onLosslessChanged(event: ChangeEvent<HTMLInputElement>) {
    setLossless(event.target.checked);
  }

  function onKeepTransparencyChanged(event: ChangeEvent<HTMLInputElement>) {
    setKeepTransparency(event.target.checked);
  }

  function onKeepExifChanged(event: ChangeEvent<HTMLInputElement>) {
    setKeepExif(event.target.checked);
  }

  function onAdaptiveChanged(event: ChangeEvent<HTMLInputElement>) {
    setAdaptive(event.target.checked);
  }

  function onAutoDownloadChanged(event: ChangeEvent<HTMLInputElement>) {
    setAutoDownload(event.target.checked);
  }

  return (
    <div className={"text-left" + (props.open ? " open" : " closed")}>
      <h3 className="my-0">Conversion settings</h3>
      <div className="mb-3 text-tiny">
        Settings don&apos;t change a running conversion.
      </div>
      <div className="my-3">
        <PercentageSlider
          value={effort}
          name={"Effort"}
          onChange={setEffort}
          label="effort"
          id="effort"
          explanation="Set the processing power. More effort equals longer time of conversion, but better compression."
          disabled={adaptive}
        />

        <PercentageSlider
          value={quality}
          name={"Quality"}
          onChange={setQuality}
          label="quality"
          id="quality"
          explanation="Set the output quality. 100% almost equals lossless conversion."
          disabled={lossless || adaptive}
        />
      </div>
      <div>
        <label>
          <input
            className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
            type={"checkbox"}
            checked={adaptive}
            onChange={onAdaptiveChanged}
          />
          Smart Conversion
          <Tooltip text="?">
            Auto-adjust Quality and Effort for optimal results.
          </Tooltip>
        </label>
        <label>
          <input
            id="lossless"
            type={"checkbox"}
            checked={lossless}
            onChange={onLosslessChanged}
            className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
          />
          Lossless
          <Tooltip text="?">Perfect quality, larger size, longer time.</Tooltip>
        </label>

        <label>
          <input
            className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
            type={"checkbox"}
            checked={keepTransparency}
            onChange={onKeepTransparencyChanged}
          />
          Keep Transparency
          <Tooltip text="?">Retain input image&apos;s transparency.</Tooltip>
        </label>

        {/*         <label>
          <input
            className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
            type={"checkbox"}
            checked={keepExif}
            onChange={onKeepExifChanged}
          />
          Keep Exif Data
        </label> */}
        <label>
          <input
            className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
            type={"checkbox"}
            checked={autoDownload}
            onChange={onAutoDownloadChanged}
          />
          Automatic Download
          <Tooltip text="?">Download AVIF image after conversion.</Tooltip>
        </label>
      </div>
    </div>
  );
}
