import React from "react";
import clsx from "clsx";
import { useGlobalContext } from "common/hooks/useGlobalContext";
import Footer from "./Footer";
import { Header, MetaHeader } from "./Header";
import Sidebar from "./Sidebar";
import jss from "./layout.jss.js";

export default function Layout({ children, metaHeader, title }) {
  const classes = jss();
  const { settings } = useGlobalContext();
  return (
    <>
      <MetaHeader meta={metaHeader} />
      <div className={classes.root}>
        <Header title={title} />
        <Sidebar />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: settings.isOpenSidebar,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
