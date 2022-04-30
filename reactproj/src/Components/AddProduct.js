import { Box } from "@mui/system";
import { TextField, Button, InputAdornment } from "@mui/material";
import React from "react";

function AddProduct({closeModal}) {
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
            item: inptName,
            desc: inptDesc,
            quantity: inptQuant,
            unitprice: inptPrice,
        }


        fetch('http://127.0.0.1:8000/api/item/add', {
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
        alert("Product Added Sussesfully");
    }

    const koAlert = () => {
        alert("Submit Failed");
    }

    return (
        <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <TextField id="item-name" label="Product Name" variant="outlined" inputRef={itemNameRef}/>
            <TextField multiline id="item-desc" label="Product Description" variant="outlined" inputRef={itemDescRef} />
            <TextField
                id="item-unit-price"
                // value={values.amount}
                // onChange={handleChange('amount')}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                label="Unit Price"
                inputRef={unitPriceRef}
            />
            <TextField
                id="item-quantity"
                label="Quantity Available"
                type="number"
                variant="outlined"
                inputRef={itemQuantityRef}
            />
            <br />
            <Button onClick={handleSubmit}>Submit</Button>
        </Box>
    );
}

export default AddProduct