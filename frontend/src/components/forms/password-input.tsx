import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { passwordStrength } from "@/lib/validation/auth-schemas";

const LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];

export const PasswordInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input> & { strengthValue?: string }
>(function PasswordInput({ className, strengthValue, ...props }, ref) {
  const [visible, setVisible] = useState(false);
  const score = strengthValue !== undefined ? passwordStrength(strengthValue) : null;

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pr-11", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {score !== null && strengthValue ? (
        <div>
          <div className="flex gap-1" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full bg-border transition-colors",
                  score > i && (score <= 1 ? "bg-destructive" : score === 2 ? "bg-warning" : "bg-success"),
                )}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Password strength: {LABELS[score]}</p>
        </div>
      ) : null}
    </div>
  );
});
