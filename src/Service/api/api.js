const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(registerData) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(registerData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}

export async function otpVerify(email, OTP) {
  const response = await fetch(`${BASE_URL}/api/auth/otpVerify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email: email,
      OTP: OTP,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Otp Verification Failed");
  }
  return data;
}

export async function loginUser(loginData) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login Failed.");
  }
  return data;
}

export async function logoutUser() {}

export async function getUser() {
  const token = localStorage.getItem("token");
  console.log(token);

  const response = await fetch(`${BASE_URL}/api/auth/getUser`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user");
  }

  return data;
}

export async function editUser(data) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/auth/editUser`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update user");
  }

  return result;
}
