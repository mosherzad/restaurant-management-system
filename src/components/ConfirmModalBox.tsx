"use client";

interface ConfirmModalProps {
  isOpenConfirm: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpenConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpenConfirm) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl bg-[#0F172A] p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        <p className="mt-2 text-sm text-gray-400">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
