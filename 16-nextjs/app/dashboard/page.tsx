import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import SideBar from "@/components/SideBar";

export default async function DashboardPage({ children }: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <SideBar currentPath={"/dashboard"} >
      {children}
    </SideBar >
  )

}