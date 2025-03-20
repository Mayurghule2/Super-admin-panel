import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { FcManager } from "react-icons/fc";
import { BsFillStarFill } from "react-icons/bs";
const CloudKitchenCard = ({ kitchen }) => {
  return (

    <Link to={`/cloud-kitchens/${kitchen.id}`} className="hover: shadow-xl">
      <div className="bg-gray-200 rounded-lg flex flex-col lg:flex-row justify-between items-center shadow-md hover:shadow-2xl duration-300 hover:scale-105 lg:pr-8 p-3 w-full">
  <div className="flex items-center gap-10 flex-col lg:flex-row w-full">
    <img
      src={kitchen.image}
      alt={kitchen.name}
      className="w-screen h-64 lg:w-64 lg:h-32 object-cover rounded-md"
    />
    <div className="flex flex-col w-full">
      <div className="flex items-center">
        <h2 className="text-xl font-bold mb-2">{kitchen.name}</h2>

        {/* Push rating to the right */}
        <div className="font-bold flex bg-orange-500 text-white rounded-md items-center gap-2 px-3 py-2 ml-auto">
          <BsFillStarFill />
          {kitchen.rating}
        </div>
      </div>

      <p className="text-md text-gray-600 flex items-center">
        <ImLocation2 /> {kitchen.city}, {kitchen.state}
      </p>
      <p className="text-md text-gray-700 flex items-center gap-1">
        <FcManager /> Administered by {kitchen.managerName}
      </p>
    </div>
  </div>

  {/* <div className="text-blue-500  mt-auto text-xs">
    <Link to={`/cloud-kitchens/${kitchen.id}`} className="">
      View More →
    </Link>
  </div> */}
</div>

    </Link>
  );
};

export default CloudKitchenCard;
