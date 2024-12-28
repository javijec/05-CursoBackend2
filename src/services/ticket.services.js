import TicketRepository from "../repositories/ticket.repository.js";

class TicketService {
  constructor() {
    this.repository = new TicketRepository();
  }
  createTicket = async (data) => {
    const ticket = await this.repository.createTicket(data);
    return ticket;
  };
  readTicketbyEmail = async (email) => {
    const ticket = await this.repository.readTicketbyEmail(email);
    return ticket;
  };
  readTicketbyId = async (id) => {
    const ticket = await this.repository.readTicketbyId(id);
    return ticket;
  };
  readAllTickets = async () => {
    const tickets = await this.repository.readAllTickets();
    return tickets;
  };
  updateTicket = async (id, data) => {
    const ticket = await this.repository.updateTicket(id, data);
    return ticket;
  };
  deleteTicket = async (id) => {
    const ticket = await this.repository.deleteTicket(id);
    return ticket;
  };
}

export default TicketService;
