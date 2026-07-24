const businessPackages = new Map([
  [1, { id: 1, template_id: 10, usage_limit: 100, usage_count: 0 }],
]);

class BusinessPackage {
  static findById(id) {
    return businessPackages.get(Number(id)) || null;
  }

  static incrementUsage(businessPackage) {
    businessPackage.usage_count += 1;
  }
}

module.exports = BusinessPackage;
