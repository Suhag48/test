// import react icons
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

//import react utilitize
import { useContext } from "react";
import { Link } from "react-router-dom";

//import context api file
import myContext from "../../../context/myContext";

const ShowProducts = () => {
  // import data from context api
  const context = useContext(myContext);
  const { products, deleteProduct, loadingMessage } = context;

  // reducing title size
  const concateTitle = (title) => {
    return title.slice(0, 35);
  };

  return (
    <section className="px-4 py-8 md:p-8 min-h-[500px] bg-gray-300 text-gray-700">
      <h2 className="text-center text-2xl font-medium">Products</h2>

      {/* showing products dynamically */}
      {products.length ? (
        <table className="table-auto w-full border border-black cursor-pointer mt-8">
          <thead>
            <tr className="border border-black w-full">
              <th className="border border-black py-3 font-medium">S.No</th>
              <th className="border border-black py-3 font-medium">Image</th>
              <th className="border border-black py-3 font-medium">Title</th>
              <th className="border border-black py-3 font-medium">Category</th>
              <th className="border border-black py-3 font-medium">Price</th>
              <th className="border border-black py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              const { id, image, title, category, price } = item;
              return (
                <tr
                  key={index}
                  className="border border-black w-full text-sm md:text-base text-center"
                >
                  <td className="border border-black py-1"> {id} </td>
                  <td className="border py-1 px-1 lg:px-0 flex justify-center items-center">
                    <img src={image} alt="" className="w-16 h-14" />
                  </td>
                  <td className="border border-black py-1">
                    {concateTitle(title)}
                  </td>
                  <td className="border border-black py-1">{category}</td>
                  <td className="border border-black py-1">{price}</td>
                  <td className="border border-black py-1">
                    <button className="md:mr-3 mr-1">
                      <Link to={`/editProduct/${id}`}>
                        <CiEdit size={20} />
                      </Link>
                    </button>
                    <button onClick={() => deleteProduct(id)}>
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="md:text-lg text-gray-700 text-center my-[50%] md:my-[25%] lg:my-[20%] flex items-center justify-center">
          {loadingMessage}
        </p>
      )}
    </section>
  );
};

export default ShowProducts;
