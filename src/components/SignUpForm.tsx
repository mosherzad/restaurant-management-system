"use client";
import Link from "next/link";
import { useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields required");
    }

    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      await res.json();

      if (!res.ok) throw new Error("something went wrong");

      toast.success("Account created successfully");

      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };
  return (
    <form
      onSubmit={handleSignUp}
      className="z-50 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-sm"
    >
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl text-orange-500">
          <IoRestaurantOutline />
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">Create Account</h2>

        <p className="mt-2 text-gray-300">Sign up to manage your restaurant</p>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm text-gray-300">Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm text-gray-300">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm text-gray-300">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
        />
      </div>

      <div className="mb-6 flex justify-end text-sm">
        <Link
          href="/login"
          className="text-orange-400 transition hover:text-orange-500"
        >
          Already have an account? Sign In
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-95"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignUpForm;
