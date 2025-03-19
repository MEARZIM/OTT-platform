
const Home = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  return (
    <div className="container">
      <h1>OAuth Authentication</h1>
      <button onClick={handleLogin} className="login-btn">
        Sign in with Google
      </button>
    </div>
  );
};

export default Home;
