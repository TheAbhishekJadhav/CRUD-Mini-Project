import React, { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, ListItem, Modal, Paper } from "@mui/material";
import UpdateProduct from './UpdateProduct'

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

const ItemCard = ({prod , callBack}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        callBack();
    }

    const handleDelete = () => {
        const prodData = {
            id: prod.id
        }

        fetch('http://127.0.0.1:8000/api/item/delete', {
            method: "DELETE",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prodData),
        })
        .then(() => {
            alert("Product deleted")
            callBack()
        })
        .catch((err) => { 
            console.log(err)
        })
    }

    return (
        <ListItem>
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{prod.item}</Typography>
                    <Typography />
                    <Typography variant="body2" color="text.secondary">{prod.desc}</Typography>
                    <br />
                    <Typography />
                    <Typography> Quantity Available: {prod.quantity}</Typography>
                    <Typography> Price: {prod.unitprice}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button color="info" variant="contained" onClick={handleOpen}>Edit</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                    >
                        <Paper sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Update Product
                            </Typography>
                            <Typography />
                            <UpdateProduct prod={prod} closeModal={handleClose}/>
                        </Paper>
                    </Modal>
                    <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
                </CardActions>
            </Card>
        </ListItem>
    );
}

export default ItemCard