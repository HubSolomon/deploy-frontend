import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../api";

const Register = () => {
  const [message, setMessage] = useState(null);

  const SignUpUser = async (data) => {
    try {
      const response = await API.post(`/user/register`, data);
      return response;
    } catch (error) {
      return error;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const res = await SignUpUser(data);
    console.log("res", res);
    reset();
    if (res.data.username) {
      setMessage("You successfully signed up");
    }
  };

  return (
    <div className="join">
      <div className="registration-container">
        <h2 className="registration-title">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              username:
            </label>
            <input
              type="text"
              placeholder="username"
              {...register("username", {})}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Email:
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", {})}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              placeholder="password"
              {...register("password", {})}
            />
          </div>

          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
        <h2>{message && message}</h2>
      </div>
    </div>
  );
};

export default Register;
