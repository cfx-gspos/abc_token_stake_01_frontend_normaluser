
import { useWeb3Store } from '@/src/store/web3Slice';
import { BasicModal } from '../primitives/BasicModal';
import { WalletSelector } from './WalletSelector';

export const WalletModal = () => { 

    const {isWalletModalOpen,setWalletModalOpen} = useWeb3Store(state =>({ setWalletModalOpen: state.setWalletModalOpen, isWalletModalOpen: state.isWalletModalOpen }));
    
    return (
        <BasicModal  open={isWalletModalOpen} setOpen={setWalletModalOpen}>
            <WalletSelector />
        </BasicModal>
    );
};
