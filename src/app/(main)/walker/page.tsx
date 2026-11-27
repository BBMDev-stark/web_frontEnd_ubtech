import type { Metadata } from "next";
import HomePage from "../home-page";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.ubtechvietnam.edu.vn/" },
};

export default function Page() {
  return <HomePage />;
}
