import { useMemo } from 'react';
import Card from '../TicketCard';
import "./ticketContainer.css"
import Avatar from '../Avatar';

import add from '../../assets/icons/add.svg';
import threeDot from '../../assets/icons/threedotmenu.svg';
import lowPriority from '../../assets/icons/LowPriority.svg';
import mediumPriority from '../../assets/icons/MediumPriority.svg';
import highPriority from '../../assets/icons/HighPriority.svg';
import backlog from '../../assets/icons/Backlog.svg';
import todo from '../../assets/icons/To-do.svg';
import progress from '../../assets/icons/in-progress.svg';
import done from '../../assets/icons/Done.svg';
import cancelled from '../../assets/icons/Cancelled.svg';
import urgent from '../../assets/icons/UrgentPrioritycolour.svg';

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


function TicketContainer({ tickets, grouping, groupBy, userIdToData }: { tickets: Ticket[], grouping: string, groupBy: string, userIdToData: Record<string, User> }) {

    const getStatusIcon = (priority: string) => {
        switch (priority) {
            case "Backlog": return <img src={backlog} alt="backlog" />
            case "Todo": return <img src={todo} alt="Todo" />
            case "In progress": return <img src={progress} alt="progress" />
            case "Done": return <img src={done} alt="done" />
            case "Canceled": return <img src={cancelled} alt="cancelled" />
            default: return <img src={threeDot} alt="Icon" />
        }
    }

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case "No priority": return <img src={threeDot} alt="Icon" />
            case "Low": return <img src={lowPriority} alt="lowPriority" />
            case "Medium": return <img src={mediumPriority} alt="mediumPriority" />
            case "High": return <img src={highPriority} alt="highPriority" />
            case "Urgent": return <img src={urgent} alt="urgent" />
            default: return <img src={threeDot} alt="Icon" />
        }
    }

    const title = useMemo(() => {
        if (grouping === "status")
            return groupBy;
        if (grouping === "priority")
            return groupBy;
        if (grouping === "user")
            return userIdToData[groupBy].name;
    }, [grouping, groupBy]);

    const icon = useMemo(() => {
        if (grouping === "status")
            return getStatusIcon(groupBy);
        if (grouping === "priority")
            return getPriorityIcon(groupBy);
        if (grouping === "user")
            return <Avatar name={userIdToData[groupBy].name} available={userIdToData[groupBy].available} />
    }, [grouping, groupBy])

    return (
        <div className='column'>
            <div className='column-header'>
                <div className='column-header-left-container'>
                    {icon}
                    <div className='column-title'>
                        {title}
                    </div>
                </div>
                <div className='column-header-right-container'>
                    <img src={add} alt="Icon" />
                    <img src={threeDot} alt="Icon" />
                </div>
            </div>
            <div className='cards-container'>
                {tickets.map((ticket: Ticket) => <Card key={ticket.id} ticket={ticket} userData={userIdToData[ticket.userId]} hideStatusIcon={grouping === "status"} hideProfileIcon={grouping === "user"} />)}
            </div>
        </div>
    );
}

export default TicketContainer;
