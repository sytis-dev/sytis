import logo from "@/images/logo.png";
import bg from "@/images/update-1-12-2020/background/sytis-login-bg.jpg";

export const loginWrapper = {
  bg,
  logo,
  logoTitle: "SYTIS",
  year: new Date().getFullYear(),
  author: "SYTIS",
  forgotText: "",
  inputs: [
    {
      name: "name",
      type: "text",
      placeholder: "Your Name *",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter Email Address *",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Your Password *",
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password *",
      required: true,
    },
  ],
};
