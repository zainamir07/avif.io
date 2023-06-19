//SettingsBox.tsx

import PercentageSlider from "@components/Home/PercentageSlider";
import React, { useState } from "react";
import Tooltip from "./Tooltip";

export interface Settings {
  effort: number;
  quality: number;
  useYuv444: boolean;
  keep_transparency: boolean;
  lossless: boolean;
  adaptive: boolean;
  auto_download: boolean;
  enable_resize: boolean;
  resize_width: number;
  resize_height: number;
  resize_algorithm: number;
  maintain_aspect_ratio: boolean;
}

export interface SettingsBoxProps {
  open: boolean;
  onSettingsUpdate(settings: Settings): void;
}

const initialState: Settings = {
  effort: 40,
  quality: 65,
  useYuv444: true,
  keep_transparency: true,
  lossless: false,
  adaptive: true,
  auto_download: false,
  enable_resize: false,
  resize_width: 1280,
  resize_height: 7200,
  resize_algorithm: 0,
  maintain_aspect_ratio: true,
};

const SettingsBox: React.FC<SettingsBoxProps> = ({
  open,
  onSettingsUpdate,
}) => {
  const [settings, setSettings] = useState<Settings>(initialState);

  const updateSettings = (key: keyof Settings, value: any) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    onSettingsUpdate(updatedSettings);
  };

  const SettingCheckbox = ({
    label,
    settingKey,
    tooltip = null,
    ...props
  }: {
    label: string;
    settingKey: keyof Settings;
    tooltip?: string | null;
  }) => {
    return (
      <label>
        <input
          {...props}
          className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
          type="checkbox"
          checked={settings[settingKey] as boolean}
          onChange={(e) => updateSettings(settingKey, e.target.checked)}
        />
        {label}
        {tooltip && <Tooltip text="?">{tooltip}</Tooltip>}
      </label>
    );
  };

  return (
    <div className={"text-left" + (open ? " open" : " closed")}>
      <h3 className="my-0">Conversion settings</h3>
      <div className="mb-3 text-tiny">
        Settings don&apos;t change a running conversion.
      </div>
      <div className="my-3">
        <PercentageSlider
          value={settings.effort}
          name={"Effort"}
          onChange={(value) => updateSettings("effort", value)}
          label="effort"
          id="effort"
          explanation="Set the processing power. More effort equals longer time of conversion, but better compression."
          disabled={settings.adaptive}
        />

        <PercentageSlider
          value={settings.quality}
          name={"Quality"}
          onChange={(value) => updateSettings("quality", value)}
          label="quality"
          id="quality"
          explanation="Set the output quality. 100% almost equals lossless conversion."
        />
      </div>
      <div>
        <SettingCheckbox
          label="Lossless"
          settingKey="lossless"
          tooltip="Retain input image's quality completely."
        />
        <SettingCheckbox
          label="Smart Conversion"
          settingKey="adaptive"
          tooltip="Auto-adjust Quality and Effort for optimal results."
        />
        <SettingCheckbox
          label="Keep Transparency"
          settingKey="keep_transparency"
          tooltip="Retain input image's transparency."
        />
        <div>
          <SettingCheckbox
            label="Enable Resizing"
            settingKey="enable_resize"
            tooltip="Resize the image."
          />
          <div
            className={`resize-options ${
              settings.enable_resize ? "" : " hidden"
            }`}
          >
            <SettingCheckbox
              label="Maintain Aspect Ratio"
              settingKey="maintain_aspect_ratio"
              tooltip="Retain input image's aspect ratio."
            />

            <div className="flex gap-2">
              <label className="flex justify-between gap-1">
                Width:
                <input
                  className="block relative py-1 px-2 mb-1 w-[80px] text-white rounded-md border-2 outline-none focus:border-pink-700 bg-white/10 border-white/10"
                  type="number"
                  value={settings.resize_width}
                  onChange={(e) =>
                    updateSettings("resize_width", parseInt(e.target.value))
                  }
                  min="32"
                />
              </label>

              <label
                className={`flex justify-between gap-1 ${
                  settings.maintain_aspect_ratio ? "hidden" : ""
                }`}
              >
                Height:
                <input
                  className="block relative py-1 px-2 mb-1 w-[80px] text-white rounded-md border-2 outline-none focus:border-pink-700 bg-white/10 border-white/10"
                  type="number"
                  value={settings.resize_height}
                  onChange={(e) =>
                    updateSettings("resize_height", parseInt(e.target.value))
                  }
                  min="32"
                />
              </label>
            </div>
            <label className="flex gap-2">
              <div>Algorithm:</div>
              <select
                className="flex-1 block relative py-1 px-2 mb-1 w-full text-white rounded-md border-2 outline-none focus:outline-none focus:border-pink-700 bg-white/10 border-white/10"
                value={settings.resize_algorithm}
                onChange={(e) =>
                  updateSettings("resize_algorithm", e.target.selectedIndex)
                }
              >
                <option className=" bg-purple-900  text-white" value={0}>
                  Nearest
                </option>
                <option className=" bg-purple-900  text-white" value={1}>
                  Triangle
                </option>
                <option className=" bg-purple-900  text-white" value={2}>
                  CatmullRom
                </option>
                <option className=" bg-purple-900  text-white" value={3}>
                  Gaussian
                </option>
                <option className=" bg-purple-900  text-white" value={4}>
                  Lanczos3
                </option>
              </select>
            </label>
          </div>
        </div>
        <label>
          <input
            className="mr-1 w-3 h-3 border-purple-700 accent-purple-700"
            type={"checkbox"}
            checked={settings.auto_download}
            onChange={(e) => updateSettings("auto_download", e.target.checked)}
          />
          Automatic Download
          <Tooltip text="?">Download AVIF image after conversion.</Tooltip>
        </label>
      </div>
    </div>
  );
};

export default SettingsBox;
