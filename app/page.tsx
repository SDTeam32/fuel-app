import Image from "next/image";
import FuelQuote from "../components/FuelQuote";

export default function Home() {
  return (
    <a
      className="relative block group"
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative", // Ensure the container has relative positioning
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        style={{ zIndex: -1 }} // Ensure the overlay is behind the image
      ></div>

      {/* Image */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
        <Image
          src="/images/background.jpg"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 rounded-md p-10 flex flex-col items-center justify-center">
          <div className="text-center mb-4">Get your Fuel Quote Today</div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </div>
      </div>
    </a>

  );
}
