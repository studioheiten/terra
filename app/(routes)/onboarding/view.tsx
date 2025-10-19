"use client";

import clsx from "clsx";
import useOnboardingStore from "./store";
import OnboardingProgressView from "./components/ProgressView";
import TextField from "@/components/primitives/TextField";
import { useMemo } from "react";
import { Button } from "@/components/primitives/Button";
import { ProgressView } from "@/components/misc/ProgressView";
import {
  checkOrgSlugExists,
  reauthenticateUser,
  setNameAndCreateUser,
} from "./lib";
import { toast } from "sonner";
import { createOrganization } from "@/lib/org/create-org";

export default function OnboardingView() {
  const {
    stage,
    setStage,
    firstName,
    lastName,
    setFirstName,
    setLastName,
    orgName,
    orgSlug,
    slugManuallySet,
    isLoading,
    setIsLoading,
  } = useOnboardingStore();

  const title = useMemo(() => {
    switch (stage) {
      case "NAME":
        return "Welcome to Terra.";
      case "CREATE_ORG":
        return `Hi there, ${firstName}!`;
    }
  }, [stage, firstName]);

  const subheadline = useMemo(() => {
    switch (stage) {
      case "NAME":
        return "Let's get you started with your account and workspace.";
      case "CREATE_ORG":
        return "Let's create your workspace.";
    }
  }, [stage]);

  const buttonText = useMemo(() => {
    return stage === "CREATE_ORG" ? "Finish" : "Next";
  }, [stage]);

  const buttonEnabled = useMemo(() => {
    switch (stage) {
      case "NAME":
        // Alphanumerics and spaces only
        const nameRegex = /^[a-zA-Z0-9\s]+$/;
        return (
          nameRegex.test(firstName.trim()) && nameRegex.test(lastName.trim())
        );
      case "CREATE_ORG":
        // Org name: alphanumerics and spaces only, max 32 chars
        const orgNameRegex = /^[a-zA-Z0-9\s]+$/;
        const orgNameValid =
          orgNameRegex.test(orgName.trim()) &&
          orgName.trim().length <= 32 &&
          orgName.trim().length > 0;

        // Org slug: lowercase alphanumerics and hyphens only, no spaces
        const orgSlugRegex = /^[a-z0-9-]+$/;
        const slugMaxLength = slugManuallySet ? 32 : 37;
        const orgSlugValid =
          orgSlugRegex.test(orgSlug.trim()) &&
          orgSlug.trim().length > 0 &&
          orgSlug.trim().length <= slugMaxLength;

        return orgNameValid && orgSlugValid;
      default:
        return false;
    }
  }, [stage, firstName, lastName, orgName, orgSlug, slugManuallySet]);

  const onClick = async () => {
    if (!buttonEnabled || isLoading) return;

    // In the NAME stage, set the user's name and move to CREATE_ORG
    if (stage == "NAME") {
      const fnameTrimmed = firstName.trim();
      const lnameTrimmed = lastName.trim();

      setFirstName(fnameTrimmed);
      setLastName(lnameTrimmed);

      await setNameAndCreateUser(fnameTrimmed, lnameTrimmed);

      setStage("CREATE_ORG");
      return;
    }

    // In the CREATE_ORG stage, create the organization and reauthenticate
    if (stage === "CREATE_ORG") {
      setIsLoading(true);

      // Check if the slug is already taken
      const slugTaken = await checkOrgSlugExists(orgSlug.trim());

      if (slugTaken) {
        setIsLoading(false);
        toast.error("This slug is already taken. Try something else!");
        return;
      }

      await createOrganization({
        name: orgName.trim(),
        slug: orgSlug.trim(),
      });

      await reauthenticateUser(); // Will cause a page reload; no need to redirect
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div
        className={clsx(
          "w-[28rem] max-w-[90%] flex flex-col gap-6 items-stretch justify-center",
          {
            "pointer-events-none": isLoading,
          }
        )}
      >
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

        <Button onClick={onClick} disabled={!buttonEnabled}>
          {isLoading ? <ProgressView /> : buttonText}
        </Button>
      </div>
    </div>
  );
}

function NameInput() {
  const { firstName, lastName, setFirstName, setLastName } =
    useOnboardingStore();

  return (
    <div className="flex flex-col gap-4">
      <TextField
        value={firstName}
        onChange={setFirstName}
        placeholder="Jeff"
        title="First Name"
      />
      <TextField
        value={lastName}
        onChange={setLastName}
        placeholder="Winger"
        title="Last Name"
      />
    </div>
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
