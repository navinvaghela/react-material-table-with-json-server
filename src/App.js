import React, { useState, forwardRef, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table';
import { Snackbar, } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import { Search, AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, ViewColumn } from '@material-ui/icons';
import DialogFormComponent from './Components/DialogFormComponent';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
function App() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [shipmentData, setShipmentData] = useState([]);
  const [alertShow, setAlertShow] = useState(false);

  
  // table columns
  const columns = [
    { title: 'Name', field: 'name'},
    { title: 'Mode', field: 'mode'},
    { title: 'Type', field: 'type'},
    { title: 'Origin', field: 'origin'},
    { title: 'Status', field: 'status'},
    { title: 'UserID', field: 'userId'},
    { title: 'Total', field: 'total'},
  ];

  const handleClickOpen = (e) => {
    setShowNewUserModal(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };


  return (
    <div className="App">
      <Snackbar open={alertShow} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          Shipment Successful created.  
        </Alert>
      </Snackbar>

      <MaterialTable
        title="Shipment Table"
        columns={columns}
        icons={tableIcons}
        data={query =>
            new Promise((resolve, reject) => {
              let url = 'http://localhost:3000/shipments?';
                
                // searching
                if(query.search){
                  url += `q=${query.search}`;  
                }
      
                // ordering
                if(query.orderBy){
                  url += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`;  
                }

                // filtering
                if(query.filters.length){
                  const filter = query.filters.map(filter =>{
                    return `&${filter.column.field}${filter.operator}${filter.value}`
                  });
                  url += filter.join(); 
                }

                // pagination
                url += `&_page=${query.page + 1}`;

                // limit set
                url += `&_limit=${query.pageSize}`;
                
                fetch(url)
                  .then(response => response.json()).then(response => {
                    resolve({
                      data: response,
                      page: query.page,
                      totalCount: 50
                    });
                  });
            })
        }
        options={{ debounceInterval: 700, padding: 'dense', filtering: true }}
        actions={[
          {
            icon: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => handleClickOpen(event)
          }
        ]}
      />
      {
        showNewUserModal ? 
          <DialogFormComponent
            dialogAction={(value) => setShowNewUserModal(value)} 
            dialogValue={showNewUserModal} 
            showAlertBox={(value) => setAlertShow(value)}
          /> 
          : null
      } 
    </div>
  );
}

export default App;
