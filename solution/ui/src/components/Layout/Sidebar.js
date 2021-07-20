import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { MdChevronLeft } from "react-icons/md";

import jss from "./layout.jss.js";
import { useGlobalContext } from "common/hooks/useGlobalContext.js";

export default function Sidebar() {
  const { settings, setSettings } = useGlobalContext();
  const classes = jss({ settings });

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={settings.isOpenSidebar}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton
          onClick={() =>
            setSettings((prev) => ({ ...prev, isOpenSidebar: false }))
          }
        >
          <MdChevronLeft />
        </IconButton>
      </div>
      <Divider />
    </Drawer>
  );
}
