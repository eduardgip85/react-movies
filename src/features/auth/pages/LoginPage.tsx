import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginWithEmail } from "../services/auth.service";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleLogin(email: string, password: string) {
    try {
      setError("");
      await loginWithEmail(email, password);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="py-10">
      <AuthForm
        title="Login"
        buttonText="Login"
        onSubmit={handleLogin}
        footer={
          <>
            Don’t have an account?{" "}
            <Link to="/register" className="text-red-400 hover:underline">
              Register
            </Link>
          </>
        }
      />

      {error && (
        <p className="mx-auto mt-4 max-w-md rounded-lg bg-red-600/20 p-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}