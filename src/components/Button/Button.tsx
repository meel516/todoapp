export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};
export const Button = ({ children, className, variant }: ButtonProps) => {
  return (
    <button
      className={`rounded-md border-none px-4 py-2 ${
        variant == "primary"
          ? "bg-blue-500 text-white"
          : "bg-gray-500 text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};
