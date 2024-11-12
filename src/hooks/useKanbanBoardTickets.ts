import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { loadKanbanBoard } from "../utils/kanbanHelper";

interface KanbanItem {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

interface TeamMember {
  id: string;
  name: string;
  available: boolean;
}

interface ApiPayload {
  tickets: KanbanItem[];
  users: TeamMember[];
}

interface KanbanHookResult {
  items: KanbanItem[];
  teamMembers: Record<string, TeamMember>;
  boardData: Record<string, KanbanItem[]>;
  isLoading: boolean;
  errorMessage: string | null;
  displayMode: string;
  sortCriteria: string;
  updateDisplayMode: (value: string) => void;
  updateSortCriteria: (value: string) => void;
}

interface User {
  id: string;
  name: string;
  available: boolean;
}

const mapUsersByUserId = (users: User[]) => {
  let group: Record<string, User> = users.reduce(
    (accumulator: Record<string, User>, user: User) => {
      accumulator[user.id] = user;
      return accumulator;
    },
    {}
  );

  return group;
};

export const useKanbanBoard = (): KanbanHookResult => {
  const [items, setItems] = useState<KanbanItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<Record<string, TeamMember>>(
    {}
  );
  const [boardData, setBoardData] = useState<Record<string, KanbanItem[]>>({});
  const [displayMode, setDisplayMode] = useState<string>("status");
  const [sortCriteria, setSortCriteria] = useState<string>("priority");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const persistPreferences = useCallback(
    (preferences: Record<string, string>) => {
      Object.entries(preferences).forEach(([key, value]) => {
        sessionStorage.setItem(key, value); //can use recoil-persist
      });
    },
    []
  );

  const initializePreferences = useCallback(() => {
    const storedDisplayMode = sessionStorage.getItem("displayMode");
    const storedSortCriteria = sessionStorage.getItem("sortCriteria");

    setDisplayMode(storedDisplayMode || "status");
    setSortCriteria(storedSortCriteria || "priority");
  }, []);

  const fetchBoardData = async () => {
    try {
      const response = await axios.get<ApiPayload>(
        import.meta.env.VITE_TICKETS_API as string
      );
      const { tickets, users } = response.data;
      setItems(tickets);
      setTeamMembers(mapUsersByUserId(users));
    } catch (err) {
      setErrorMessage("Unable to fetch board data");
      console.error(err);
    }
  };

  const updateDisplayMode = useCallback(
    (value: string) => {
      setIsLoading(true);
      setDisplayMode(value);
      persistPreferences({ displayMode: value });
    },
    [persistPreferences]
  );

  const updateSortCriteria = useCallback(
    (value: string) => {
      setIsLoading(true);
      setSortCriteria(value);
      persistPreferences({ sortCriteria: value });
    },
    [persistPreferences]
  );

  useEffect(() => {
    initializePreferences();
    fetchBoardData();
  }, [initializePreferences]);

  useEffect(() => {
    if (items.length) {
      setBoardData(loadKanbanBoard(items, displayMode, sortCriteria));
      setIsLoading(false);
    }
  }, [displayMode, sortCriteria, items]);

  return {
    items,
    teamMembers,
    boardData,
    isLoading,
    errorMessage,
    displayMode,
    sortCriteria,
    updateDisplayMode,
    updateSortCriteria,
  };
};
