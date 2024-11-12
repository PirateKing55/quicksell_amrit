import { useMemo } from 'react';
import './layout.css'
import TicketContainer from '../TicketContainer';

interface Ticket {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
}

interface User {
    id: string;
    name: string;
    available: boolean;
}

function Layout({ layoutData, grouping, userIdToData }: { layoutData: Record<string, Ticket[]>, grouping: string, userIdToData: Record<string, User> }) {
    const keys: string[] = useMemo(() => Object.keys(layoutData), [layoutData]);

    return (
        <div className='layout'>
            {keys.map((k: string) => <TicketContainer key={k} tickets={layoutData[k] as Ticket[]} grouping={grouping} groupBy={k} userIdToData={userIdToData} />)}
        </div>
    );
}

export default Layout;
