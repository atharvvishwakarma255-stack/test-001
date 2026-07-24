const express = require("express");

const app = express();
const PORT = 3000;

app.get("/one", (req, res) => {
    res.send("Hello from Server 1");
});

app.get("/dashboard2", (req, res) => {
    res.send("Hello from Server 1");
});


app.post("/api/v1/document/sends2", requireBusiness, (request, response) => {
  const {
    business_package_id: businessPackageId,
    status = "sent",
    signature_type: signatureType = "esign",
    is_notarization_required: isNotarizationRequired = false,
    expires_at: expiresAt,
    placeholder_values: placeholderValues = [],
    recipients = [],
  } = request.body;

  if (!businessPackageId) {
    return response.status(400).json({ success: false, message: "business_package_id is required" });
  }

  if (!["sent", "draft"].includes(status)) {
    return response.status(400).json({ success: false, message: "status must be sent or draft" });
  }

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return response.status(400).json({ success: false, message: "At least one recipient is required" });
  }

  const businessPackage = businessPackages.get(Number(businessPackageId));
  if (!businessPackage) {
    return response.status(404).json({ success: false, message: "Business package not found" });
  }

  if (status === "sent" && businessPackage.usage_count >= businessPackage.usage_limit) {
    return response.status(409).json({ success: false, message: "Business package usage limit reached" });
  }

  if (status === "sent") businessPackage.usage_count += 1;

  const tokenExpiresAt = status === "sent" ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() : null;
  const documents = recipients.map((recipient) => {
    const document = {
      id: 201 + recipientDocuments.length,
      business_id: request.business.id,
      business_package_id: businessPackage.id,
      recipient_id: 45 + recipientDocuments.length,
      status,
      signature_type: signatureType,
      expires_at: expiresAt ? new Date(`${expiresAt}T00:00:00.000Z`).toISOString() : null,
      sent_at: status === "sent" ? new Date().toISOString() : null,
      completed_at: null,
      generated_pdf_url: null,
      final_pdf_url: null,
      token_expires_at: tokenExpiresAt,
      invite_token: status === "sent" ? randomBytes(32).toString("hex") : null,
      recipient,
      is_notarization_required: Boolean(isNotarizationRequired),
      placeholder_values: placeholderValues,
    };
    recipientDocuments.push(document);
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
});

app.get("/test1", (req, res) => {
    res.json({
        success: true,
        server: "Server 1",
        message: "Test route is working"
    });
});

app.get('/test2', (req, res) => {
    res.json({
        success: true,
        server: "Server 1",
        message: "Test route 2 is working"
    });
});

app.get("/health2", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server 1 is running on http://localhost:${PORT}`);
});