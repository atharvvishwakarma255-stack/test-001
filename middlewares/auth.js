function authenticate(req, res, next) {
  req.user = { id: 1, role: "business_owner" };
  next();
}

function authorize(role) {
  return (req, res, next) => next();
}

module.exports = { authenticate, authorize };
