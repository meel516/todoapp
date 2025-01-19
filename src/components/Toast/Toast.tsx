import React from "react";

export interface ToastTypes {
  showToast: boolean;
  message: string;
  mode?: "success" | "warning" | "error";
}

const Toast: React.FC<ToastTypes> = ({
  showToast,
  message,
  mode = "success",
}) => {
  if (!showToast) return null;

  const getShadowClass = () => {
    switch (mode) {
      case "success":
        return "shadow-green-500";
      case "warning":
        return "shadow-yellow-500";
      case "error":
        return "shadow-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className={`p-8 bg-white max-w-md mx-auto bg-gradient-to-r rounded-xl ${getShadowClass()} shadow-xl transition-all duration-500 transform scale-95 hover:scale-100`}
        style={{
          animation: "fadeIn 0.5s ease-out, slideIn 0.5s ease-out",
        }}
      >
        <h1 className="text-lg font-medium text-center text-blue-300">
          {message}
        </h1>
      </div>
    </div>
  );
};

export default Toast;
