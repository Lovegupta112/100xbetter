const { emailSchema, passwordSchema } = require("../validationSchema");

const validationMiddleware = (req, res, next) => {
  try {
    const { password, email } = req.body;

    const validEmail = emailSchema.safeParse(email);
    const validPassword = passwordSchema.safeParse(password);

    if (!validEmail.success || !validPassword.success) {
     let invalidError=validEmail.error || validPassword.error;
      throw new Error(invalidError && invalidError.errors[0] && invalidError.errors[0].message);
    }
    else{
        next();
    }
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};

module.exports = validationMiddleware;
