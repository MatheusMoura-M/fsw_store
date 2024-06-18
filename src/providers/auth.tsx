"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

const AuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
