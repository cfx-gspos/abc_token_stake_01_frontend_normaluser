import { toast } from "react-toastify";

export function toastInfo(state: boolean, msg: string) {
    if (state) {
        toast.success(`${msg}`, {
            autoClose: 5000,
            position: "top-right",
            theme: 'dark',
            closeOnClick: true,
            // bodyStyle: {borderRadius:'30px'},
            style: { borderRadius: '6px' },
        });
    } else {
        toast.error(`${msg}`, {
            autoClose: 2500,
            position: "top-right",
            theme: 'dark',
            closeOnClick: true,
            // bodyStyle: {borderRadius:'30px'},
            style: { borderRadius: '6px' },
        });
    }

}

