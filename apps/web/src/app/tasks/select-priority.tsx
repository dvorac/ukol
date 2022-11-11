import { Priority } from "@ukol/graphql";
import { ChangeEvent, useState } from "react";
import { byPriority } from "../priority/sort";

export interface PrioritySelectProps {
  priorities: Priority[];
  initialSelected?: string;
  onChange?: (priorityUuid: string) => void;
}

export const PrioritySelect: React.FC<PrioritySelectProps> = (props) => {
  const { priorities, initialSelected, onChange } = props;
  const [ selected, setSelected ] = useState(initialSelected);

  const options = (priorities: Priority[], selected: string | undefined) => {
    const options = priorities.slice().sort(byPriority());
    if (!selected) {
      options.unshift({ uuid: '', description: '--N/A--' })
    }
    return options;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  }

  return (
    <select
      value={selected}
      onChange={handleChange}>
      {options(priorities, selected).map(p => (
        <option key={p.uuid} value={p.uuid}>{p.description}</option>
      ))}
    </select>
  )
}