import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import Pagination from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { Modal, Button } from 'react-bootstrap';
function App() {
  const { SearchBar } = Search;
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
      text: "Expired",
      sort: true,
    }

  ]
  const rowEvents = {
    onClick: (e, row) => {
      console.log(row)
      setmodalInfo(row)
      tooggleTrueFalse()
    }
  }

  const tooggleTrueFalse = () => {
    setShowModal(handleShow)
  }

  


  const ModalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Title: {modalInfo.title}</p>
          <p>Created On : {modalInfo.createdOn}</p>
          <p>Category: {modalInfo.category}</p>
          <p>Expired: {modalInfo.validUntil}</p>
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">index count</th>
                  <th scope="col">index total</th>
                  <th scope="col">language</th>
                  <th scope='col'>url</th>
                </tr>
              </thead>
              <tbody>
                {modalInfo.entries.map((item) => {
                  return (
                    <tr>
                      <td>{item.indexedCount}</td>
                      <td>{item.indexedTotal}</td>
                      <td>{item.language}</td>
                      <td>{item.url}</td>
                    </tr>
                  )

                })}


              </tbody>
            </table>
          </div>

        </Modal.Body>
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