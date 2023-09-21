import { useState } from "react";
import { app } from "./../firebase";
import { FaUser, FaLock } from "react-icons/fa";
import Router from "next/router";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Login from "./../public/login.png";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [text, setText] = useState("Login");

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      setText("Logging in...");
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", result.user.uid);
      setText("Login");

      Router.push("/dashboard");
    } catch (err) {
      setText("Login");
      const errorCode = err.code;
      let errorMessage = "An error occurred. Please try again.";

      if (errorCode === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (errorCode === "auth/user-not-found") {
        errorMessage = "User not found. Please check your email.";
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 shadow-md rounded-lg w-80">
        <Image src={Login} alt="" className="py-10" />
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <span className="text-gray-500">
                <FaUser />
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent pl-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center border rounded-md px-3 py-2">
              <span className="text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-3  bg-transparent  outline-none "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="px-10 py-2 font-bold my-10 bg-[#3CCB25] hover:bg-[#3bcb25c9] rounded-2xl transition-all w-full mt-10"
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
