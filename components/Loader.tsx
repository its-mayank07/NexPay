const Loader = () => {
  return (
    <>
      <style>{`
        .loader-wrapper {
          width: 200px;
          height: 60px;
          position: relative;
          background: transparent;
        }

        .circle {
          width: 20px;
          height: 20px;
          position: absolute;
          border-radius: 50%;
          background-color: #fff;
          left: 15%;
          transform-origin: 50%;
          animation: circle7124 0.5s alternate infinite ease;
        }

        .circle:nth-child(2) {
          left: 45%;
          animation-delay: 0.2s;
        }

        .circle:nth-child(3) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }

        @keyframes circle7124 {
          0% {
            top: 60px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
          }

          40% {
            height: 20px;
            border-radius: 50%;
            transform: scaleX(1);
          }

          100% {
            top: 0%;
          }
        }

        .shadow {
          width: 20px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.9);
          position: absolute;
          top: 62px;
          transform-origin: 50%;
          z-index: -1;
          left: 15%;
          filter: blur(1px);
          animation: shadow046 0.5s alternate infinite ease;
        }

        .shadow:nth-child(4) {
          left: 45%;
          animation-delay: 0.2s;
        }

        .shadow:nth-child(5) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }

        @keyframes shadow046 {
          0% {
            transform: scaleX(1.5);
          }

          40% {
            transform: scaleX(1);
            opacity: 0.7;
          }

          100% {
            transform: scaleX(0.2);
            opacity: 0.4;
          }
        }
      `}</style>

      <div className="loader-wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </>
  );
};

export default Loader;
