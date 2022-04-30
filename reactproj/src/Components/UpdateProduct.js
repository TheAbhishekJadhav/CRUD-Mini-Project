import React from "react";
import { Box } from "@mui/system";
import { TextField, Button, InputAdornment } from "@mui/material";

function AddProduct({closeModal, prod}) {
    const itemNameRef = React.useRef();
    const itemDescRef = React.useRef();
    const itemQuantityRef = React.useRef();
    const unitPriceRef = React.useRef();

    let added = false

    const handleSubmit = (event) => {
        event.preventDefault()

        const inptName = itemNameRef.current.value;
        const inptDesc = itemDescRef.current.value;
        const inptQuant = itemQuantityRef.current.value;
        const inptPrice = unitPriceRef.current.value;

        const prodData = {
            id: prod.id,
            item: inptName,
            desc: inptDesc,
            quantity: inptQuant,
            unitprice: inptPrice,
        }


        fetch('http://127.0.0.1:8000/api/item/update', {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prodData),
        })
        .then(() => {
            added = true
        })
        .catch((err) => { 
            console.log(err)
        }).finally(() => {
            if(added){
                okAlert()
                closeModal()
            } else {
                koAlert()
            }
        })

    }

    const okAlert = () => {
        alert("Product Updated Sussesfully");
    }

    const koAlert = () => {
        alert("Submit Failed");
    }

    return (
        <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <TextField id="item-name" defaultValue={prod.item} label="Product Name" variant="outlined" inputRef={itemNameRef}
                InputLabelProps={{
                    shrink: true,
                  }}
            />
            <TextField multiline id="item-desc" defaultValue={prod.desc} label="Product Description" variant="outlined" 
                inputRef={itemDescRef} 
                InputLabelProps={{
                    shrink: true,
                  }}
            />
            <TextField
                id="item-unit-price"
                defaultValue={prod.unitprice}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                label="Unit Price"
                inputRef={unitPriceRef}
            />
            <TextField
                id="item-quantity"
                defaultValue={prod.quantity}
                label="Quantity Available"
                type="number"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                  }}
                inputRef={itemQuantityRef}
            />
            <br />
            <Button onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}

export default AddProduct