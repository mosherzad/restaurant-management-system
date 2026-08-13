import SignUpForm from "@/components/SignUpForm";
const page = () => {
  return (
    <main className="relative overflow-hidden bg-[#0b0a08] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/registration.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      <SignUpForm />
    </main>
  );
};

export default page;
