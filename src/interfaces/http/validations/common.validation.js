// Common validations that are reused
import Joi from "joi";

export const email = Joi.string()
  .trim()
  .email({ minDomainSegments: 2 });

export const password = Joi.string().trim().min(8);
