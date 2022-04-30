import React from "react";
import { AppBar, Toolbar, Typography, Button, Modal, Paper } from "@mui/material";
import AddProduct from './AddProduct'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Header = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        props.callBack();
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>CRUD Mini Project</Typography>
                    <Button color="error" variant="contained" onClick={handleOpen}>Add Product</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                    >
                        <Paper sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add New Product
                            </Typography>
                            <Typography />
                            <AddProduct closeModal={handleClose}/>
                        </Paper>
                    </Modal>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header