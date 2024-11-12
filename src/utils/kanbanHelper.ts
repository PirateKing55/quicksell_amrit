interface KanbanItem {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

const getPriorityLabel = (priority: number) => {
  switch (priority) {
    case 0:
      return "No priority";
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Urgent";
    default:
      return "NA";
  }
};

const sortByPriority = (items: KanbanItem[]) =>
  items.sort((a: KanbanItem, b: KanbanItem) =>
    a.priority > b.priority ? -1 : 1
  );
const sortByTitle = (items: KanbanItem[]) =>
  items.sort((a: KanbanItem, b: KanbanItem) => (a.title < b.title ? -1 : 1));

export const groupItemsByStatus = (items: KanbanItem[]) => {
  return items.reduce(
    (result: Record<string, KanbanItem[]>, item: KanbanItem) => {
      if (!result[item.status]) {
        result[item.status] = [];
      }
      result[item.status].push(item);
      return result;
    },
    { Backlog: [], Todo: [], "In Progress": [], Done: [], Canceled: [] }
  );
};

export const groupItemsByPriority = (items: KanbanItem[]) => {
  return items.reduce(
    (result: Record<string, KanbanItem[]>, item: KanbanItem) => {
      const priority = getPriorityLabel(item.priority);
      if (!result[priority]) {
        result[priority] = [];
      }
      result[priority].push(item);
      return result;
    },
    { "No priority": [], Low: [], Medium: [], High: [], Urgent: [] }
  );
};

export const groupItemsByAssignee = (items: KanbanItem[]) => {
  return items.reduce(
    (result: Record<string, KanbanItem[]>, item: KanbanItem) => {
      if (!result[item.userId]) {
        result[item.userId] = [];
      }
      result[item.userId].push(item);
      return result;
    },
    {}
  );
};

export const loadKanbanBoard = (
  items: KanbanItem[],
  groupingMode: string,
  sortingCriteria: string
) => {
  let orderedItems;
  if (sortingCriteria === "priority") orderedItems = sortByPriority(items);
  else orderedItems = sortByTitle(items);

  switch (groupingMode) {
    case "status":
      return groupItemsByStatus(orderedItems);
    case "priority":
      return groupItemsByPriority(orderedItems);
    case "assignee":
      return groupItemsByAssignee(orderedItems);
    default:
      return groupItemsByAssignee(orderedItems);
  }
};
