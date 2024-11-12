import './navbar.css'
import Display from '../Display';

function Navbar({ grouping, setGrouping, ordering, setOrdering }: { grouping: string, setGrouping: (grouping: string) => void, ordering: string, setOrdering: (ordering: string) => void }) {

    return (
        <header>
            <Display grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} />
        </header>
    );
}

export default Navbar;
