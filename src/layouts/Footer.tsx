import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
    component="header"
      sx={{ 
        mt: 8,
        mb: 6,
      }}
    >
      {/* <Typography sx={{
            
        }} color="text.muted">
            Powered by OFI.CASH
        </Typography>

        <Typography sx={{
            
        }} color="text.muted">
            © 2023 OFI.CASH All rights reserved
        </Typography> */}

      <Box className="footer-link">
        <Box className='item'>
          <img src="https://confluxpos.cn/static/images/wechat_logo.png" alt="" /> Wechat:
          DP494935329
        </Box>
        <Box className='item'>
          <img src="https://confluxpos.cn/static/images/qq_logo.png" alt="" /> QQ: 1027288241
        </Box>
        <Box className='item'>
          <img src="https://confluxpos.cn/static/images/telegram_logo.png" alt="" /> Telegram{" "}
          <a href="https://t.me/abcpoolchinese" target="_blank">
            https://t.me/abcpoolchinese
          </a>
        </Box>
        <Box className='item'>
          <img src="https://confluxpos.cn/static/images/twitter_logo.png" alt="" /> Twitter
          @ABCpospool
        </Box>
        <Box className='item'>
          <img src="https://confluxpos.cn/static/images/telegram_logo.png" alt="" /> Telegram{" "}
          <a href="https://t.me/abcdaohome" target="_blank">
            https://t.me/abcpoolenglish
          </a>
        </Box>
      </Box>
    </Box>
  );
};
