
async function healthCheck(req, res) {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
}

async function usersList(req, res) {
  res.json({ users: ["user1", "user2", "user3"] });
}

async function sendEmail(req, res) {
  res.json({ success: true, message: "Email sent successfully" });
}

async function syncDocs(req, res) {
  res.json({ success: true, message: "Shubham !!!!!!" });
}




async function sendInvoiceReminder(req, res) {
  try {
    const { invoiceId } = req.params;
    const {
      recipient_email,
      reminder_type = "email",
      reminder_message = "",
      send_copy_to_self = false,
    } = req.body;

    if (!recipient_email) {
      return res.status(400).json({
        success: false,
        message: "recipient_email is required",
      });
    }

    // Mock 404
    if (invoiceId === "404") {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Mock 409
    if (invoiceId === "409") {
      return res.status(409).json({
        success: false,
        message: "Reminder has already been sent",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice reminder sent successfully",
      data: {
        invoice_id: Number(invoiceId),
        recipient_email,
        reminder_type,
        reminder_message,
        send_copy_to_self,
        reminder_status: "sent",
        sent_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}


async function sendInvoiceReminder2(req, res) {
  try {
    const { invoiceId } = req.params;
    const {
      recipient_email,
      reminder_type = "email",
      reminder_message = "",
      send_copy_to_self = false,
    } = req.body;

    if (!recipient_email) {
      return res.status(400).json({
        success: false,
        message: "recipient_email is required",
      });
    }

    // Mock 404
    if (invoiceId === "404") {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Mock 409
    if (invoiceId === "409") {
      return res.status(409).json({
        success: false,
        message: "Reminder has already been sent",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice reminder sent successfully",
      data: {
        invoice_id: Number(invoiceId),
        recipient_email,
        reminder_type,
        reminder_message,
        send_copy_to_self,
        reminder_status: "sent",
        sent_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = {healthCheck, usersList, sendEmail, syncDocs, sendInvoiceReminder, sendInvoiceReminder2};
