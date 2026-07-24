const crypto = require("crypto");
const BusinessPackage = require("../models/BusinessPackage");
const RecipientDocument = require("../models/RecipientDocument");

async function sendDocument(request, response) {
  const {
    business_package_id: businessPackageId,
    status = "sent",
    signature_type: signatureType = "esign",
    is_notarization_required: isNotarizationRequired = false,
    expires_at: expiresAt,
    placeholder_values: placeholderValues = [],
    recipients = [],
  } = request.body || {};

  if (!businessPackageId) {
    return response.status(400).json({ success: false, message: "business_package_id is required" });
  }

  if (!["sent", "draft"].includes(status)) {
    return response.status(400).json({ success: false, message: "status must be sent or draft" });
  }

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return response.status(400).json({ success: false, message: "At least one recipient is required" });
  }

  const businessPackage = BusinessPackage.findById(businessPackageId);
  if (!businessPackage) {
    return response.status(404).json({ success: false, message: "Business package not found" });
  }

  if (status === "sent" && businessPackage.usage_count >= businessPackage.usage_limit) {
    return response.status(409).json({ success: false, message: "Business package usage limit reached" });
  }

  if (status === "sent") BusinessPackage.incrementUsage(businessPackage);

  const tokenExpiresAt = status === "sent" ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() : null;
  const documents = recipients.map((recipient) => {
    const document = {
      id: 201 + RecipientDocument.count(),
      business_id: request.business.id,
      business_package_id: businessPackage.id,
      recipient_id: 45 + RecipientDocument.count(),
      status,
      signature_type: signatureType,
      expires_at: expiresAt ? new Date(`${expiresAt}T00:00:00.000Z`).toISOString() : null,
      sent_at: status === "sent" ? new Date().toISOString() : null,
      completed_at: null,
      generated_pdf_url: null,
      final_pdf_url: null,
      token_expires_at: tokenExpiresAt,
      invite_token: status === "sent" ? crypto.randomBytes(32).toString("hex") : null,
      recipient,
      is_notarization_required: Boolean(isNotarizationRequired),
      placeholder_values: placeholderValues,
    };
    RecipientDocument.create(document);
    return document;
  });

  const remainingUsage = businessPackage.usage_limit - businessPackage.usage_count;
  return response.status(201).json({
    success: true,
    message: status === "sent" ? "Document(s) sent successfully" : "Document draft(s) saved successfully",
    data: {
      mode: status,
      business_package: {
        id: businessPackage.id,
        template_id: businessPackage.template_id,
        signature_type: signatureType,
        usage_count: businessPackage.usage_count,
      },
      usage: {
        usage_limit: businessPackage.usage_limit,
        usage_count: businessPackage.usage_count,
        remaining_usage: remainingUsage,
        can_send: remainingUsage > 0,
      },
      total_recipients: documents.length,
      documents: documents.map(({ invite_token: _inviteToken, recipient: _recipient, is_notarization_required: _notarization, placeholder_values: _placeholders, ...document }) => document),
      notifications: {
        enabled: false,
        reason: "RECIPIENT_NOTIFICATIONS_ENABLED is false",
      },
    },
  });
}

async function getDocumentStatus(request, response) {
  const document = RecipientDocument.findById(request.params.recipientDocumentId);
  if (!document) {
    return response.status(404).json({ success: false, message: "Recipient document not found" });
  }
  if (document.business_id !== request.business.id) {
    return response.status(403).json({ success: false, message: "Document belongs to a different business" });
  }

  const status = RecipientDocument.trackingStatus(document);
  const isExpired = status === "EXPIRED";
  const isCompleted = status === "COMPLETED";
  const isSent = status === "SENT";
  const recipient = document.recipient || {};
  return response.json({
    success: true,
    message: "Document status fetched successfully",
    data: {
      recipient_document_id: document.id,
      business_package_id: document.business_package_id,
      recipient: {
        id: document.recipient_id,
        name: [recipient.first_name, recipient.last_name].filter(Boolean).join(" "),
        email_address: recipient.email_address,
        recipient_type: recipient.recipient_type,
      },
      status: document.status,
      tracking: {
        tracking_status: status,
        is_sent: isSent,
        is_pending: status === "PENDING",
        is_completed: isCompleted,
        is_expired: isExpired,
        sent_at: document.sent_at || null,
        expires_at: document.expires_at || null,
        completed_at: document.completed_at || null,
      },
      timeline: [
        { event: "sent", completed: Boolean(document.sent_at), occurred_at: document.sent_at || null },
        { event: "completed", completed: isCompleted, occurred_at: document.completed_at || null },
        { event: "expired", completed: isExpired, occurred_at: isExpired ? document.expires_at : null },
      ],
      generated_pdf_url: document.generated_pdf_url || null,
      final_pdf_url: document.final_pdf_url || null,
    },
  });
}

module.exports = { sendDocument, getDocumentStatus };
