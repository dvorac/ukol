import { Priority, Task } from "@ukol/graphql";

export const byPriority = () => (a: Priority, b: Priority) => {
    return comparePriority(a,b);
}

export const comparePriority = (
  a: Priority | null | undefined,
  b: Priority | null | undefined
) => {
  if (a?.priority != undefined && b?.priority != undefined) {
    return a.priority - b.priority
  } else if (a?.priority != undefined) {
    return -1;
  } else if (b?.priority != undefined) {
    return 1;
  } else {
    return 0;
  }
}