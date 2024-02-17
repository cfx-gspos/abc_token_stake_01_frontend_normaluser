import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  SvgIcon,
  Typography,
} from "@mui/material";
// import { t, Trans } from '@lingui/macro';
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";

interface HeadMenuProps {
  anchorEl: Element | null;
  setAnchorEl: (value: Element | null) => void;
  openLg: boolean;
  setOpenLg: (value: boolean) => void;
  setLanguageVal: (value: string) => void;
}

const langMap = {
  en: `English`,
  zh: `中文`, 
};

export const AppLanguage = ({
  anchorEl,
  setAnchorEl,
  openLg,
  setOpenLg,
  setLanguageVal
}: HeadMenuProps) => {
 
  const handleLgClose = () => {
    setOpenLg(false);
  };

  const { i18n ,t} = useTranslation();
  function dynamicActivateLanguage(language:string){ 
    i18n.changeLanguage(language);
    setLanguageVal(langMap[language as keyof typeof langMap])
    setOpenLg(false);
  }

  return (
    <>
      {/* <Menu
        id="wallet-menu"
        MenuListProps={{
          "aria-labelledby": "wallet-button",
          className: "abc-menulist",
        }}
        anchorEl={anchorEl}
        open={openLg}
        onClose={handleLgClose}
        keepMounted={true}
        sx={{
          ".abc-menulist": {
            ".MuiMenuItem-root.Mui-disabled": { opacity: 1 },
            backgroundColor: "#ffffff",
            padding: "10px",
          },
        }}
      >
         

         <>
      <Box 
        sx={{  mb: '12px' }} 
      > 
        <ListItemText disableTypography>
          <Typography variant="subheader1">
            <>{t('Select language')}</>
          </Typography>
        </ListItemText>
      </Box>

      {Object.keys(langMap).map((lang) => (
        <Box 
          key={lang}
          onClick={() => dynamicActivateLanguage(lang)}
          sx={{
            display:'flex',
            alignItems:'center',
            cursor:'pointer',
            color: { md: 'text.primary' },
            '.MuiListItemIcon-root': { minWidth: 'unset' },
            '.MuiMenuItemIcon-root': { minWidth: 'unset' },
          }}
        >
          <ListItemIcon
            sx={{ mr: 3, borderRadius: '2px', overflow: 'hidden', width: 20, height: 14 }}
          >
            <img src={`/icons/flags/${lang}.svg`} width="100%" height="100%" alt={`${lang} icon`} />
          </ListItemIcon>
          <ListItemText>{langMap[lang as keyof typeof langMap]}</ListItemText>
        
        </Box>
      ))}
    </>


      </Menu> */}
    </>
  );
};
