// import react utilitize
import { useState } from "react";

// import images
import feedbackImg from "../../assets/images/img2.png";

// import firebase utilitize
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (name == "" || email == "" || title == "" || message == "") {
        setErrorMessage("Fields should not be empty!");
      } else if (email !== "" && !email.includes("@gmail.com")) {
        setErrorMessage("email is not correct!");
      } else {
        addDoc(collection(fireDB, "Message"), {
          user: name,
          email: email,
          title: title,
          message: message,
          time: Timestamp.now(),
        }).then(() => {
          setName("");
          setEmail("");
          setTitle("");
          setMessage("");
          toast.success(`Thank You "${name}" for your valuable feedback.`);
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="px-4 py-12 md:py-16 contianer mx-auto text-gray-700">
      <div
        className="flex h-[500px] mt-20
      "
      >
        <div className="lg:w-[60%] hidden lg:block">
          <img src={feedbackImg} alt="feedbackImg" className="h-full" />
        </div>

        <div className="bg-slate-200 py-4 px-8 rounded w-full lg:w-[40%]">
          <h2 className="font-medium text-lg">Feedback</h2>
          <p className="text-gray-500">We want to hear from you</p>

          <form className="flex flex-col gap-2 mt-4">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
            />
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="p-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
            />
            <textarea
              type="text"
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="p-2 rounded border-0 focus:outline-none focus:outline-emerald-300 focus:outline-1"
              rows="6"
            ></textarea>
            <span className="text-red-600 text-center text-sm mt-1">
              {" "}
              {errorMessage}{" "}
            </span>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mx-auto bg-white px-6 py-2 rounded-sm font-medium mt-1"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
