import joi from 'Joi';

const accountSchema = joi.object({
    id: joi.number()
            .integer()
            .min(1),
    name: joi.string()
             .min(3)
             .max(150)
             .required(),
    email: joi.string()
              .email()
              .min(8)
              .max(150)
              .required(),
    password: joi.string()
                 .min(4)
                 .max(50)
                 .required(),
    status: joi.number()
               .integer()
               .min(100)
               .max(400)
});

const loginSchema = joi.object({
    email: joi.string()
              .email()
              .min(8)
              .max(150)
              .required(),
    password: joi.string()
                 .min(4)
                 .max(50)
                 .required()
});

export { accountSchema, loginSchema }