
import { ModalType, useModalStore } from '@/src/store/modalSlice';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ChangeNetworkWarning } from '../components/FlowCommons/ChangeNetworkWarning';
import { TxModalTitle } from '../components/FlowCommons/TxModalTitle';
import { BasicModal } from '../components/primitives/BasicModal';
import { CHAINS, ConnectChainID } from '../libs/chains';
import { useTranslation } from 'react-i18next';

export const SwitchNetworkModal = () => {
    const { type, close } = useModalStore()
    const { t } = useTranslation();
    return (
        <BasicModal open={type === ModalType.NetworkWarning} setOpen={close}>
            <TxModalTitle title={t('Network error')} symbol={undefined} />

            <ChangeNetworkWarning networkName={CHAINS[ConnectChainID].name} />

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 12 }}>
                <Button
                    variant={"gradient"}
                    onClick={close}
                    size="large"
                    sx={{ minHeight: '44px', borderRadius: '40px' }}
                >
                    <>{t('Cancel')}</>
                </Button>
            </Box>

        </BasicModal>
    );
};
