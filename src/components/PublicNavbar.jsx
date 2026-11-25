
function PublicNavbar() {
  return (
    <header className="main-header">
      <a href="/" className="header-logo">
        <img src="/legacy/images/logo.jpeg" alt="Home4Paws Logo" />
      </a>

      <nav className="main-nav">
        <a href="/">Home</a>
        <a href="/pets">Find a Pet</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
        <a href="/admin-login">Admin</a>
      </nav>
    </header>
  );
}

export default PublicNavbar;
