import { Navbar } from "@/components/Navbar";
import { Features } from "./_components/Features/Features";
import { GettingStarted } from "./_components/GettingStarted";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-mainOrange min-h-screen pt-20">
        <div className="container">
          <h1 className="text-white font-bold text-5xl text-center leading-relaxed">
            Take fast and lightweight quizzes using{" "}
            <span className="text-mainLightBlue">Quizzapp</span>
          </h1>

          <GettingStarted />

          <Features />
        </div>
      </main>
    </>
  );
}
