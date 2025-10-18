"use client";

import { useMemo } from "react";
import { Button } from "@/app/components/primitives/Button";
import useOnboardingStore from "./store";
import OnboardingProgressView from "./components/ProgressView";
import TextField from "@/app/components/primitives/TextField";

export default function OnboardingView() {
  const { stage, setStage, name, orgName, orgSlug, slugManuallySet } = useOnboardingStore();

  const title = useMemo(() => {
    switch (stage) {
      case "NAME":
        return "Welcome to Terra.";
      case "CREATE_ORG":
        return `Hi there, ${name}!`;
      case "INVITE_TEAM":
        return "Bring the rest of the team";
    }
  }, [stage]);

  const subheadline = useMemo(() => {
    switch (stage) {
      case "NAME":
        return "Let's get you started with your account and workspace.";
      case "CREATE_ORG":
        return "Let's create your workspace.";
      case "INVITE_TEAM":
        return "Terra is about the friends you made along the way";
    }
  }, [stage]);

  const buttonEnabled = useMemo(() => {
    switch (stage) {
      case "NAME":
        // Alphanumerics and spaces only
        const nameRegex = /^[a-zA-Z0-9\s]+$/;
        return nameRegex.test(name.trim());
      case "CREATE_ORG":
        // Org name: alphanumerics and spaces only, max 32 chars
        const orgNameRegex = /^[a-zA-Z0-9\s]+$/;
        const orgNameValid = orgNameRegex.test(orgName.trim()) && orgName.trim().length <= 32 && orgName.trim().length > 0;

        // Org slug: lowercase alphanumerics and hyphens only, no spaces
        const orgSlugRegex = /^[a-z0-9-]+$/;
        const slugMaxLength = slugManuallySet ? 32 : 37;
        const orgSlugValid = orgSlugRegex.test(orgSlug.trim()) && orgSlug.trim().length > 0 && orgSlug.trim().length <= slugMaxLength;

        return orgNameValid && orgSlugValid;
      default:
        return false;
    }
  }, [stage, name, orgName, orgSlug, slugManuallySet]);

  const onClick = async () => {
    if (!buttonEnabled) return;

    if (stage == "NAME") {
      setStage("CREATE_ORG");
      return;
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-[28rem] max-w-[90%] flex flex-col gap-6 items-stretch justify-center">
        <div className="flex items-center justify-center">
          <img src="/terra-logo.svg" className="w-8 h-8" />
        </div>

        <div className="flex flex-col gap-0 items-stretch justify-center text-center">
          <h2 className="text-h2 font-emphasised">{title}</h2>
          <p className="text-body text-label-secondary">{subheadline}</p>
        </div>

        <OnboardingProgressView />

        {stage === "NAME" && <NameInput />}
        {stage === "CREATE_ORG" && <OrgCreate />}
        {stage === "INVITE_TEAM" && <InviteTeam />}

        <Button onClick={onClick} disabled={!buttonEnabled}>
          Next
        </Button>
      </div>
    </div>
  );
}

function NameInput() {
  const { name, setName } = useOnboardingStore();

  return (
    <TextField
      value={name}
      onChange={setName}
      placeholder="Jeff Winger"
      title="What's your name?"
    />
  );
}

function OrgCreate() {
  const { orgName, setOrgName, orgSlug, setOrgSlug } = useOnboardingStore();
  return (
    <div className="flex flex-col gap-6 items-stretch justify-start">
      <TextField
        value={orgName}
        onChange={setOrgName}
        placeholder="Greendale Community College"
        title="Name your organization"
      />
      <TextField
        value={orgSlug}
        onChange={setOrgSlug}
        placeholder="greendale"
        prefix="https://app.buildwithterra.com/"
        title="Organization Slug"
      />
    </div>
  );
}

function InviteTeam() {
  const { teamEmailsList, setTeamEmailsList } = useOnboardingStore();

  return (
    <TextField
      value={teamEmailsList}
      onChange={setTeamEmailsList}
      placeholder="Emails, separated by commas"
      title="Invite your team"
    />
  );
}
