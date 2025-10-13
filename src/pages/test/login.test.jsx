import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import Student from "../student/studentLogin";

import "@testing-library/jest-dom/extend-expect";

import * as React from "react";

test("Login", async () => {
  const { getByPlaceholderText } = render(<Student />);

  const email = getByPlaceholderText("Email address");

  const password = getByPlaceholderText("Enter password");

  const submit = getByPlaceholderText("Login");

  fireEvent.change(email, { target: { value: "yohan@x.com" } });

  fireEvent.change(password, { target: { value: "123456" } });

  fireEvent.click(submit);

  expect(email).toBeInTheDocument();

  expect(password).toBeInTheDocument();

  expect(submit).toBeInTheDocument();
});
