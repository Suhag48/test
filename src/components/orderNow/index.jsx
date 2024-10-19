import { useState } from "react";
import { collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, } from "firebase/firestore";

const OrderNow = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  console.log(phone.length)

  const order = async (e) => {
    e.preventDefault();

    if (name == "" || phone == "" || address == "") {
      setErrorMessage("fields should not be empty!");
    } else if (name.length < 5 || name.length > 10) {
      setErrorMessage("name should be 5-10 character!");
    } else if (phone.length !== 11) {
      setErrorMessage("invalid phone number!");
    }
     else {
      
      try {
        // add a document to the users collection in fireStore
        const usersCollection = collection(fireDB, "order");
        const userDoc = {
          name,
          phone,
          address,
          CreateAt: new Date(),
        };

        await addDoc(usersCollection, userDoc);

        // reset input field after completing registration
        setName("");
        setPhone("");
        setAddress("");
        alert("order successfull!");
        
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <section className="container mx-auto py-8 md:py-16 px-4 w-1/3">
      
      <div className="flex flex-col gap-3 bg-slate-300 px-6 py-8 ">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
        />
        <input
          type="number"
          placeholder="phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
        />
        <textarea
          name="address"
          id="address"
          rows={4}
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
        ></textarea>
        <p className="mt-1 text-sm text-red-700"> {errorMessage} </p>
        <button
          onClick={order}
          className="px-4 py-2 bg-slate-400 mt-4 text-lg font-medium"
        >
          Order
        </button>
      </div>
    </section>
  );
};

export default OrderNow;
