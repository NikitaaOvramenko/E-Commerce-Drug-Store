// SignUp.jsx
import axios from "axios";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function RegistrationPage() {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);
  const [error, setError] = useState("");
  const [submissionCheck, setSubmissionCheck] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFun: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFun(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const passConf = formData.get("password-confirm");

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      role: "USER",
    };

    // ✔ Password match check
    if (data.password !== passConf) {
      setErrorCheck(true);
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth/register", data);

      console.log(res.data);
      setSubmissionCheck(true);
      form.reset();
    } catch (err: any) {
      setErrorCheck(true);
      setError(err.response?.data || "Server error");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border"
                placeholder="Email address"
              />
            </div>

            {/* Password */}
            <div>
              <input
                onChange={(e) => handleChange(e, setPassword)}
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border"
                placeholder="Password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <input
                onChange={(e) => handleChange(e, setPasswordConf)}
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border"
                placeholder="Confirm Password"
              />
            </div>

            {passwordConf !== "" && password !== passwordConf && (
              <Alert severity="error">Passwords do not match!</Alert>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
              I agree to the Terms & Conditions
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group relative w-full py-2 px-4 text-white bg-indigo-600 rounded-md"
          >
            Sign Up
          </button>
        </form>

        {/* Link + Error */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>

          {errorCheck && <Alert severity="error">{error}</Alert>}
          {submissionCheck && (
            <Alert severity="success">Registration successful!</Alert>
          )}
        </div>
      </div>
    </div>
  );
}
