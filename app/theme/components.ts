import { Components } from "@mui/material";

export const components: Components = {
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "initial",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
  },
};
