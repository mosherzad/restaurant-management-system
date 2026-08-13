import AddOrderForm from "./AddOrderForm";

type RightbarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

const Rightbar = ({ mobileOpen, onMobileClose }: RightbarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      />
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full max-h-screen w-full flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-[#141d2d] p-5 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <AddOrderForm onCloseMobile={onMobileClose} />
      </aside>

      <aside className="hidden lg:flex lg:fixed lg:top-0 lg:right-0 lg:z-30 lg:h-screen lg:w-90 lg:max-w-[100vw] lg:flex-col lg:overflow-y-auto lg:overscroll-contain lg:border-l lg:border-white/10 lg:bg-[#141d2d] lg:p-5 lg:shadow-2xl">
        <AddOrderForm />
      </aside>
    </>
  );
};

export default Rightbar;
