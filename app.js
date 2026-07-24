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


// GET Template Placeholders
app.get(
  "/api/v1/business/templates/:id/placeholders",
  authenticate, // Bearer authentication middleware
  authorize("business_owner"), // Business owner authorization middleware
  async (req, res) => {
    try {
      const { id } = req.params;

      // Validate template id
      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: [
            {
              field: "id",
              message: "Template id must be a positive integer.",
            },
          ],
        });
      }

      // ------------------------------------------------------
      // TODO:
      // 1. Get authenticated business from req.user
      // 2. Verify active business_package assignment
      // 3. Fetch template placeholders
      // 4. Fetch placeholder details
      // 5. Fetch validation rules
      // 6. Fetch mapping configuration
      // ------------------------------------------------------

      // Example response
      return res.status(200).json({
        success: true,
        message: "Template placeholders fetched successfully",
        data: [
          {
            id: 11,
            template_id: Number(id),
            placeholder_id: 1,
            page_number: 1,
            x_coordinate: 120.5,
            y_coordinate: 240,
            width: 180,
            height: 32,
            style: null,
            config: null,
            default_value: null,
            is_editable_by_recipient: false,
            is_required: true,
            validation_id: null,
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
            placeholder: {
              id: 1,
              name: "Company Name",
              type: "text",
              description: null,
              is_required: true,
              is_system_default: false,
              validationRule: null,
            },
            validationRule: null,
            mapping: {
              source_type: "business_manual",
              source_recipient_field: null,
              source_custom_field_id: null,
              prefilled_value: "CloudSync Solutions",
              is_locked: true,
            },
          },
          {
            id: 12,
            template_id: Number(id),
            placeholder_id: 2,
            page_number: 1,
            x_coordinate: 120.5,
            y_coordinate: 280,
            width: 180,
            height: 32,
            style: null,
            config: null,
            default_value: null,
            is_editable_by_recipient: true,
            is_required: true,
            validation_id: null,
            createdAt: "2026-01-01T00:00:00.000Z",
            updatedAt: "2026-01-01T00:00:00.000Z",
            placeholder: {
              id: 2,
              name: "Recipient Name",
              type: "text",
              description: null,
              is_required: true,
              is_system_default: true,
              validationRule: null,
            },
            validationRule: null,
            mapping: null,
          },
        ],
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

app.listen(PORT, () => {
    console.log(`Server 1 is running on http://localhost:${PORT}`);
});