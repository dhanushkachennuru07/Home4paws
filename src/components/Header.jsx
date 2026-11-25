import UserNavbar from "./UserNavbar";
import AdminNavbar from "./AdminNavbar";
import PublicNavbar from "./PublicNavbar";
function Header() {
  const isAdmin =
    localStorage.getItem("adminLoggedIn") === "true";

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (isAdmin) {
    return <AdminNavbar />;
  }

  if (user) {
    return <UserNavbar />;
  }

  return <PublicNavbar />;
}

export default Header;
