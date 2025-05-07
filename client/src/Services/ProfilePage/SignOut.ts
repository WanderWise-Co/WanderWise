const handleSignOut = (
  navigate: Function,
  setNavButton: (value: string) => void
) => {
  localStorage.clear();
  setNavButton("");
  navigate("/");
};

export default handleSignOut;
