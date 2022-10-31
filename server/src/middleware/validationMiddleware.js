import validator from "express-validator";

const { check, validationResult } = validator;

export const validateSignin = [
  check("email", "Ingresa un correo electrónico válido.").exists().isEmail(),

  check("password", "Ingresa una contraseña.").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const validateSignup = [
  check(
    "firstName",
    "Ingresa un nombre válido. El nombre de tener al menos 3 caracteres y no puede contener números ni caracteres especiales."
  )
    .exists()
    .isLength({ min: 3 })
    .isAlpha(),

  check(
    "lastName",
    "Ingresa un apellido válido. El apellido de tener al menos 3 caracteres y no puede contener números ni caracteres especiales."
  )
    .exists()
    .isLength({ min: 3 })
    .isAlpha(),

  check("phone", "Ingresa un número telefónico válido.")
    .exists()
    .matches(/^[0-9]{4}-[0-9]{4}$/),

  check("email", "Ingresa un correo electrónico válido").exists().isEmail(),

  check(
    "password",
    "Ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
  )
    .exists()
    .isStrongPassword(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    console.error(error.array());
    res.status(403).send(error.array());
  }
};
