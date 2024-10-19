//import React utilitize
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

//import context api file
import myContext from "../../context/myContext";

//import images
import loginImg from "../../assets/images/img1.jpg";

//import firebase utlitize for authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const context = useContext(myContext);
  const { setLoading } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    // signin functionality
    if (email == "" || password == "") {
      setErrorMessage("fields should not be empty!");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // storing registered user to local storage
        auth.onAuthStateChanged((data) => {
          localStorage.setItem("user", JSON.stringify(data));
        });
        toast.success("Login Successfull!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/");
        setLoading(false);
      } catch (error) {
        toast.error("Signin Failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <section className="px-4 py-12 md:py-16 container mx-auto text-gray-700">
      <div className="flex sm:h-[440px] mt-20">
        <div className="w-[60%] hidden md:block">
          <img src={loginImg} alt="" className="h-full" />
        </div>

        <div className="bg-slate-300 py-12 px-8 rounded w-full md:w-[40%]">
          <h2 className="text-2xl font-medium text-center mb-12">Login Now</h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
            />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
            />

            <span className="text-red-600 text-center mt-2 font-light"> {errorMessage} </span>

            <button
              type="submit"
              onClick={login}
              className="mx-auto bg-white px-6 py-2 rounded-sm font-medium mt-4"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center">
            {" Don't have an account?"}
            <Link to="/register" className="text-green-700 ml-1">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
