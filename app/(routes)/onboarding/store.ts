import { create } from "zustand";

type OnboardingStoreState = {
  stage: "NAME" | "CREATE_ORG" | "INVITE_TEAM";
  name: string;
};

type Actions = {
  setStage: (stage: OnboardingStoreState["stage"]) => void;
  setName: (name: string) => void;
};

const useOnboardingStore = create<OnboardingStoreState & Actions>((set) => ({
  stage: "NAME",
  name: "",
  setStage: (stage) => set({ stage }),
  setName: (name) => set({ name }),
}));

export default useOnboardingStore;
