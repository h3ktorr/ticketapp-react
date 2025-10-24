import { create } from "zustand";

export const useSession = create((set) => ({
  session: JSON.parse(localStorage.getItem("ticketapp_session") || "null"),
  setSession: (s) => {
    localStorage.setItem("ticketapp_session", JSON.stringify(s));
    set({ session: s });
  },
  clearSession: () => {
    localStorage.removeItem("ticketapp_session");
    set({ session: null });
  },
}));
