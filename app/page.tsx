import { redirect } from "next/navigation";

export default function Home() {
  // check for auth and redirect to login if not
  redirect("/home");
}
