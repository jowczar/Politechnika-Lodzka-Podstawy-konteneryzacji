import * as React from "react";
import clsx from "clsx";
import { ImSpinner2 } from "react-icons/im";

export const Button = React.forwardRef(
  (
    {
      children,
      disabled = false,
      size = "large",
      variant = "secondary",
      isLoading = false,
      className = "",
      onClick,
      type = "button",
      dataTip = "",
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-tip={dataTip}
        onClick={onClick}
        className={clsx(
          "inline-flex gap-2.5 items-center justify-center rounded px-4 py-2.5 text-sm",
          "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
          "cursor-pointer",
          "transition-all duration-300",
          [
            variant === 'cta' && [
              "bg-yt font-bold text-white hover:bg-yt-darker active:bg-yt-darker",
            ],
            variant === "primary" && [
              "bg-primary text-white",
              "hover:bg-primary-darker",
              "active:bg-primary-darker",
              "disabled:bg-primary-lighter",
            ],
            variant === "secondary" && [
              "bg-darky text-black border border-gray-300",
              "hover:bg-gray-50 hover:border-gray-500",
              "active:bg-gray-50",
              "disabled:bg-darky-lighter",
            ],
          ],
          [
            size === "full" && "w-full",
            size === "square" && "aspect-square px-2 py-2",
          ],
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
      >
        {isLoading && (
          <div
            className={
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
            }
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button"

export default Button;
