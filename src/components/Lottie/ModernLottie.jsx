import React from "react";

import image from "../opoc.json";
import Lottie from "lottie-react";

const ModernLottieComponent = () => {
    // Assume che 'image' sia un JSON di animazione Lottie
  
    return (
      <div className="absolute top-0 right-0 w-42 h-42 overflow-hidden opacity-70 pointer-events-none">
        <Lottie
          animationData={image}
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

export default ModernLottieComponent;