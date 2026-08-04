import Image from "next/image";
import SignUpForm from "@/components/SignUpForm";
const page = () => {
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
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
