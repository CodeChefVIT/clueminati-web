import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Router from "next/router";
import { db } from "../firebase";

import Image from "next/image";
import leaderboard from "./../public/leaderboard.svg";
import qr from "./../public/qr.svg";
import dashboard from "./../public/dashboard.png";

function Dashboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const userUid = localStorage.getItem("uid");

    if (!userUid) {
      Router.push("/login");
      return;
    }

    async function fetchTeams() {
      try {
        const teamsCollection = collection(db, "teams");
        const teamsSnapshot = await getDocs(teamsCollection);

        const teamsData = [];
        teamsSnapshot.forEach((doc) => {
          const data = doc.data();
          teamsData.push({ name: data.name, score: data.score, uid: data.uid });
        });

        const team = teamsData.filter((team) => team.uid === userUid);
        setTeams(team);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen py-8 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center my-8 w-full">
          Dashboard
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {teams.map((team, index) => (
            <li
              key={index}
              className="bg-gray-900 py-5 px-20 w-full rounded-lg shadow-md transition flex flex-col items-center transform hover:scale-105"
            >
              <p className="text-2xl font-bold mb-10">Your Team</p>
              <p className="text-lg font-semibold">Name: {team.name}</p>
              <p className="text-lg">Score: {team.score}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-10 flex flex-col space-y-4">
        <div
          onClick={() => Router.push("/teams")}
          className="bg-gray-900 p-4 rounded-lg shadow-md transition flex flex-col items-center transform hover:scale-105"
        >
          <Image src={leaderboard} alt="Leaderboard" className="pb-10" />
          <button className="relative w-full px-6 py-3 text-lg font-bold bg-[#3CCB25] text-white rounded-lg hover:bg-[#3bcb25c9] focus:outline-none focus:ring focus:ring-[#3bcb25c9]">
            Leaderboard
          </button>
        </div>
        <div
          onClick={() => Router.push("/qr")}
          className="bg-gray-900 p-4 rounded-lg shadow-md transition flex flex-col items-center transform hover:scale-105"
        >
          <Image src={qr} alt="Scan QR" className="pb-10" />
          <button className="relative w-full px-6 py-3 text-lg font-bold bg-[#3CCB25] text-white rounded-lg hover:bg-[#3bcb25c9] focus:outline-none focus:ring focus:ring-[#3bcb25c9]">
            Scan QR
          </button>
        </div>
      </div>
      <div>
        <Image src={dashboard} alt="Dashboard" />
      </div>
    </div>
  );
}

export default Dashboard;
