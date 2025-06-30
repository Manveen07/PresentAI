import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout(props: Props) {
  return (
    <div className="h-full w-full overflow-x-hidden">{props.children}</div>
  );
}

export default layout;
