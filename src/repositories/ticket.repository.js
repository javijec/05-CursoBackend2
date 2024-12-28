import TicketDTO from "../dto/ticket.dto.js";
import dao from "../dao/index.factory.js";

const { TicketsManager } = dao;

class TicketRepository {
  constructor() {
    this.manager = new TicketsManager();
  }
  transfomTicket(ticket) {
    if (!ticket) return null;
    return new TicketDTO(ticket);
  }

  transformTickets(tickets) {
    if (!tickets) return null;
    return tickets.map((ticket) => this.transfomTicket(ticket));
  }

  async createTicket(data) {
    const ticket = await this.manager.createTicket(data);
    return this.transfomTicket(ticket);
  }

  async readTicketbyEmail(email) {
    const ticket = await this.manager.readTicketbyEmail(email);
    return this.transfomTicket(ticket);
  }

  async readTicketbyId(id) {
    const ticket = await this.manager.readTicketbyId(id);
    return this.transfomTicket(ticket);
  }

  async readAllTickets() {
    const tickets = await this.manager.readAllTickets();
    return this.transformTickets(tickets);
  }

  async updateTicket(id, data) {
    const ticket = await this.manager.updateTicket(id, data);
    return this.transfomTicket(ticket);
  }

  async deleteTicket(id) {
    const ticket = await this.manager.deleteTicket(id);
    return this.transfomTicket(ticket);
  }
}

export default TicketRepository;
