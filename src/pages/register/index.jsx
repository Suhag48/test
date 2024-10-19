// import react utilitize
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// import firebase utilitize for authtentication
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

//import firebase utilitize from firebase config file
import { auth, fireDB } from "../../firebase/FirebaseConfig";

// image
import loginImg from "../../assets/images/story.jpg";
import { toast } from "react-toastify";
// import myContext from "../../context/myContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // not necessary now. will use as nessesity.
  // const context = useContext(myContext);
  // const { loading, setLoading } = context;

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    if (name == "" || email == "" || password == "") {
      setErrorMessage("fields should not be empty!");
    } else if (name.length < 5 || name.length > 10) {
      setErrorMessage("name should be 5-10 character!");
    } else if (!email.includes("@gmail.com")) {
      setErrorMessage("invalid email!");
    } else if (password.length < 5) {
      setErrorMessage("password should be at least 6 character!");
    } else {
      try {
        // create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // update users display name
        await updateProfile(user, { displayName: name });

        // add a document to the users collection in fireStore
        const usersCollection = collection(fireDB, "users");
        const userDoc = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
        };

        await addDoc(usersCollection, userDoc);

        // reset input field after completing registration
        setName("");
        setEmail("");
        setPassword("");
        toast.success("Registration successfull!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        toast.error("Registration failed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <section className="px-4 py-12 md:py-16 container mx-auto text-gray-700">
      <div className="flex h-[440px] mt-20">
        <div className="w-[60%] hidden md:block">
          <img src={loginImg} alt="loginImg" className="h-full" />
        </div>

        <div className="bg-slate-300 py-12 px-8 rounded w-full md:w-[40%]">
          <h2 className="text-2xl font-medium text-center mb-12">
            Register Now
          </h2>

          <form className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Name"
              className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-red-600 text-center mt-1 font-light">
              {" "}
              {errorMessage}{" "}
            </span>
            <button
              type="submit"
              className="mx-auto bg-white px-6 py-2 rounded-sm font-medium mt-3"
              onClick={signUp}
            >
              Register
            </button>
          </form>
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
