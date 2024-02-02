import { useLingui } from "@lingui/react";
import {
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { Link } from "../components/primitives/Link";
import { useTranslation } from "react-i18next";

interface Navigation {
  link: string;
  title: string;
  dataCy?: string;
}

export const navigation: Navigation[] = [
 
  {
    link: "https://confluxpos.cn/",
    title: `Pool`,
    dataCy: "menuMarkets",
  },
  {
    link: "/",
    title: `Stake`,
    dataCy: "menuDashboard",
  },
];

interface NavItemsProps {
  setOpen?: (value: boolean) => void;
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  //   const { i18n } = useLingui();
  //   const { currentMarketData } = useProtocolDataContext();
  const { t} = useTranslation();
  
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down("md"));

  const handleClick = (title: string, isMd: boolean) => {
    if (isMd && setOpen) {
      setOpen(false);
    } else {
    }
  };

  return (
    <List
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        flexDirection: "row",
      }}
      disablePadding
    >
      {navigation.map((item, index) => (
        <ListItem
          sx={{
            width: { xs: "100%", md: "unset" },
            // mr: { xs: 0, md: 2 },
            margin: "0px 10px",
          }}
          data-cy={item.dataCy}
          disablePadding
          key={index}
        >
          {md ? (
            <Typography
              component={Link}
              href={item.link}
              variant="h2"
              sx={{ width: "100%", p: 4 }}
              onClick={() => handleClick(item.title, true)}
            >
              {t(item.title)}
            </Typography>
          ) : (
            <Button
              component={Link}
              onClick={() => handleClick(item.title, false)}
              href={item.link}
              sx={(theme) => ({
                //   color: '#2C70F4',
                fontSize: "16px",
                fontWeight:'600',
                p: "6px 8px",
                position: "relative",
                "&.active": {
                  color: "#2C70F4 !important",
                },
                ".active&:after, &:hover&:after": {
                  transform: "scaleX(1)",
                  transformOrigin: "bottom left",
                },
                "&:after": {
                  content: "''",
                  position: "absolute",
                  width: "100%",
                  transform: "scaleX(0)",
                  height: "2px",
                  bottom: "-6px",
                  left: "0",
                //   background: theme.palette.gradients.aaveGradient,
                  background: 'linear-gradient(248.86deg, #2C70F4 10.51%, #2C70F4 93.41%)',
                  transformOrigin: "bottom right",
                  transition: "transform 0.25s ease-out",
                },
              })}
            >
                   {t(item.title)}
            </Button>
          )}
        </ListItem>
      ))}

      {/* <ListItem sx={{ display: { xs: 'none', md: 'flex' }, width: 'unset' }} disablePadding>
        <MoreMenu />
      </ListItem> */}
    </List>
  );
};
