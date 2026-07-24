const recipientDocuments = [];

const statusFixtures = new Map([
  [9001, {
    id: 9001,
    business_id: 1,
    business_package_id: 1,
    recipient_id: 501,
    status: "sent",
    sent_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    recipient: { first_name: "Jordan", last_name: "Blake", email_address: "jordan@example.com", recipient_type: "signer" },
    generated_pdf_url: null,
    final_pdf_url: null,
  }],
]);

class RecipientDocument {
  static create(document) {
    recipientDocuments.push(document);
    return document;
  }

  static count() {
    return recipientDocuments.length;
  }

  static findById(id) {
    const documentId = Number(id);
    return recipientDocuments.find((candidate) => candidate.id === documentId) || statusFixtures.get(documentId) || null;
  }

  static trackingStatus(document) {
    if (document.completed_at) return "COMPLETED";
    if (document.expires_at && new Date(document.expires_at) < new Date()) return "EXPIRED";
    if (document.sent_at) return "SENT";
    return "PENDING";
  }
}

module.exports = RecipientDocument;
