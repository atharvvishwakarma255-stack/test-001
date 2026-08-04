const getTemplates = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Templates fetched successfully",
      timestamp: new Date().toISOString(),

      pagination: {
        page: 1,
        limit: 10,
        totalRecords: 124,
        totalPages: 13,
        hasNextPage: true,
        hasPreviousPage: false
      },

      filters: {
        search: "",
        category: "all",
        status: "published",
        sortBy: "updatedAt",
        order: "desc"
      },

      data: [
        {
          id: "tpl_001",
          name: "Employee Offer Letter",
          slug: "employee-offer-letter",

          description:
            "Standard employment offer letter template for new employees.",

          category: {
            id: "cat_hr",
            name: "Human Resources"
          },

          status: "published",

          version: {
            current: "3.2.1",
            latest: true,
            totalVersions: 12
          },

          creator: {
            id: "usr_101",
            name: "Aniket Vishwakarma",
            email: "aniket@example.com",
            avatar:
              "https://i.pravatar.cc/150?img=10"
          },

          permissions: {
            canView: true,
            canEdit: true,
            canDelete: true,
            canPublish: true
          },

          tags: [
            "HR",
            "Offer Letter",
            "Employee",
            "Legal"
          ],

          analytics: {
            totalViews: 1423,
            totalDownloads: 381,
            totalUses: 215,
            averageRating: 4.8,
            reviews: 56
          },

          file: {
            format: "DOCX",
            size: "248 KB",
            pages: 5,
            language: "English"
          },

          lastModifiedBy: {
            id: "usr_201",
            name: "Rahul Sharma"
          },

          createdAt: "2026-08-01T09:10:00Z",
          updatedAt: "2026-08-04T10:20:00Z",

          workflow: {
            approvalRequired: true,
            approvedBy: "Legal Team",
            publishedAt: "2026-08-02T12:00:00Z"
          }
        },

        {
          id: "tpl_002",
          name: "NDA Agreement",
          slug: "nda-agreement",

          description:
            "Non Disclosure Agreement template for vendors and partners.",

          category: {
            id: "cat_legal",
            name: "Legal"
          },

          status: "draft",

          version: {
            current: "1.0.0",
            latest: true,
            totalVersions: 1
          },

          creator: {
            id: "usr_102",
            name: "Priya Singh",
            email: "priya@example.com"
          },

          permissions: {
            canView: true,
            canEdit: true,
            canDelete: false,
            canPublish: false
          },

          tags: [
            "Legal",
            "Agreement",
            "NDA"
          ],

          analytics: {
            totalViews: 230,
            totalDownloads: 42,
            totalUses: 18,
            averageRating: 4.4,
            reviews: 8
          },

          file: {
            format: "PDF",
            size: "312 KB",
            pages: 8,
            language: "English"
          },

          createdAt: "2026-07-20T08:00:00Z",
          updatedAt: "2026-08-03T18:20:00Z"
        }
      ],

      summary: {
        totalTemplates: 124,
        published: 98,
        draft: 18,
        archived: 8,
        categories: 12
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching templates.",
      error: error.message
    });
  }
};

module.exports = {
  getTemplates,
};