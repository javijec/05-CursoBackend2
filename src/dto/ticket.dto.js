class TicketDTO {
  constructor(ticket) {
    if (!ticket) {
      throw new Error("Ticket data is required");
    }

    this.code = ticket.code;
    this.purchaseDatetime = ticket.purchaseDatetime;
    this.amount = ticket.amount;
    this.purchaser = ticket.purchaser;
  }

  toJSON() {
    const { purchaseDatetime, ...publicData } = this;
    return publicData;
  }
}
export default TicketDTO;
