import TicketModel from "./models/ticket.model.js";

class TicketsManager {
  constructor() {}
  //createOne
  createTicket = async (data) => {
    const ticket = await TicketModel.create(data);
    if (!ticket) {
      throw new Error("Failed to create ticket");
    }
    return ticket;
  };
  //readOnebyEmail
  readTicketbyEmail = async (email) => {
    const ticket = await TicketModel.findOne({ email: email }).lean();
    return ticket;
  };
  //readOnebyId
  readTicketbyId = async (id) => {
    const ticket = await TicketModel.findOne({ _id: id }).lean();
    return ticket;
  };
  //readAll
  readAllTickets = async () => {
    const tickets = await TicketModel.find().lean();
    return tickets.length ? tickets : {};
  };
  //updateOne
  updateTicket = async (id, data) => {
    const options = { new: true };
    const ticket = await TicketModel.findByIdAndUpdate(id, data, options);
    if (!ticket) {
      throw new Error("Failed to update ticket");
    }
    return ticket;
  };
  //deleteOne
  deleteTicket = async (id) => {
    const ticket = await TicketModel.findByIdAndDelete(id);
    if (!ticket) {
      throw new Error("Ticket not found");
    } else {
      return ticket;
    }
  };
}

export default TicketsManager;
