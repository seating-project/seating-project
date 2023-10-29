"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      callbackUrl: "/dashboard",
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    email: event.currentTarget.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label className="" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    password: event.currentTarget.value,
                  })
                }
              />
            </div>
          </div>
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
