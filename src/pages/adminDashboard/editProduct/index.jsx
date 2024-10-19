//import react utilitize
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//import axios which helps to fetch data;
import axios from "axios";

// toastify
import { toast } from "react-toastify";

//react icons
import { BiArrowBack } from "react-icons/bi";

const EditProduct = () => {
  const [title, setTitle] = useState();
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const backPrevPage = useNavigate();
  const { productId } = useParams();

  //getting products from api
  const gettingProducts = async () => {
    const res = await axios.get(
      `https://fakestoreapi.in/api/products/${productId}`
    );
    const data = res.data.product;
    setTitle(data.title);
    setUrl(data.image);
    setCategory(data.category);
    setPrice(data.price);
    setBrand(data.brand);
    setDescription(data.description);
  };

  useEffect(() => {
    gettingProducts();
  }, []);

  // making a product object with the slice of products data
  const productData = {
    title,
    price,
    url,
    brand,
    description,
    category,
  };

  // Function to update the product on the API
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://fakestoreapi.in/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData), // Convert state data to JSON string
        }
      );
      const result = await response.json();
      toast.success("Product updated successfully!", result);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="py-8 md:py-16 md:px-8 px-2 sm:px-4 w-full">
      <button
        onClick={() => backPrevPage("/adminDashboard/products")}
        className="flex items-center gap-2 ml-2 md:ml-8 lg:ml-52 mb-8 mt-20 text-sm font-semibold text-green-500"
      >
        <BiArrowBack />
        back to previous page
      </button>
      <div className="flex flex-col items-center">
        <div className="bg-gray-300 p-8 w-[85%] xsm:w-full sm:w-[70%] md:w-[60%] lg:w-[40%] text-gray-700">
          <h2 className="text-xl md:text-2xl mb-8 text-center">
            Edit Product
          </h2>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="py-2 px-2 rounded outline-none focus:outline-emerald-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="url">Image url:</label>
              <input
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows={8}
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-2 px-2 rounded outline-none focus:outline-emerald-300 focus:outline-1"
              ></textarea>
            </div>
            <button
              className="mt-6 py-2 bg-slate-600 text-lg  text-white"
              onClick={updateProduct}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
