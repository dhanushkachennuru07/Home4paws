
function UserNavbar() {
  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <header className="main-header">
      <a href="/" className="header-logo">
        <img src="/legacy/images/logo.jpeg" alt="Home4Paws Logo" />
      </a>

      <nav className="main-nav">
        <a href="/">Home</a>
        <a href="/pets">Find a Pet</a>
        <a href="/requests">My Requests</a>
        <a href="/grooming">Pet Grooming</a>
        <a href="/" onClick={logout}>Logout</a>
      </nav>
    </header>
  );
}

export default UserNavbar;
