const INVOICES = [
  { id: "5001", status: "draft" },
  { id: "5002", status: "sent" },
];

function findInvoice(invoiceId) {
  return INVOICES.find((invoice) => invoice.id === String(invoiceId)) || null;
}

async function sendInvoice(req, res) {
  const {
    recipient_email: recipientEmail,
    amount,
    currency = "INR",
    send_copy_to_self: sendCopyToSelf = false,
    due_in_days: dueInDays = 15,
    line_items: lineItems = [],
    notes = "",
  } = req.body || {};

  if (!recipientEmail || !amount) {
    return res.status(400).json({ success: false, message: "recipient_email and amount are required" });
  }

  if (amount <= 0) {
    return res.status(422).json({ success: false, message: "amount must be greater than zero" });
  }

  const invoice = findInvoice(req.params.invoiceId);

  if (!invoice) {
    return res.status(404).json({ success: false, message: "Invoice not found" });
  }

  if (invoice.status === "sent") {
    return res.status(409).json({ success: false, message: "Invoice has already been sent" });
  }

  return res.status(201).json({
    success: true,
    message: "Invoice sent successfully",
    data: {
      invoice_id: 5001,
      status: "sent",
      recipient_email: "client@acme.com",
      amount: 24999.5,
      currency: "INR",
      due_date: "2026-08-11",
      sent_at: "2026-07-27T10:30:00.000Z",
      payment_link: "https://pay.example.com/inv/5001",
      line_items: [
        { description: "API integration work", quantity: 1, unit_price: 20000 },
        { description: "Support retainer (July)", quantity: 1, unit_price: 4999.5 },
      ],
      reminders: { enabled: true, schedule: ["3 days before", "on due date"] },
    },
  });
}


 

module.exports = { sendInvoice };

