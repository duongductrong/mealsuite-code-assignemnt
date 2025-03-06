import React, { ComponentProps } from "react";

export interface LoadingProps extends ComponentProps<"div"> {}

const Loading = (props: LoadingProps) => {
  return (
    <div
      {...props}
      className="size-4 rounded-full border border-neutral-950 border-r-transparent animate-spin"
    />
  );
};

export default Loading;
