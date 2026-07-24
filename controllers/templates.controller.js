async function getTemplatePlaceholders(req, res) {
  try {
    const { id } = req.params;

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

module.exports = { getTemplatePlaceholders };
