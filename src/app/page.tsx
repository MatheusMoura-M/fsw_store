"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return <div className="text-cyan-700">{data?.user?.name}</div>;
}
