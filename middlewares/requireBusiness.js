function requireBusiness(request, response, next) {
  request.business = { id: 1 };
  next();
}

module.exports = requireBusiness;
