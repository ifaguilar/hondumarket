import * as yup from "yup";

const passwordRules =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;

const phoneRules = /^[0-9]{4}-[0-9]{4}$/;

export const SignupFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "El nombre debe contener al menos 3 caracteres.")
    .required("Requerido."),
  lastName: yup
    .string()
    .min(3, "El apellido debe contener al menos 3 caracteres.")
    .required("Requerido."),
  phone: yup
    .string()
    .min(
      9,
      "Por favor, ingresa un número de teléfono válido. Por ejemplo: 1234-5678"
    )
    .matches(
      phoneRules,
      "Por favor, ingresa un número de teléfono válido. Por ejemplo: 1234-5678"
    )
    .required("Requerido."),
  email: yup
    .string()
    .email("Por favor, ingresa un correo electrónico válido.")
    .required("Requerido."),
  password: yup
    .string()
    .min(
      8,
      "Por favor, ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
    )
    .matches(
      passwordRules,
      "Por favor, ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
    )
    .required("Requerido."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden.")
    .required("Requerido."),
  department: yup.string().required("Requerido."),
  municipality: yup.string().required("Requerido."),
  terms: yup.boolean().oneOf([true], "Requerido."),
});

export const SigninFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor, ingresa un correo electrónico válido.")
    .required("Requerido."),
  password: yup.string().required("Requerido."),
});

export const ForgotPasswordFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Por favor, ingresa un correo electrónico válido.")
    .required("Requerido."),
});

export const ResetPasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .min(
      8,
      "Por favor, ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
    )
    .matches(
      passwordRules,
      "Por favor, ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
    )
    .required("Requerido."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden.")
    .required("Requerido."),
});

export const CategoryFormSchema = yup.object().shape({
  categoryName: yup
    .string()
    .min(3, "El nombre debe contener al menos 3 caracteres.")
    .required("Requerido."),
  isActive: yup.string().required("Requerido."),
});

export const ProductFormSchema = yup.object().shape({
  expirationDate: yup.string().required("Requerido."),
  isActive: yup.string().required("Requerido."),
});

export const UserFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "El nombre debe contener al menos 3 caracteres."),
  lastName: yup
    .string()
    .min(3, "El apellido debe contener al menos 3 caracteres."),
  phone: yup
    .string()
    .min(
      9,
      "Por favor, ingresa un número de teléfono válido. Por ejemplo: 1234-5678"
    )
    .matches(
      phoneRules,
      "Por favor, ingresa un número de teléfono válido. Por ejemplo: 1234-5678"
    ),
  email: yup.string().email("Por favor, ingresa un correo electrónico válido."),
  password: yup
    .string()
    .min(
      8,
      "Por favor, ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
    )
    .matches(
      passwordRules,
      "Por favor, ingresa una contraseña válida. La contraseña debe tener al menos 8 caracteres y debe contener al menos una letra mayúscula, un número y un caracter especial."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden."),
});

export const CreateProductFormSchema = yup.object().shape({
  productName: yup
    .string()
    .min(3, "El nombre debe contener al menos 3 caracteres.")
    .max(255, "El nombre no debe contener más de 255 caracteres.")
    .required("Requerido."),
  description: yup
    .string()
    .min(3, "La descripción debe contener al menos 3 caracteres.")
    .max(255, "La descripción no debe contener más de 255 caracteres.")
    .required("Requerido."),
  price: yup
    .number()
    .typeError("Por favor, ingresa una cantidad válida.")
    .min(1, "Por favor, ingresa una cantidad válida.")
    .positive("Por favor, ingresa una cantidad válida.")
    .required("Requerido."),
  category: yup.string().required("Requerido."),
  condition: yup.string().required("Requerido."),
});
