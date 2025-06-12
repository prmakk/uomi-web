import React, { useState, useEffect} from "react";
import Lottie from "lottie-react";

const Load = () => {
    // Assume che 'image' sia un JSON di animazione Lottie
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://cdn.prod.website-files.com/67dc33e6ae7829543569cd55/67dc33e6ae7829543569d147_mode%20ponteiro-04.json"
          );
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error("Error fetching Lottie data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    // Render the Lottie animation
    // with the fetched data
  
    return (
      <div className="absolute top-10 right-5 w-[28%] overflow-hidden opacity-70 pointer-events-none">
        <Lottie
          animationData={data}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
        />
      </div>
    );
  };

export default Load;