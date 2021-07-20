import React from "react";
import jss from "./layout.jss.js";

import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

export default function Footer() {
  const classes = jss();

  return (
    <div className={classes.footer}>
      <Box>Hello Potloc fellas</Box>
      <Divider />
    </div>
  );
}
