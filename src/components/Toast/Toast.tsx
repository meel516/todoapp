export interface Toasttypes {
  showToast: boolean;
  message: string;
  mode: "success" | "warning" | "error";
}
const Toast = ({ showToast, message, mode = "success" }: Toasttypes) => {
  return (
    <>
      {showToast && (
        <div className="fixed inset-0 bg-black/15 flex justify-center items-center">
        <div
          className={`p-10 bg-white rounded-md ${
            mode == "success"
              ? "shadow-green-500"
              : mode == "warning"
              ? "shadow-yellow-400"
              : "shadow-red-400"
          } shadow-lg`}
        >
          <h1 className="text-2xl">{message}</h1>
        </div>
        </div>
      )}
    </>
  );
};

export default Toast;
