import { useState } from "react";

const CustomerReview = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const cardData = [
    {
      title: "Unlock Your Creative Flow",
      image:
        "https://images.unsplash.com/photo-1543487945-139a97f387d5?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Design Your Digital Future",
      image:
        "https://images.unsplash.com/photo-1529254479751-faeedc59e78f?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Build with Passion, Ship with Pride",
      image:
        "https://images.unsplash.com/photo-1618327907215-4e514efabd41?w=1200&auto=format&fit=crop&q=60",
    },
    {
      title: "Think Big, Code Smart",
      image:
        "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=1200&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <>
      <style>{`
                    .marquee-inner {
                        animation: marqueeScroll linear infinite;
                    }
    
                    @keyframes marqueeScroll {
                        0% {
                            transform: translateX(0%);
                        }
    
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                `}</style>

      <div className="my-14">
        <div className="flex flex-col items-end w-max mb-10">
          <p className="text-2xl font-medium uppercase">Customer Support</p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>

        <div
          className="overflow-hidden w-full relative mx-auto"
          onMouseEnter={() => setStopScroll(true)}
          onMouseLeave={() => setStopScroll(false)}
        >
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F5F7FF] to-transparent" />
          <div
            className="marquee-inner flex w-fit"
            style={{
              animationPlayState: stopScroll ? "paused" : "running",
              animationDuration: cardData.length * 2500 + "ms",
            }}
          >
            <div className="flex">
              {[...cardData, ...cardData].map((card, index) => (
                <div
                  key={index}
                  className="w-80 mx-4 h-[30rem] relative group hover:scale-90 transition-all duration-300"
                >
                  <img
                    src={card.image}
                    alt="card"
                    className="w-full h-full object-cover"
                  />
                  <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                    <p className="text-white text-xl font-semibold text-center">
                      {card.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#F5F7FF] to-transparent" />
        </div>
      </div>
    </>
  );
};

export default CustomerReview;
