export function validateRegisterForm(registerData) {
  const errors = {};

  Object.keys(registerData).forEach((field) => {
    if (!registerData[field].trim()) {
      errors[field] = "Required";
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (registerData.email && !emailRegex.test(registerData.email)) {
    errors.email = "Invalid Email";
  }

  if (registerData.phone && !/^[0-9]{10}$/.test(registerData.phone)) {
    errors.phone = "Invalid Phone";
  }

  if (registerData.password && registerData.password.length < 6) {
    errors.password = "Min 6 chars";
  }

  if (
    registerData.password &&
    registerData.confirmPassword &&
    registerData.password !== registerData.confirmPassword
  ) {
    errors.confirmPassword = "Password mismatch";
  }

  return errors;
}
