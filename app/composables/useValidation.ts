import * as yup from "yup";

export const useValidationSchema = () => {
  const signupSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be at most 50 characters")
      .matches(/^[A-Za-z]+$/, "First name can only contain letters"),

    newFirstName: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be at most 50 characters")
      .matches(/^[A-Za-z]+$/, "First name can only contain letters"),

    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters")
      .matches(/^[A-Za-z]+$/, "Last name can only contain letters"),

    newLastName: yup
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters")
      .matches(/^[A-Za-z]+$/, "Last name can only contain letters"),

    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .matches(
        /^[A-Za-z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),

    newUsername: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .matches(
        /^[A-Za-z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
      email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .max(100, "Email must be at most 100 characters"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .max(100, "Email must be at most 100 characters"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const otpSchema = yup.object({
    otp: yup
      .string()
      .required("Code is required")
      .min(6, "Code must be 6 digits"),
  });

  return { signupSchema, loginSchema, otpSchema };
};
