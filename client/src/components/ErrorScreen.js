import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react';
import AuthContext from '../auth'
const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    px: 4,
    pb: 3,
};
export default function ErrorModal(){
    const { store } = useContext(GlobalStoreContext);


    const { auth } = useContext(AuthContext);

    return(
        <Modal
            open={auth.error}
            onClose={!auth.error}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Box sx={style}>
                <Alert severity="warning">{auth.error_message}</Alert>
                <Button
                    onClick={auth.handleClose}
                >
                    OK, I understand
                </Button>
            </Box>

        </Modal>
    )
}