type LoaderProps = {
  isLoading: Boolean;
};
const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="z-10 w-[50px] aspect-square border-t-black border-2 border-b-slate-200 rounded-full animate-[spin_1s_linear_infinite]"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
