import { Box } from '@mui/material';
import React, { ReactElement } from 'react'; 

import { TxModalTitle } from '../FlowCommons/TxModalTitle'; 

export interface ModalWrapperProps {
    
}

export const ModalWrapper: React.FC<{
    title: ReactElement;
    hideTitleSymbol?: boolean;
    symbol?: string;
    children: (props: ModalWrapperProps) => React.ReactNode;
}> = ({
    hideTitleSymbol,
    symbol,
    children,
    title,
}) => {


        //   if (txError && txError.blocking) {
        //     return <TxErrorView txError={txError} />;
        //   }


        return (
            <Box>

                <TxModalTitle title={title} symbol={hideTitleSymbol ? undefined : symbol} />

                {/* {isWrongNetwork && !readOnlyModeAddress && (
                    <ChangeNetworkWarning
                        networkName={getNetworkConfig(requiredChainId).name}
                        chainId={requiredChainId}
                    />
                )} */}
                
                {children({
                   
                })}
            </Box>
        );
    };
