export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "primary" | "secondary";
};
export const Button = ({
  children,
  className,
  variant,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`rounded-md border-none px-4 py-2 disabled:opacity-20 ${
        variant == "primary"
          ? "bg-blue-500 text-white"
          : "bg-gray-500 text-white"
      } ${className}`}
    >
      {children}
    </button>
  );
};
