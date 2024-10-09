import { Button, CircularProgress, Paper, PaperProps, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useWeb3Store } from '../store/web3Slice-del';

interface ConnectWalletPaperProps extends PaperProps {
    loading?: boolean;
    description?: ReactNode;
}

export const ConnectWalletPaper = ({
    loading,
    description,
    sx,
    ...rest
}: ConnectWalletPaperProps) => {
    const setWalletModalOpen = useWeb3Store(state => state.setWalletModalOpen)
    
    return (
        <Paper
            {...rest}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                flex: 1,
                bgcolor: '#ffffff',
                mt: 1,
                minHeight: '398px',
                padding: '0px 32px',
                boxShadow: '0px 4px 16px rgba(29, 33, 41, 0.04)',
                borderRadius: '16px',
                ...sx,
            }}
        >
            <img src='/icons/menu/connect-wallet.svg' width={120} height={120} alt='' />
            <>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Typography variant="h2" sx={{ mb: 2 }}>
                            Please, connect your wallet
                        </Typography>
                        <Typography sx={{ mb: 6 }} color="text.secondary">
                            {description || (

                                <>  Please connect your wallet to see your supplies, borrowings, and open positions.</>

                            )}
                        </Typography>

                        <Button
                            aria-label="wallet"
                            id="wallet-button"  
                            onClick={()=>{setWalletModalOpen(true);}}
                            aria-haspopup="true"
                            sx={{
                                color: '#571AFF',
                                borderRadius: '42px',
                                backgroundColor: 'rgb(87,26,255,0.08)',
                                height: '42px',
                                minWidth: '208px',
                                gap: '2px',
                                fontSize: '14px',
                                '&:hover': {
                                    backgroundColor: 'rgb(87,26,255,0.08)',
                                }
                            }}
                            startIcon={
                                <img src="/icons/menu/connect.svg" height={'20px'} width={'20px'} alt="" />
                            }
                            
                        >
                             Connect Wallet

                        </Button>


                    </>
                )}
            </>
        </Paper>
    );
};
