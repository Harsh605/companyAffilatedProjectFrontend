import React, { useRef, useState } from "react";
import { Button, Col, Input, Row, Table } from "reactstrap";
import './ProjectDeatils.css'
import {
  Widgets2Data,
  Widgets2Data2,
  WidgetsData,
  WidgetsData2,
  WidgetsData3,
  WidgetsData4,
} from "../../../Data/DefaultDashboard";
import Widgets1 from "../../Common/CommonWidgets/Widgets1";
import Widgets2 from "../../Common/CommonWidgets/Widgets2";
import { FaInstagram, FaRegCopy, FaSort } from "react-icons/fa";
import { toast } from 'react-toastify'
const WidgetsWrapper = () =>
{
  const [sortOrder, setSortOrder] = useState("asc");
  const [projectlistData, setTaskHistoryData] = useState([
    // Sample data, replace with your actual data
    {
      sno: "1",
      date: "18/01/2024",
      projectid: "2",
      projectname: "meta",
      discription: "block",
      price: "2000",
      link: "http/hello.com",
      file: "hello.jpg",
    },
    {
      sno: "2",
      date: "19/01/2024",
      projectid: "3",
      projectname: "meta1",
      discription: "block1",
      price: "2001",
      link: "http/heyy.com",
      file: "heyy.jpg",
    },
    {
      sno: "3",
      date: "20/01/2024",
      projectid: "3",
      projectname: "meta-2",
      discription: "block2",
      price: "7688",
      link: "www/hello.com",
      file: "www.jpg",
    },
    {
      sno: "4",
      date: "24/01/2024",
      projectid: "5",
      projectname: "meta-5",
      discription: "block-5",
      price: "9430",
      link: "in/hello.com",
      file: "in.jpg",
    },
  ] );
  

  const tableRef = useRef(null);

  const copyTable = () => {
    const table = document.getElementById("myTable");
  
    if (!table) {
      console.error("Table not found");
      return;
    }
  
    const range = document.createRange();
    range.selectNode(table);
  
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  
    try {
      document.execCommand("copy");
      alert("Table copied to clipboard!"); // Show a simple notification
    } catch (err) {
      console.error("Unable to copy table to clipboard", err);
    } finally {
      window.getSelection().removeAllRanges();
    }
  };
  
  

  const handlePrint = () => {
    window.print();
  };

  const downloadTableAsCSV = () => {
    const table = document.getElementById("myTable");

    if (!table) {
      console.error("Table not found");
      return;
    }

    const rows = table.querySelectorAll("tr");
    const csvData = [];

    rows.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll("td, th");

      cells.forEach((cell) => {
        rowData.push(cell.innerText);
      });

      csvData.push(rowData.join(","));
    });

    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "table_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const [ searchTerm, setSearchTerm ] = useState( "" ); 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredprojectlistData = projectlistData.filter((item) => {
    // Step 3
    return (
      // item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.projectid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.projectname.toLowerCase().includes(searchTerm.toLowerCase())||
      item.discription.toLowerCase().includes(searchTerm.toLowerCase())||
      item.price.toLowerCase().includes(searchTerm.toLowerCase())||
      item.link.toLowerCase().includes(searchTerm.toLowerCase())||
      item.file.toLowerCase().includes(searchTerm.toLowerCase())
      // item.EditDelete.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } );

  const sortByUserNameone = () => {
    const sortedData = [...projectlistData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.sno.localeCompare(b.sno);
      } else {
        return b.sno.localeCompare(a.sno);
      }
    });
    setTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const copyTables = (taskLink) => {
    const range = document.createRange();
    const dummyElement = document.createElement("textarea");
    dummyElement.value = taskLink;

    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);

    toast.success("Task Link copied to clipboard!");
  };
  return (
    <>
      <Col xxl="auto" className="box-col-6">
        <Row>
          <Col>
            <Widgets1 data={ WidgetsData } />
          
          </Col>
          <Col>
            <Widgets1 data={WidgetsData2} />
          </Col>
          <Col>
            <Widgets1 data={WidgetsData4} />
          </Col>
          <Col>
            <Widgets1 data={WidgetsData4} />
          </Col>
        </Row>
      </Col>
      <Col xxl="auto" className="box-col-6">
        <Row>
          <Col>
            <Widgets1 data={WidgetsData3} />
          </Col>
          <Col>
            <Widgets1 data={WidgetsData4} />
          </Col>
          <Col>
            <Widgets1 data={WidgetsData4} />
          </Col>
          <Col>
            <Widgets1 data={WidgetsData4} />
          </Col>
        </Row>
      </Col>


      <div style={{display:"flex"}} className="tableworkbutton">
            <div
            //   style={ {
            //     display: "flex",
            //     position: "relative",
            //     left: "66%",
            //     top: "0",
            //     gap: "5px"
            // } }
            >

            <Input className="searchdaily"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
                  style={ {
                  height:"35px",
            width:"380px"
            // marginTop:"15px"
            // position: "absolute"
            
          }}
        />
            </div>
              <div className="tableworkbuttondaily">
                

              <Button
                 color="primary"
                // style={{
                //   border: "1px solid #DEE2E6",
                //   width: "70px",
                //   height: "30px",
                // }}
                onClick={copyTable}
              >
                Copy
              </Button>
              <Button
                 color="primary"
                // style={{
                //   border: "1px solid #DEE2E6",
                //   width: "70px",
                //   height: "30px",
                // }}
                onClick={downloadTableAsCSV}
              >
                CSV
              </Button>
              <Button
                 color="primary"
                // style={{
                //   border: "1px solid #DEE2E6",
                //   width: "70px",
                //   height: "30px",
                // }}
                onClick={downloadTableAsCSV}
              >
                Excel
              </Button>
              <Button
              color="primary"
                onClick={handlePrint}
              >
                Print
              </Button>
             
              </div>
            </div>
   

     
      <div style={{ overflowX: 'auto' }}>
      <Table className="projectdeatilstable"   id="myTable">
        <thead>
          <tr>
            <th onClick={sortByUserNameone}>S. No
                      <FaSort style={{ color: "#BABABA" }} />
                  </th>
            <th onClick={sortByUserNameone}>Update Date<FaSort style={{ color: "#BABABA" }} /></th>
            <th onClick={sortByUserNameone}>Project id<FaSort style={{ color: "#BABABA" }} /></th>
            <th onClick={sortByUserNameone}>Project Name<FaSort style={{ color: "#BABABA" }} /></th>
            <th onClick={sortByUserNameone}>Discription<FaSort style={{ color: "#BABABA" }}/></th>
            <th onClick={sortByUserNameone}>Estimate Price<FaSort style={{ color: "#BABABA" }} /></th>
            <th onClick={sortByUserNameone}>Demo Link<FaSort style={{ color: "#BABABA" }} /></th>
            <th onClick={sortByUserNameone}>File<FaSort style={{ color: "#BABABA" }} /></th>
          </tr>
        </thead>
        <tbody>
          {filteredprojectlistData.map((item, index) => (
            <tr key={index}>
              <td>{item.sno}</td>
              <td>{item.date}</td>
              <td>{item.projectid}</td>
              <td>{item.projectname}</td>
              <td>{item.discription}</td>
              <td>{item.price}</td>
              <td style={{display:"flex",gap:"8px"}}>{item.link}<div onClick={() => copyTables(item.link)}
                        style={{ cursor: "pointer" }}><FaRegCopy /></div></td>
              <td>{item.file}</td>
            </tr>
          ))}
        </tbody>
        </Table>
        </div>
    </>
  );
};

export default WidgetsWrapper;
