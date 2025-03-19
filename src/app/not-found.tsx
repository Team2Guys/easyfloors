import LottieCustom from "components/Lottie/error-gif";
import Link from "next/link";
import animationData from "../../public/assets/images//json/404.json"; 

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex flex-col items-center gap-4 relative">
        <LottieCustom data={animationData} /> 
        <h2 className="text-2xl xsm:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black -mt-10">
          There&apos;s <span className="uppercase">Nothing</span> here ...
        </h2>
        <p className="text-center px-2 xsm:px-0 text-10 xsm:text-12 sm:text-base md:text-lg lg:text-xl">
          ...maybe the page you are looking for is not found or never existed.
        </p>
        <div className="flex items-center gap-4 justify-center">
          <Link
            className="w-35 sm:w-40 h-10 sm:h-12 text-14 sm:text-base flex justify-center items-center rounded-full bg-primary text-white hover:bg-white border border-primary hover:text-primary transition"
            href="/"
          >
            Back to Home
          </Link>
          <Link
            className="w-35 sm:w-40 h-10 sm:h-12 text-14 flex justify-center items-center rounded-full bg-transparent text-primary hover:bg-primary border border-primary hover:border-primary hover:text-white transition"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
