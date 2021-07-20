import React from "react";
import Head from "next/head";
import jss from "./layout.jss.js";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { MdMenu } from "react-icons/md";
import { useGlobalContext } from "common/hooks/useGlobalContext.js";

export const Header = ({ title }) => {
  const classes = jss();
  const { settings, setSettings } = useGlobalContext();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.header, {
        [classes.headerShift]: settings.isOpenSidebar,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() =>
            setSettings((prev) => ({ ...prev, isOpenSidebar: true }))
          }
          edge="start"
          className={clsx(
            classes.menuButton,
            settings.isOpenSidebar && classes.hide
          )}
        >
          <MdMenu />
        </IconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export const MetaHeader = ({ meta = {} }) => {
  return (
    <Head>
      <title>{meta.title || "missing title"}</title>
      <meta name="description" content={meta.description || "missing title"} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
