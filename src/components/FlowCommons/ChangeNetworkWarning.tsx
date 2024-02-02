import { ConnectChainID } from "@/src/libs/chains";
import { GetWalletType } from "@/src/libs/networksConfig"; 
import { Button, Typography } from "@mui/material";
import { Warning } from "./Warning";
import { useWeb3Store } from "@/src/store/web3Slice";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";

export type ChangeNetworkWarningProps = {
  networkName: string;
};

export const ChangeNetworkWarning = ({
  networkName,
}: ChangeNetworkWarningProps) => {

  const { chainId, account, provider, connector } = useWeb3React()
  const {switchNetwork} = useWeb3Store.getState();
  const { t} = useTranslation();
  return (
    <Warning severity="error" icon={false}>
      <Typography variant="description">
        <>{t('Please switch to')} {networkName}.</>{" "}
        <Button
          variant="text"
          sx={{ ml: "2px", 
          verticalAlign: "top", 
         }}
          onClick={() => switchNetwork(connector,ConnectChainID)}
          disableRipple
        >
          <Typography variant="description" sx={{
              color:'#ff0000'
          }}>
            <>{t('Switch Network')}</>
          </Typography>
        </Button>
      </Typography>
    </Warning>
  );
};
