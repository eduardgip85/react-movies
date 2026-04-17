import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerWithEmail } from "../services/auth.service";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(email: string, password: string) {
    try {
      setError("");
      setMessage("");

      await registerWithEmail(email, password);

      setMessage(
        "Account created. Check your email if confirmation is required."
      );

      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Could not create the account.");
    }
  }

  return (
    <div className="py-10">
      <AuthForm
        title="Create account"
        buttonText="Register"
        onSubmit={handleRegister}
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 hover:underline">
              Login
            </Link>
          </>
        }
      />

      {message && (
        <p className="mx-auto mt-4 max-w-md rounded-lg bg-green-600/20 p-3 text-sm text-green-300">
          {message}
        </p>
      )}

      {error && (
        <p className="mx-auto mt-4 max-w-md rounded-lg bg-red-600/20 p-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}