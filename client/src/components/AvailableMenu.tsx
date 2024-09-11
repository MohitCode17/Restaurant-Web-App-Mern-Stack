import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const AvailableMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-6">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, index) => (
          <Card
            key={index}
            className="lg:w-64 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_-Ub42KZz087jrURk21XbQQ1mPW0Y5k_pihtn68-TfJATw-danjEHf0K-EWQieLu9QM&usqp=CAU"
              alt=""
              className="w-full h-40 object-cover"
            />

            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Sahi Rasgullas
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Bengali soft and sweet rasgullas
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹450</span>
              </h3>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  navigate("/cart");
                }}
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;

// <Card className="max-w-64 mx-auto shadow-lg rounded-lg overflow-hidden">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_-Ub42KZz087jrURk21XbQQ1mPW0Y5k_pihtn68-TfJATw-danjEHf0K-EWQieLu9QM&usqp=CAU"
//               alt=""
//               className="w-full h-40 object-cover"
//             />
//             <CardContent className="p-4">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                 Sahi Rasgullas
//               </h2>
//               <p className="text-sm text-gray-600 mt-2">
//                 Bengali soft and sweet rasgullas
//               </p>
//               <h3 className="text-lg font-semibold mt-4">
//                 Price: <span className="text-[#D19254]">₹450</span>
//               </h3>
//             </CardContent>
//             <CardFooter className="p-4">
//               <Button
//                 onClick={() => {
//                   navigate("/cart");
//                 }}
//                 className="w-full bg-orange hover:bg-hoverOrange"
//               >
//                 Add to Cart
//               </Button>
//             </CardFooter>
//           </Card>
