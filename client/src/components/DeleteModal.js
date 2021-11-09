import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AuthContext from '../auth';
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    //console.log("22222");
    //console.log(store.currentList);
    if (store.currentList) {
        //console.log("22222");
        //console.log(store.currentList);
        name = store.currentList.name;
    }
    function handleDeleteList(event) {
        //console.log("Fuckkkkkkkkkk");
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.unmarkListForDeletion();
    }
    const style = {
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 2,
        px: 4,
        pb: 3,
    };
    return (
        <Modal
            open={store.listMarkedForDeletion!=null}
            onClose={store.listMarkedForDeletion==null}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Box sx={style}>
                <Alert severity="warning">Delete the {name} Top 5 List?</Alert>
                <Button
                    onClick={handleDeleteList}
                >
                    Confirm
                </Button>

                <Button
                    onClick={handleCloseModal}
                >
                    Cancel
                </Button>
            </Box>

        </Modal>
    );
}

export default DeleteModal;