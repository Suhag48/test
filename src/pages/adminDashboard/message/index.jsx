//import react utilitize
import { useEffect, useState, useContext } from "react";

// import context api utilitize
import myContext from "../../../context/myContext";

// import firebase utilitize
import { fireDB } from "../../../firebase/FirebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";

const Message = () => {
  const [messages, setMessages] = useState([]);

  // getting context api data
  const { loadingMessage } = useContext(myContext);

  // getting user messages from firebase
  const getMessages = () => {
    const q = query(collection(fireDB, "Message"));
    onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section>
      {messages.length ? (
        messages.map((data, index) => {
          return (
            <div
              key={index}
              className="bg-gray-300 px-8 py-8 mb-4 text-gray-700"
            >
              <div className="mb-10">
                <h5 className="mb-1 flex items-center gap-2">
                  <span className="text-gray-900 font-medium">From:</span>
                  <span>
                    {data.data.user}
                  </span>
                </h5>
                <h5 className="mb-1 flex items-center gap-2">
                  <span className="text-gray-900 font-medium">Mail:</span>
                  <span>
                    {data.data.email}
                  </span>
                </h5>
              </div>
              <div className="text-justify">
                <h5 className="mb-1 flex items-center gap-2">
                  <span className="text-gray-900 font-medium">Title:</span>
                  <span>
                    {data.data.title}
                  </span>
                </h5>
                <p>
                  {" "}
                  <span className="text-gray-900 font-medium mr-2">Message:</span>
                  <span className="leading-7">
                    {data.data.message}{" "}
                  </span>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p className="md:text-lg text-gray-700 text-center my-[50%] md:my-[25%] lg:my-[20%] flex items-center justify-center">
          {loadingMessage}
        </p>
      )}
    </section>
  );
};

export default Message;
