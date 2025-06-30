"use client";

import { useState } from "react";
import { updateUserLemonSqueezySettings } from "@/actions/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Store, Key } from "lucide-react"; // optional icons

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    lemonSqueezyApiKey: "",
    lemonSqueezyStoreId: "",
    lemonSqueezyWebhookSecret: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Form Data:", formData); // Debugging line
      const result = await updateUserLemonSqueezySettings(formData);

      if (result.status === 200) {
        toast.success("LemonSqueezy settings updated successfully!");

        // Reset the form fields
        setFormData({
          lemonSqueezyApiKey: "",
          lemonSqueezyStoreId: "",
          lemonSqueezyWebhookSecret: "",
        });
      } else {
        toast.error("Failed to update settings.");
      }
    } catch (error) {
      toast.error("An error occurred while updating settings.");
      console.error("Update Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">LemonSqueezy Integration</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your API connection to start selling with LemonSqueezy.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="lemonSqueezyApiKey"
                className="flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                API Key
              </Label>
              <Input
                id="lemonSqueezyApiKey"
                name="lemonSqueezyApiKey"
                type="password"
                value={formData.lemonSqueezyApiKey}
                onChange={handleChange}
                placeholder="Enter your API key"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lemonSqueezyStoreId"
                className="flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                Store ID
              </Label>
              <Input
                id="lemonSqueezyStoreId"
                name="lemonSqueezyStoreId"
                type="text"
                value={formData.lemonSqueezyStoreId}
                onChange={handleChange}
                placeholder="Enter your store ID"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lemonSqueezyWebhookSecret"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Webhook Secret{" "}
                <span className="ml-1 text-xs text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="lemonSqueezyWebhookSecret"
                name="lemonSqueezyWebhookSecret"
                type="password"
                value={formData.lemonSqueezyWebhookSecret}
                onChange={handleChange}
                placeholder="Enter your webhook secret"
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingsForm;
