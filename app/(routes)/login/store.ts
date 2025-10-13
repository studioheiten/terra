import { create } from "zustand";

type LoginStoreState = {
  email: string;
  verificationCode: string;
  isLoading: boolean;
  stage: "EMAIL" | "VERIFICATION_CODE";
};

type Actions = {
  setEmail: (email: string) => void;
  setVerificationCode: (code: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setStage: (stage: LoginStoreState["stage"]) => void;
};

const useLoginStore = create<LoginStoreState & Actions>((set) => ({
  email: "",
  verificationCode: "",
  isLoading: false,
  stage: "EMAIL",
  setEmail: (email) => set({ email }),
  setVerificationCode: (code) => set({ verificationCode: code }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setStage: (stage) => set({ stage }),
}));

export { useLoginStore };
