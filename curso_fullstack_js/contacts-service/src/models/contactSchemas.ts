import joi from 'joi';

const contactSchema = joi.object({
    id: joi.number()
            .integer()
            .min(1),
    accountId: joi.number()
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
    phone: joi.string()
                 .pattern(/^[0-9]{10,11}$/),
    status: joi.number()
               .integer()
               .min(100)
               .max(400)
});

const contactUpdateSchema = joi.object({
    name: joi.string()
             .min(3)
             .max(150)
             .required(),
    phone: joi.string()
              .pattern(/^[0-9]{10,11}$/),
    status: joi.number()
               .integer()
               .min(100)
               .max(400)
});

export { contactSchema, contactUpdateSchema }