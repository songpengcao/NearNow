import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "NearNow Control Room",
  description: "Manage the NearNow event catalogue and data pipeline.",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
