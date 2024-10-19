import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import myContext from "../../context/myContext";

import axios from "axios";

const AllProducts = () => {
  const context = useContext(myContext);
  const { addToCart, products, loadingMessage, setLoadingMessage } = context;

  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetching products for pagination
  // const gettingAllProducts = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://fakestoreapi.in/api/products?page=${currentPage}&limit=30`
  //     );
  //     setFilteredProducts(res.data.products);
  //     setLoadingMessage("Fetching Products!");
  //   } catch (error) {
  //     alert("Error fetching products:", error);
  //   }
  // };
  const gettingAllProducts = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.in/api/products?page=${currentPage}&limit=30`
      );
      setFilteredProducts(res.data.products); // Also update filteredProducts
      const totalProducts = res.data.totalProducts || 100; // Assuming the API might provide total products
      const totalPages = Math.ceil(totalProducts / 30); // Dynamically calculate total pages
      setTotalPages(totalPages);
      setLoadingMessage("Fetching Products!");
    } catch (error) {
      alert("Error fetching products:", error);
    }
  };

  // Fetching categories from API
  const gettingCategory = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.in/api/products/category"
      );
      let uniqueCategory = [...new Set(res.data.categories)];
      setCategory(["All", ...uniqueCategory]);
    } catch (error) {
      alert("Error fetching categories:", error);
    }
  };

  // useEffect to fetch products and categories on component mount
  useEffect(() => {
    gettingAllProducts();
    gettingCategory();
  }, [currentPage]);

  // useEffect to filter products based on selected category
  useEffect(() => {
    categoryBasedProducts();
  }, [selectedCategory, searchText, minPrice, maxPrice]);

  // Function to filter products based on selected category
  // const categoryBasedProducts = () => {
  //   let filtered = products;

  //   if (selectedCategory && selectedCategory !== "All") {
  //     filtered = products.filter((item) => item.category === selectedCategory);
  //     setLoadingMessage("No product found!");
  //   }

  //   // filter based on search text
  //   if (searchText) {
  //     filtered = filtered.filter((item) =>
  //       item.title.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   }

  //   // filter based on price range
  //   const min = parseFloat(minPrice) || 0;
  //   const max = parseFloat(maxPrice) || Infinity;
  //   filtered = filtered.filter(
  //     (item) => item.price >= min && item.price <= max
  //   );
  //   setFilteredProducts(filtered);
  // };
  const categoryBasedProducts = () => {
    let filtered = products;

    if (selectedCategory && selectedCategory !== "All") {
      filtered = products.filter((item) => item.category === selectedCategory);
    }

    // filter based on search text
    if (searchText) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // filter based on price range
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    filtered = filtered.filter(
      (item) => item.price >= min && item.price <= max
    );
    setFilteredProducts(filtered); // Don't forget to set the filtered products
    setLoadingMessage("No products found!")
  };

  // Handle search by input text
  const searchByInputText = () => {
    categoryBasedProducts();
  };

  // Handle search by price
  const searchByPrice = () => {
    categoryBasedProducts();
  };

  // Handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="px-2 sm:px-4 py-12 md:py-16 container mx-auto">
        <div className="flex flex-col items-center justify-center gap-4 mt-20 py-8 sm:py-16 bg-slate-300 rounded">
          {/* Category Dropdown */}
          <div>
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-gray-300 cursor-pointer focus:outline-none rounded-sm capitalize w-32 sm:w-40"
            >
              {/* Render categories dynamically */}
              {category.map((cate, index) => (
                <option
                  key={index}
                  value={cate}
                  className="text-gray-600 cursor-pointer"
                >
                  {cate}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Input Text */}
          <div className="flex flex-col sm:flex-row gap-4 text-gray-700">
            <input
              type="text"
              name="searchText"
              id="searchText"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search your product"
              className="p-2 rounded-sm w-32 sm:w-40 md:w-80 focus:outline-none"
            />
            <button
              type="submit"
              onClick={searchByInputText}
              className="bg-slate-400 py-2 md:py-1 rounded-sm px-6 text-gray-100"
            >
              Search
            </button>
          </div>

          {/* Search by Price */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 text-gray-700">
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Minimum price"
              className="p-2 rounded-sm w-32 sm:w-40 focus:outline-none"
            />
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Maximum price"
              className="p-2 rounded-sm w-32 sm:w-40 focus:outline-none"
            />
            <button
              type="submit"
              onClick={searchByPrice}
              className="bg-slate-400 py-2 md:py-1 rounded-sm px-6 text-gray-100"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Displaying Products */}
      <div className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-8">
        {filteredProducts.length ? (
          filteredProducts.map((item, index) => (
            <div
              key={index}
              className="border-2 shadow-sm rounded bg-[#fafafa] w-36 md:w-52 h-auto py-1"
            >
              <div className="mb-2 overflow-hidden">
                <Link to={`/productdetails/${item.id}`}>
                  <img
                    src={item.image}
                    alt="product"
                    className="w-auto h-24 md:h-32 rounded cursor-pointer duration-500 mx-auto"
                  />
                </Link>
              </div>
              <div className="text-sm md:text-base flex flex-col gap-2 p-2 text-gray-700">
                <h3 className="capitalize">{item.title.slice(0, 22)}</h3>
                <h4 className="text-gray-700">
                  Discount: {item.discount > 0 ? item.discount : "0"}%
                </h4>
                <h4 className="text-gray-700">Price: ${item.price}</h4>
                <button
                  onClick={() => addToCart(item)}
                  className="rounded bg-slate-400 w-full xsm:w-1/2 text-center py-2 cursor-pointer mt-1 md:mt-2 text-white"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="font-medium text-gray-600 pb-16"> {loadingMessage} </p>
        )}
      </div>

      {/* Pagination Buttons */}
      {filteredProducts.length ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 pb-8 md:pb-16 md:px-24 mx-auto mt-16">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-slate-400 w-16 sm:w-24 py-2 rounded-sm text-white text-sm sm:text-base"
          >
            Previous
          </button>
          <span className="sm:px-8 sm:font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-slate-400 w-16 sm:w-24 py-2 rounded-sm text-white text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AllProducts;
