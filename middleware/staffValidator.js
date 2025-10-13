const { check, validationResult } = require("express-validator");

//Validation for Signup
exports.StaffsignupValidator = [
  check("userID").not().isEmpty().trim().withMessage("All fields required"),
  check("userType").not().isEmpty().trim().withMessage("All fields required"),
  check("userSubType").not().isEmpty().trim().withMessage("All fields required"),
  check("firstName").not().isEmpty().trim().withMessage("All fields required"),
  check("lastName").not().isEmpty().trim().withMessage("All fields required"),
  check("topicArea").not().isEmpty().trim().withMessage("All fields required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("username").not().isEmpty().trim().withMessage("All fields required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

//Validation for Accept Topic 
exports.ActTopicValidator = [
  check("groupID").not().isEmpty().trim().withMessage("All fields required"),
  check("supervisorName").not().isEmpty().trim().withMessage("All fields required"),
  check("researchTopic").not().isEmpty().trim().withMessage("All fields required"),
  check("coSupervisorName").not().isEmpty().trim().withMessage("All fields required"),
  check("status").not().isEmpty().trim().withMessage("All fields required"),
  check("remarks").not().isEmpty().trim().withMessage("All fields required"),
];

//Validation for Accept Topic 
exports.EvDocumentValidator = [
  check("groupID").not().isEmpty().trim().withMessage("All fields required"),
  check("supervisorName").not().isEmpty().trim().withMessage("All fields required"),
  check("evDocument").not().isEmpty().trim().withMessage("All fields required"),
  check("documentMarks").not().isEmpty().trim().withMessage("All fields required"),
];

//Validation result
exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
  
    if (hasErrors) {
      const firstError = result.array()[0].msg;
      return res.status(400).json({
        errorMessage: firstError,
      });
    }
  
    next();
  };