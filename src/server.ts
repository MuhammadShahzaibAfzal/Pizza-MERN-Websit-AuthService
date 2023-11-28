function login(userName: string, password: string): boolean {
  return userName === "admin" && password === "secret";
}

if (login("admin", "secret")) {
  // console.log("Login Successfully");
} else {
  // console.log("Invalid credentials!");
}
