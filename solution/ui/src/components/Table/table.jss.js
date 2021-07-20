import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    row: ({ state, updated }) => ({
      color: updated ? "green" : "black",
      fontWeight: updated ? "bold" : "inherit",
      background: state === "warning" ? "yellow" : "inherit",
    }),
  })
);

export default useStyles;
