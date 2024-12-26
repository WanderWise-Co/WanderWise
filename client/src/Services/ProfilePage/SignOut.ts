
const handleSignOut = (navigate:Function) => {
  localStorage.clear();
  navigate("/api/v1/home");
};

export default handleSignOut;
