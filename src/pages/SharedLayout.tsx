import { Outlet } from "react-router";
import StyledNavbar from "../components/StyledNavbar";

const SharedLayout = () => {
  return (
    <div>
      <StyledNavbar />
      <Outlet />
    </div>
  );
};
export default SharedLayout;
