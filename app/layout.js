import { Inter } from "next/font/google";
import LeagueSelect from "./components/leagueselect";
import '../public/background.jpg'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GVL Fantasy Football",
  description: "Stats for Nerds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gradient-to-r from-cyan-500 to-blue-500">
        <body className={inter.className}>
          {children}
        </body>
        {/* <LeagueSelect /> */}
    </html>
  );
}
