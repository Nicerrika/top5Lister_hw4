import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
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
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideDeleteListModal();
    }
    return (
        <Modal
            open={auth.error}
            onClose={!auth.error}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <Box sx={style}>
                <Alert severity="warning">Delete the {name} Top 5 List?</Alert>
                <Button
                    onClick={handleDeleteList}
                >
                    confirm
                </Button>

                <Button
                    onClick={handleCloseModal}
                >
                    confirm
                </Button>
            </Box>

        </Modal>
    );
}

export default DeleteModal;