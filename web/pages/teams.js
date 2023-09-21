import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Router from "next/router";
import { db } from "../firebase";
import Image from "next/image";
import leaderboard from "./../public/leaderboard.png";

function TeamsPage() {
  const [team, setTeam] = useState([]);
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

        const sortedTeams = teamsData.sort((a, b) => b.score - a.score);
        setTeams(sortedTeams);

        const userTeam = sortedTeams.find((team) => team.uid === userUid);
        setTeam(userTeam ? [userTeam] : []);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen py-8 flex flex-col justify-center items-center ">
      <div className="w-full max-w-4xl p-4 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image src={leaderboard} alt="Leaderboard" />
          </div>
          <h1 className="text-3xl font-bold text-center my-4 w-full">
            My Team
          </h1>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {team.map((team, index) => (
              <li
                key={index}
                className="bg-gray-900 py-4 px-10 text-center w-full rounded-lg shadow-md transition flex flex-col items-center transform hover:scale-105 text-white"
              >
                <div className="bg-green-400 h-2 w-full mb-2"></div>
                <p className="text-2xl font-bold mb-2 w-full">Your Team</p>
                <p className="text-lg font-semibold w-full">
                  Name: {team.name}
                </p>
                <p className="text-lg w-full">Score: {team.score}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full max-w-4xl p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center my-2 w-full">
          Leaderboard
        </h1>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md transition flex flex-col items-center transform text-white">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {teams.map((team, index) => (
              <di className="flex flex-row items-center w-full justify-between">
                <div className="flex flex-row items-center w-full gap-x-10">
                  <p className="text-2xl font-semibold">{index + 1}</p>
                  <p className="text-lg font-semibold">{team.name}</p>
                </div>
                <p className="text-lg">{team.score}</p>
              </di>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamsPage;
