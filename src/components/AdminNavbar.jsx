
function AdminNavbar() {
  function logout() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("currentAdmin");
    window.location.href = "/";
  }

  return (
    <header className="main-header">
      <a href="/" className="header-logo">
        <img
          src="/legacy/images/logo.jpeg"
          alt="Home4Paws Logo"
        />
      </a>

      <nav className="main-nav">
        <a href="/admin-dashboard">Dashboard</a>
        <a href="/admin-pets">Manage Pets</a>
        <a href="/admin-dashboard#adoption">Adoption Requests</a>
        <a href="/admin-dashboard#grooming">Grooming Appointments</a>
        <a href="/" onClick={logout}>Logout</a>
      </nav>
    </header>
  );
}

export default AdminNavbar;
