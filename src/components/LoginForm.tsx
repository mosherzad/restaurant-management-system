"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa";
import { MdFoodBank, MdOutlineEmail } from "react-icons/md";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields required");
    }

    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      await res.json();

      if (!res.ok) throw new Error("something went wrong");

      toast.success("Welcome back!");

      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-4 text-center">
          <div className="mb-3 flex items-center justify-center cursor-pointer space-x-1 text-2xl font-bold text-white">
            <MdFoodBank className="text-[#EC6D13]" size={30} />
            Fair<span className="text-[#EC6D13]">Plate</span>
          </div>{" "}
          <p className="text-sm tracking-[0.25em] text-amber-400/80 uppercase">
            Restaurant Management
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0F172A]/45 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
          <div className="mb-7">
            <h2 className="text-2xl text-white">Welcome back</h2>

            <p className="mt-2 text-sm text-white/50">
              Sign in to manage your restaurant
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white/70"
              >
                Email address
              </label>

              <div className="relative">
                <MdOutlineEmail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC6D13]"
                />

                <input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-amber-400/30"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/70"
                >
                  Password
                </label>

                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors duration-200 hover:text-white"
                >
                  <span>Don&apos;t have an account?</span>
                  <span className="font-medium text-amber-400 transition-colors group-hover:text-amber-300">
                    Sign up
                  </span>
                </Link>
              </div>

              <div className="relative">
                <FaLock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EC6D13]"
                />

                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-400/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-amber-400/30"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-amber-400"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-amber-500"
              />

              <label htmlFor="remember" className="text-sm text-white/50">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="group relative h-12 w-full overflow-hidden rounded-xl bg-[#EC6D13] font-semibold text-black transition hover:bg-amber-400"
            >
              <span className="relative z-10">Sign in</span>

              <div className="absolute inset-0 -translate-x-full bg-amber-300 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-white/30">Secure access</span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-xs leading-relaxed text-white/35">
            Authorized restaurant staff only.
            <br />
            Your session is protected with secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
