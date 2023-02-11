import "../styles/globals.css";
// import Spline from "@splinetool/react-spline";
import SplineBackground from "../components/SplineBackground";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="bg-light-blue">
      <head />
      <body className="bg-light-blue h-screen">
        <Navbar />
        <div className="flex">
          <div className="mt-4 mx-8 w-9/12">{children}</div>
          <div className="mt-4 h-screen w-full">
            <SplineBackground />
          </div>
        </div>
      </body>
    </html>
  );
}
