const ProtectedAdmin = ({ children }) => {
  const user = localStorage.getItem("user");
  const loggedInUser = JSON.parse(user);

  if (loggedInUser.email === "suhagrana.q@gmail.com") {
    return children;
  }
};

export default ProtectedAdmin;
