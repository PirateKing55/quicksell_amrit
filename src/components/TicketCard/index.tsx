import './ticketCard.css';
import UserAvatar from '../Avatar';

import backlog from '../../assets/icons/Backlog.svg';
import todo from '../../assets/icons/To-do.svg';
import progress from '../../assets/icons/in-progress.svg';
import done from '../../assets/icons/Done.svg';
import cancelled from '../../assets/icons/Cancelled.svg';
import threeDot from '../../assets/icons/threedotmenu.svg';

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

function TicketCard({
  ticket,
  userData,
  hideStatusIcon,
  hideProfileIcon,
}: {
  ticket: Ticket;
  userData: User;
  hideStatusIcon: boolean;
  hideProfileIcon: boolean;
}) {

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

  return (
    <div className="ticket-card">
      <div className="ticket-card-header">
        <div className="ticket-number">{ticket.id}</div>
        {hideProfileIcon ? null : <UserAvatar name={userData.name} available={userData.available} />}
      </div>
      <div className="ticket-card-body">
        {hideStatusIcon ? null : getStatusIcon(ticket.status)}
        <div className="ticket-title">{ticket.title}</div>
      </div>
      <div className="ticket-card-footer">
        <div className="options-icon">
          <img src={threeDot} alt="Icon" />
        </div>
        {ticket.tag.map((tag: string) => (
          <div key={tag} className="ticket-tag">
            <div className="tag-circle"></div>
            <div className="tag-label">{tag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketCard;
