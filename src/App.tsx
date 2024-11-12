import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { useKanbanBoard } from './hooks/useKanbanBoardTickets.ts';
import './App.css'

function App() {
  const {
    boardData,
    teamMembers,
    isLoading,
    errorMessage,
    displayMode,
    sortCriteria,
    updateDisplayMode,
    updateSortCriteria
  } = useKanbanBoard();

  return (
    <div className="App">
      <Navbar
        grouping={displayMode}
        setGrouping={updateDisplayMode}
        ordering={sortCriteria}
        setOrdering={updateSortCriteria}
      />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : (
        <Layout layoutData={boardData} grouping={displayMode} userIdToData={teamMembers} />
      )}
    </div>
  );
}

function Loader({ fullscreen = true }: { fullscreen?: boolean }) {
  return (
    <div className={`loader-container ${fullscreen && "fullscreen"}`}>
      <span className='loader'>Loading...</span>
    </div>
  );
}

export default App;
