import j2s from "joi-to-swagger";
import loginValidation from "../validations/loginValidation";
import registerValidation from "../validations/registerValidation";
import createUserValidation from "../validations/createUserValidation";
import updateUserValidation from "../validations/updateUserValidation";

const { swagger: loginSchema } = j2s(loginValidation);
const { swagger: registerSchema } = j2s(registerValidation);
const { swagger: createUserSchema } = j2s(createUserValidation);
const { swagger: updateUserSchema } = j2s(updateUserValidation);




export const swaggerSchemas = {
  loginSchema,
  registerSchema,
  createUserSchema,
  updateUserSchema,
};
