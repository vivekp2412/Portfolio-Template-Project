import React from "react";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
 
export default function Example() {
  const [open, setOpen] = React.useState(false);
 
  return (
    <div className="relative  w-full">
      <div className="absolute bottom-0 right-0">
        <SpeedDial open={open} handler={setOpen}>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate=90" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction>
              <HomeIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction>
              <CogIcon className="h-5 w-5" />
            </SpeedDialAction>
            <SpeedDialAction>
              <Square3Stack3DIcon className="h-5 w-5" />
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
}