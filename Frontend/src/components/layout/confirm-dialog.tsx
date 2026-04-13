interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    hideCancel?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export default function ConfirmDialog({
    open,
    title = "Are you sure?",
    message = "Please confirm this action.",
    confirmLabel = "Yes",
    cancelLabel = "No",
    hideCancel = false,
    onConfirm,
    onCancel,
    isLoading = false
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
        >
            <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-6">
                <h3 id="confirm-dialog-title" className="text-lg font-bold text-slate-900">
                    {title}
                </h3>
                <p id="confirm-dialog-message" className="mt-2 text-sm text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex items-center justify-end gap-3">
                    {!hideCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            disabled={isLoading}
                        >
                            {cancelLabel}
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-70"
                        disabled={isLoading}
                    >
                        {isLoading ? "Please wait..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
