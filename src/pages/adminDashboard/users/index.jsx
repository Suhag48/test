// import react utilitize
import { useEffect, useState, useContext } from "react";

// import context api utilitize
import myContext from "../../../context/myContext";

// import firebase utilitize from firebase firestore
import { collection, onSnapshot, query } from "firebase/firestore";

// import firebase database from firebase config file
import { fireDB } from "../../../firebase/FirebaseConfig";

const Users = () => {
  const [users, setUsers] = useState([]);

  // getting data from context api
  const { loadingMessage } = useContext(myContext);

  // getting registered users from firebase
  const gettingUsers = () => {
    const q = query(collection(fireDB, "users"));
    onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    gettingUsers();
  }, []);

  return (
    <section className="p-8 bg-gray-300 text-gray-700 h-[500px]">
      <h2 className="text-center text-2xl font-medium">Registerd Users</h2>

      {users.length ? (
        <table className="table-auto w-full border border-black cursor-pointer overflow-x-scroll mt-8">
          <thead>
            <tr className="border border-black w-full">
              <th className="border border-black py-2 font-medium">S.No</th>
              <th className="border border-black py-2 font-medium">Name</th>
              <th className="border border-black py-2 font-medium">Email</th>
              <th className="border py-2 font-medium hidden lg:block">Uid</th>
            </tr>
          </thead>
          <tbody className="text-center text-base">
            {users.map((data, index) => {
              const { name, email, uid } = data.data;
              return (
                <tr key={index} className="border border-black w-full">
                  <td className="border border-black py-3"> {index + 1} </td>
                  <td className="border border-black py-3"> {name} </td>
                  <td className="border border-black py-3"> {email} </td>
                  <td className="border py-3 hidden lg:block"> {uid} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="md:text-lg text-gray-700 text-center h-full w-full flex items-center justify-center">
          {loadingMessage}
        </p>
      )}
    </section>
  );
};

export default Users;
