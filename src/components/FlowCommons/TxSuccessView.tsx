import { ERC20TokenType } from '@/src/libs/chains';
import { useModalStore } from '@/src/store/modalSlice'; 
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { Box, Button, Link, SvgIcon, Typography, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';
import { WalletIcon } from '../icons/WalletIcon';
import { FormattedNumber } from '../primitives/FormattedNumber';
import { Base64Token, MultiTokenIcon, TokenIcon } from '../primitives/SingleTokenIcon';
import { useWeb3Store } from '@/src/store/web3Slice';

export type SuccessTxViewProps = {
    txHash?: string;
    action?: ReactNode;
    amount?: string;
    name?: string;
    symbol?: string[];
    collateral?: boolean;
    //   rate?: InterestRate;
    addToken?: ERC20TokenType;
    customAction?: ReactNode;
    customText?: ReactNode;
    blockExplorerUrls?: string;
};

const ExtLinkIcon = () => (
    <SvgIcon sx={{ ml: '2px', fontSize: '11px' }}>
        <ExternalLinkIcon />
    </SvgIcon>
);

export const TxSuccessView = ({
    txHash,
    action,
    amount,
    name,
    symbol,
    collateral,
    //   rate,
    addToken,
    customAction,
    customText,
    blockExplorerUrls
}: SuccessTxViewProps) => {
    const { type, close } = useModalStore()
    const [base64, setBase64] = useState('')
    const { addERC20Token } = useWeb3Store()
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '48px',
                        height: '48px',
                        bgcolor: 'success.200',
                        borderRadius: '50%',
                        mt: 8,
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <SvgIcon sx={{ color: 'success.main', fontSize: '32px' }}>
                        <CheckIcon />
                    </SvgIcon>
                </Box>

                <Typography sx={{ mt: 1 }} variant="h2">
                    <>All done!</>
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    {action && amount && symbol && (
                        <Typography>
                            You {action}{' '}
                            <FormattedNumber value={Number(amount)} compact variant="secondary14" /> {name}

                        </Typography>
                    )}

                    {/* {customAction && (
                        <Typography>
                            {customText}
                            {customAction}
                        </Typography>
                    )} */}



                    {addToken && symbol && (
                        <Box
                            sx={(theme) => ({
                                border:
                                    theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
                                background: theme.palette.mode === 'dark' ? 'none' : '#F7F7F9',
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: '24px',
                            })}
                        >
                          
                            <MultiTokenIcon symbols={symbol} sx={{ fontSize: '32px', mt: '12px', mb: '8px' }} />
                            <Typography variant="description" color="text.primary" sx={{ mx: '24px' }}>
                                <>
                                    Add {addToken && addToken.aToken ? 'aToken ' : 'token '} to wallet to track your
                                    balance.
                                </>
                            </Typography>
                            <Button
                                onClick={() => {
                                    addERC20Token({
                                        address: addToken.address,
                                        decimals: addToken.decimals,
                                        symbol: addToken.aToken ? `a${addToken.symbol}` : addToken.symbol,
                                        image: !/_/.test(addToken.symbol) ? base64 : undefined,
                                    });
                                }}
                                variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                                size="medium"
                                sx={{ mt: '8px', mb: '12px' }}
                            >
                                {addToken.symbol && !/_/.test(addToken.symbol) && (
                                    <Base64Token
                                        symbol={addToken.symbol}
                                        onImageGenerated={setBase64}
                                        aToken={addToken.aToken}
                                    />
                                )}
                                <WalletIcon sx={{ width: '20px', height: '20px' }} />
                                <Typography variant="buttonM" color="white" ml="4px">
                                    <>Add to wallet</>
                                </Typography>
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                    variant="helperText"
                    href={`${blockExplorerUrls}/tx/${txHash}`}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'right',
                        mt: 6,
                        mb: 3,
                    }}
                    underline="hover"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <>Review tx details</>
                    <ExtLinkIcon />
                </Link>
                <Button
                    onClick={close}
                    variant="contained"
                    size="large"
                    sx={{ minHeight: '44px' }}
                    data-cy="closeButton"
                >
                    <>Ok, Close</>
                </Button>
            </Box>
        </>
    );
};


