import { useEffect } from "react";

const Banner = ({ content, closeBanner }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      closeBanner();
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <h6>{content}</h6>
    </div>
  );
};

export default Banner;
