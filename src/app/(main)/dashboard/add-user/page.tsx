import AddUserForm from "@/components/AddUserForm";
import Link from "next/link";
import { MdArrowBack, MdPersonAdd } from "react-icons/md";

const AddUserPage = () => {
  return (
    <div className="min-h-screen px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={"/dashboard"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <MdArrowBack size={22} />
            </Link>

            <div>
              <p className="mb-1 text-sm font-medium tracking-widest text-amber-500 uppercase">
                Administration
              </p>

              <h1 className="text-3xl font-semibold tracking-tight">
                Add New User
              </h1>

              <p className="mt-1 text-sm text-white/45">
                Create an account and assign a role.
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 sm:flex">
            <MdPersonAdd className="text-amber-400" size={24} />
          </div>
        </div>
        <AddUserForm />
      </div>
    </div>
  );
};

export default AddUserPage;
