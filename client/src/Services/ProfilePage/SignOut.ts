const handleSignOut = (navigate: Function) => {
  localStorage.clear();
  navigate("/");
};

export default handleSignOut;
