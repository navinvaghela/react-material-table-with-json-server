import React, { useState } from 'react';
import '../CSS/styles.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControl, Select, MenuItem , InputLabel } from '@material-ui/core';

const cargoOptions = [
  { type: "NeukritPh3", description: "Phantom Plug Gold Plated", volume: "100"},
  { type: "Fabric", description: "1000 Blue T-shirts", volume: "2"},
  { type: "Fabric2", description: "2000 Green T-shirts", volume: "3"},
  { type: "Furniture", description: "300 Tables", volume: "20"},
  { type: "Furniture2", description: "1500 Chairs", volume: "15"},
  { type: "Bikes model 27X", description: "100 Bikes model 27X", volume: "100"},
  { type: "Couch22 White", description: "103 Couch model Couch22", volume: "103"}
];

const servicesOption = [
  {type: "insurance"},
  {type: "customs"},
];

function DialogFormComponent(props) {
    const [name, setName] = useState('');
    const [mode, setMode] = useState('');
    const [type, setType] = useState('');
    const [origin, setOrigin] = useState('');
    const [status, setStatus] = useState('');
    const [total, setTotal] = useState('');
    const [userId, setUserId] = useState('');   
    const [cargo, setCargo] = React.useState({
      cargo: []
    });
    const [services, setServices] = React.useState({
      services: []
    });

    const handleCargoFieldChange = event => {
      event.persist();
      setCargo(cargo => ({
        ...cargo,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      }));
    };

    const handleServicesFieldChange = event => {
      event.persist();
      setServices(services => ({
        ...services,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      }));
    };
    
    const handleSave = () => {
        const formdata = {
            name: name,
            mode: mode,
            type: type,
            origin:origin,
            status: status,
            total: total,
            cargo: cargo,
            destination: '',
            userId: userId,
            services: services
        }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formdata)
        };
        fetch('http://localhost:3000/shipments', requestOptions)
          .then(response => response.json())
          .then(data => console.log('saved data :',data));
          props.showAlertBox(true);
          props.dialogAction(false);
    
    }

    const handleClose = () => {
        props.dialogAction(false);
    }

    return (
        <Dialog open={props.dialogValue} onClose={handleClose}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"> Add New </DialogTitle>
          <DialogContent>
              <form className='dialogForm' noValidate autoComplete="off">
                  <TextField className='field' label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <FormControl className='formControl'>
                    <InputLabel>Mode</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={'sea'}>Sea</MenuItem>
                      <MenuItem value={'air'}>Air</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className='formControl'>
                    <InputLabel>Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={'FCL'}>FCL</MenuItem>
                      <MenuItem value={'LCL'}>LCL</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField className='field' label="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)}/>
                  <FormControl className='formControl'>
                    <InputLabel>Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value={'COMPLETED'}>Completed</MenuItem>
                      <MenuItem value={'ACTIVE'}>Active</MenuItem>
                      <MenuItem value={'NEW'}>New</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField className='field' label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                  <TextField className='field' label="Total" value={total} onChange={(e) => setTotal(e.target.value)}/> 
                  <TextField
                    className='multiselect'
                    select
                    name="cargo"
                    id="cargo"
                    label="Cargo"
                    SelectProps={{
                      multiple: true,
                      value: cargo.cargo,
                      onChange: handleCargoFieldChange
                    }}
                  >
                    {
                      cargoOptions.map((item => <MenuItem value={item}>{item.type}</MenuItem>))
                    }
                  </TextField> 

                  <TextField
                    className='multiselect'
                    select
                    name="services"
                    id="services"
                    label="Services"
                    SelectProps={{
                      multiple: true,
                      value: services.services,
                      onChange: handleServicesFieldChange
                    }}
                  >
                    {
                      servicesOption.map((item => <MenuItem value={item}>{item.type}</MenuItem>))
                    }
                  </TextField>       
              </form>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
    )
}

export default DialogFormComponent;