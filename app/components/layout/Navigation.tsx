import { HREF_ACCOUNT, HREF_ACCOUNTS } from "@/constants/hrefs";
import { theme } from "@/theme";
import { MenuRounded } from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
  Stack,
  SxProps,
  Toolbar,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Link from "next/link";
import { useState } from "react";

/**
 * Component with a navigation.
 */
export default function Navigation() {
  return (
    <AppBar
      color="default"
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: `solid 1px ${grey[300]}`,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo sx={{ flexGrow: 1 }} />
          <MenuDesktop sx={{ display: { xs: "none", md: "flex" } }} />
          <MenuMobile sx={{ display: { xs: "flex", md: "none" } }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function Logo(props: { sx?: SxProps }) {
  return (
    <Box sx={{ ...props.sx }}>
      <Link href="/" passHref legacyBehavior>
        <MuiLink
          variant="h6"
          fontWeight={700}
          color={theme.palette.text.primary}
        >
          🤝 dLinkedIn
        </MuiLink>
      </Link>
    </Box>
  );
}

function MenuDesktop(props: { sx?: SxProps }) {
  return (
    <Stack direction="row" alignItems="center" spacing={4} sx={{ ...props.sx }}>
      <Link href={HREF_ACCOUNTS} passHref legacyBehavior>
        <MuiLink
          fontWeight={700}
          color={theme.palette.text.primary}
          variant="body2"
          ml={3.5}
        >
          Explore
        </MuiLink>
      </Link>
      <Link href={HREF_ACCOUNT} passHref legacyBehavior>
        <MuiLink fontWeight={700} color="#000000" variant="body2" ml={3.5}>
          Account
        </MuiLink>
      </Link>
    </Stack>
  );
}

function MenuMobile(props: { sx?: SxProps }) {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const isOpened = Boolean(anchorElement);

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorElement(event.currentTarget);
  }
  function handleClose() {
    setAnchorElement(null);
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={isOpened ? "navigation-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpened ? "true" : undefined}
        sx={{ ...props.sx }}
      >
        <MenuRounded />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        id="navigation-menu"
        open={isOpened}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href={HREF_ACCOUNTS} passHref legacyBehavior>
          <MenuItem>Explore</MenuItem>
        </Link>
        <Link href={HREF_ACCOUNT} passHref legacyBehavior>
          <MenuItem>Account</MenuItem>
        </Link>
      </Menu>
    </>
  );
}
