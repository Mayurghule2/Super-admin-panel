import { useParams } from "react-router-dom";
import kitchens from "../data/kitchensData"; // Import kitchens data
import PopularDish from "../components/PopularDish";
import { IoLocation } from "react-icons/io5";
import { FcManager } from "react-icons/fc";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import Review from "../components/Review";
import {Link} from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5";


const KitchenDetails = () => {
  const { id } = useParams();
  const kitchen = kitchens.find((k) => k.id === parseInt(id));

  if (!kitchen) {
    return <p className="text-gray-500">Kitchen not found.</p>;
  }

  return (
    <div className="">
      <div>
      <Link to="/cloud-kitchens" className="text-3xl px-4 py-2 text-black">
        <IoArrowBackOutline />
      </Link>
      </div>
      <div className="p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-20 ">
        <div>

          <img src={kitchen.image} alt={kitchen.name} className="w-80 h-64 object-cover rounded-md shadow-lg" />
        </div>
        <div className="">

          <h1 className="text-3xl font-bold mb-5 mt-5">{kitchen.name}</h1>
          <p className="text-gray-600 text-lg mb-1 flex items-center gap-2">Manager ID: {kitchen.managerId}</p>
          <p className="text-gray-600 text-lg mb-1 flex items-center gap-2">Cloud Kitchen ID: {kitchen.cloudKitchenId} </p>
          <p className="text-gray-600 text-lg mb-1 flex items-center gap-2">
            <IoLocation />
            Address: {kitchen.address}, {kitchen.city}, {kitchen.state}</p>
          <p className="text-gray-600 text-lg mb-1 flex items-center gap-2"> <FcManager /> Administrated by {kitchen.managerName}</p>
          <p className="text-gray-600 text-lg mb-1 flex items-center gap-2"><FaRegThumbsUp /> Rating: ⭐ {kitchen.rating}</p>
          <p className="text-gray-600 text-lg flex items-center gap-2"> <FaCalendarAlt /> Operating Time: {kitchen.timing}</p>
        </div>
      </div>

      <div className="">
        <div className="text-center mt-5 text-3xl font-bold">
          <h1>Most Popular Dishes</h1>
          <PopularDish kitchenId={id} />
        </div>
        <div className="p-0 md:p-5">
        <Review />
        </div>
      </div>
    </div>
  );
};

export default KitchenDetails;
