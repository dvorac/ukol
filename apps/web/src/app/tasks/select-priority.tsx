import { Priority } from "@ukol/graphql";
import { ChangeEvent, useState } from "react";
import { byPriority } from "../priority/sort";

export interface PrioritySelectProps {
  priorities: Priority[];
  initialSelected?: string | undefined;
  onChange?: (priorityUuid: string) => void;
}

const createOptions = (priorities: Priority[]) => {
  const sorted = priorities
    .slice()
    .sort(byPriority());

  const opt = sorted
    .map(p => ({ key: p.uuid, value: p.uuid, text: p.description }))

  return opt;
}

export const PrioritySelect: React.FC<PrioritySelectProps> = (props) => {
  const { priorities, initialSelected, onChange } = props;
  const [ selected, setSelected ] = useState(initialSelected);

  const options = createOptions(priorities);
  const unknown = priorities.find(p => p.description === 'unknown')?.uuid;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  }

  return (
    <select
      value={selected ?? unknown}
      onChange={(e) => handleChange(e)}>
        {options.map(o => (
          <option key={o.key} value={o.value}>{o.text}</option>
        ))}
    </select>
  )
}