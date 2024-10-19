const ProtectedUser = ({ children }) => {
  const user = localStorage.getItem("user");
  const loggedInUser = JSON.parse(user);

  if (loggedInUser) {
    return children;
  }
};

export default ProtectedUser;
