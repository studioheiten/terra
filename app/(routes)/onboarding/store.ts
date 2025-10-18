import { create } from "zustand";

type OnboardingStoreState = {
  stage: "NAME" | "CREATE_ORG" | "INVITE_TEAM";
  name: string;
  orgName: string;
  orgSlug: string;
  teamEmailsList: string;
  slugManuallySet: boolean;
  randomSuffix: string;
};

type Actions = {
  setStage: (stage: OnboardingStoreState["stage"]) => void;
  setName: (name: string) => void;
  setOrgName: (orgName: string) => void;
  setOrgSlug: (orgSlug: string) => void;
  setTeamEmailsList: (teamEmailsList: string) => void;
  setSlugManuallySet: (slugManuallySet: boolean) => void;
};

const useOnboardingStore = create<OnboardingStoreState & Actions>((set, get) => {
  const randomSuffix = Math.random().toString(36).substring(2, 6);

  return {
    stage: "NAME",
    name: "",
    orgName: "",
    orgSlug: "",
    teamEmailsList: "",
    slugManuallySet: false,
    randomSuffix,
    setStage: (stage) => set({ stage }),
    setName: (name) => set({ name }),
    setOrgName: (orgName) => {
      set({ orgName });
      // Auto-generate slug if not manually set
      if (!get().slugManuallySet && orgName.trim()) {
        const slug = orgName
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        set({ orgSlug: `${slug}-${get().randomSuffix}` });
      }
    },
    setOrgSlug: (orgSlug) => {
      set({ orgSlug, slugManuallySet: true });
    },
    setTeamEmailsList: (teamEmailsList) => set({ teamEmailsList }),
    setSlugManuallySet: (slugManuallySet) => set({ slugManuallySet }),
  };
});

export default useOnboardingStore;
