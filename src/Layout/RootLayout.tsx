import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import WithProtectedRoute from "../Routes/WithProtectedRoute";

const RootLayout = () => {
  return (
    <>
      <WithProtectedRoute>
        <Header />
        <section className="flex-1">
          <Outlet />
        </section>
      </WithProtectedRoute>
    </>
  );
};

export default RootLayout;
