import React from "react";
import SettingsForm from "./SettingsForm";

const Page = async () => {
  return (
    <div className="w-full max-w-4xl px-6 py-10 flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-bold text-primary mb-4">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your LemonSqueezy store integration
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          Configure your store to become a seller
        </p>
      </div>

      <div className="w-full">
        {/* <- ensures full-width under same column */}
        <SettingsForm />
      </div>
    </div>
  );
};

export default Page;
