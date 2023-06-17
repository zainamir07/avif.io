import Tooltip from "@components/Home/Tooltip";

export interface PercentageSliderProps {
  value: number;
  name: string;
  onChange(value: number): void;
  label: string;
  id: string;
  explanation: string;
  disabled?: boolean;
}

export default function PercentageSlider(props: PercentageSliderProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(parseInt(event.target.value));
  }
  return (
    <div className="mb-3" id={props.id}>
      <div className="flex align-center">
        <p className="font-bold">{props.name}</p>
        <Tooltip text="?">{props.explanation}</Tooltip>
      </div>
      <div className="flex content-center items-center">
        <label className="text-none">
          {props.label}
          <input
            className="w-8 bg-white"
            type={"range"}
            value={props.value}
            onChange={handleChange}
            min={0}
            max={100}
            disabled={props.disabled}
            step={5}
          />
        </label>
        <b style={{ marginLeft: 10 }}>{props.value}%</b>
      </div>
    </div>
  );
}
