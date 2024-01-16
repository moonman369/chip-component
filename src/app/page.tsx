"use client";
import Image from "next/image";
import Chip from "./components/Chip";

import { userData } from "./assets/userData.js";

export default function Home() {
  return (
    <main className="flex mt-20">
      <Chip items={userData} />
    </main>
  );
}
