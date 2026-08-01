import Image from "next/image";
import Link from "next/link";
import { IoRestaurantOutline } from "react-icons/io5";
const Login = () => {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/bg3.jpg"
        alt="Background Image"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/80" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <form className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm z-50 shadow-2xl">
          <div className="mb-8 flex items-center justify-center flex-col">
            <h1 className="text-4xl text-orange-500">
              <IoRestaurantOutline />
            </h1>

            <h2 className="mt-4 text-3xl font-bold text-white">
              Restaurant System
            </h2>

            <p className="mt-2 text-gray-300">Sign in to continue</p>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-300">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
            />
          </div>

          <div className="mb-6 flex justify-end text-sm">
            <Link
              href={"/sign-up"}
              type="button"
              className="text-orange-400 hover:text-orange-500"
            >
              Already have an account? Sign In{" "}
            </Link>
          </div>

          <button className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-95">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
