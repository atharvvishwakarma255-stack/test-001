const recipientDocuments = [];

class RecipientDocument {
  static create(document) {
    recipientDocuments.push(document);
    return document;
  }

  static count() {
    return recipientDocuments.length;
  }
}

module.exports = RecipientDocument;
