import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import Pagination from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Modal, Button } from 'react-bootstrap';


function App() {
  const {SearchBar} = Search;
  const [data, setData] = useState([])
  const [modalInfo, setmodalInfo] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    axios("https://serpindex-demo.svc.violetvault.com/api/index").then((res) =>
      setData(res.data)

    )
  }

  const columns = [

    {
      dataField: "createdOn",
      text: "Create On",
      formatter: (cell, row) => {
        const date = new Date(cell);
        return date.toLocaleString();
      }      


    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
    },
    {
      dataField: "domain",
      text: "Domain",
      sort: true,
    },
    {
      dataField: "validUntil",
      text: "Days until expired",
      sort: true,
      formatter: (cell, row) => {
        
        const startDate = new Date(row.createdOn);
        const endDate = new Date(row.validUntil);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
      },
    },

    
    {
      dataField: 'entries',
      text: 'Indexed languages',
      formatter: (cell, row) => (
        <ul>
          {cell.map((entry) => (
            entry.indexedCount >0 ?
              <li key={entry.title} style ={{'color':'red', textAlign:'left'}}>{entry.language}</li> : ''           
            
          ))}
        </ul>
      ),
    },

   

    {
      dataField: 'entries',
      text: 'UnIndexed languages',
     
      formatter: (cell, row) => (
        <ul>
          {cell.map((entry) => (
            entry.indexedCount == 0 ?
              <li style ={{color: 'blue', textAlign:'left'}} >{entry.language}</li> : ''
                                      
          ))}
        </ul>
      ),
    },

    {
      dataField: 'entries',
      text: 'Indexed Count',
      formatter: (cell, row) => {
        const index_array = cell.map((entry) => entry.indexedCount);
        const sumIndex = index_array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        const index_total_array = cell.map((entry) => entry.indexedTotal);
        const sumIndex_total = index_total_array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const index_valid_array = cell.map((entry) => entry.indexedValidCount);
        const sumIndex_valid = index_valid_array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      

        return `${sumIndex} / ${sumIndex_valid} /  ${sumIndex_total}`;
       
     },
    },

  ];

  const rowEvents = {
    onClick: (e, row) => {
      setmodalInfo(row);
      tooggleTrueFalse();
    }
  }

  const tooggleTrueFalse = () => {
    setShowModal(handleShow);
  }


  const ModalContent = () => {
    let creat_on_date = new Date(modalInfo.createdOn) ;
    let format_date = creat_on_date.toLocaleString(); 
    let expired_format = new Date(modalInfo.validUntil).toLocaleString() ;

    const startDate = new Date(modalInfo.createdOn);
    const endDate = new Date(modalInfo.validUntil);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));    

    const modalStyle = {
      display: show ? 'block' : 'none',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      backgroundColor: 'white',
      width: '70%', // Set the width of the modal here
      height: 'auto',
      overflow: 'auto',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    };
   
    
    return (
      <Modal show={show} onHide={handleClose}>
        
        <div style = {modalStyle}>
          
          <h2>Title:  {modalInfo.title}</h2>
          <p><span class = "title_com">Created On</span> : {format_date}</p>
          <p><span class = "title_com">Category</span>: {modalInfo.category}</p>
          <p><span class = "title_com">Expired</span>: {diffDays} days</p>

            <table class="table" >
              <thead>
                <tr>
                  <th scope="col">index count</th>
                  <th scope="col">index total</th>
                  <th scope="col">language</th>
                  <th scope='col'>url</th>
                  <th scope='col'>*</th>
                </tr>
              </thead>
              <tbody>
                {modalInfo.entries.map((item) => {

                  const indexedOn = new Date(item.results[0].indexedOn);
                  const createdOn = new Date(item.createdOn);

                  const diffTime_index = Math.abs(indexedOn - createdOn);
                  const diffDays_index = Math.ceil(diffTime_index / (1000 * 60 * 60 * 24));
             

                  return (
                    <tr>
                      <td>{item.indexedCount}</td>
                      <td>{item.indexedTotal}</td>
                      <td>{item.language}</td>
                      <td style={{ whiteSpace: 'pre-wrap' }}> {item.url} </td>
                      <td>{diffDays_index} days </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        
      </Modal>
    )
  }

  console.log(data)
  return (
    <div className="App">
      <ToolkitProvider
        keyField="id"
        data={data}
        columns={columns}
        search
      >
        {
          props => (
            <div>
              <SearchBar {...props.searchProps} />
              <hr />
              <BootstrapTable
                rowEvents={rowEvents}
                striped
                hover
                condensed
                pagination={Pagination({sizePerPage: 5})}
                {...props.baseProps}
              />
            </div>
          )
        }

      </ToolkitProvider>

      {show ? <ModalContent /> : null}
    </div>
  );
}

export default App;