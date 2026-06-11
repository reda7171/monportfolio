import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[hsl(var(--foreground-2))]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground-muted))] [&_svg]:size-4">
              {icon}
            </span>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              "input",
              icon && "pl-9",
              error && "border-[hsl(var(--error))] focus:border-[hsl(var(--error))] focus:shadow-[0_0_0_3px_hsl(var(--error)/.15)]",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-[hsl(var(--error))] mt-0.5">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[hsl(var(--foreground-2))]">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          className={cn(
            "input min-h-[120px] resize-y",
            error && "border-[hsl(var(--error))]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-[hsl(var(--error))]">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
