import axios from "axios";
import { setAuthentication } from "../helpers/auth";

export const signup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("http://localhost:5001/register", data);

  return response;
};

export const signin = async (data) => {
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  console.log("Data", data);
  const response = await axios.post("http://localhost:5001/login", data);
  console.log("response Data", response);
  setAuthentication(response.data);
  console.log("responseEEE", response.data);

  return response;
};

//Staff Signup
export const staffSignup = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post("http://localhost:5001/staff/save", data);

  return response;
};
