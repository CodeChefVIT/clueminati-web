import Router from "next/router";
import clueminati from "./../public/clueminatilogo.png";
import alien from "./../public/alien.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-image flex flex-col items-center">
      <div className="flex flex-col justify-between my-20 h-full">
        <div className="flex flex-col items-center">
          <Image src={clueminati} alt="" className="py-10" />
          <Image src={alien} alt="" className="py-10" />
        </div>
        <button
          onClick={() => Router.push("/login")}
          className="px-10 py-2 font-bold my-20 bg-[#3CCB25] hover:bg-[#3bcb25c9] rounded-2xl transition-all w-full mt-10"
        >
          Start Journey
        </button>
      </div>
    </div>
  );
}
