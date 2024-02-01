import React, { Fragment, useRef, useState } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import ChatStatus from "./ChatStatus";
import Chatting from "./Chatting";
import './Table.css'
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import { FaSort } from "react-icons/fa";

const ChatAppContain = () => {
  const [Projectconverted, setProjectconverted] = useState([
    {
      Date: "21/01/2024",
      ProjectName: "Crm",
      Discrption: "done",
      quotation: "2lakh",
      finalprice: "1.5lak",
      Advancepaid: "30000",
      remaingamount: "20000",
      Projectduration: "2month",
      paidagain: "20000",
      remark: "done",
    },
    {
      Date: "21/02/2024",
      ProjectName: "e-commers",
      Discrption: "done",
      quotation: "32akh",
      finalprice: "3.5lak",
      Advancepaid: "40000",
      remaingamount: "10000",
      Projectduration: "1month",
      paidagain: "9800",
      remark: "way",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // Step 1

  // ... (unchanged)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const filteredTaskHistoryData = taskHistoryData.filter((item) => {

  //   return (
  //     item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.remark.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.approval.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // } );
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
  const [sortOrder, setSortOrder] = useState("asc");

  // const [Projectconverted, setProjectconverted]= useState()

  const handledate = () => {
    const sortedData = [...Projectconverted].sort((a, b) => {
      const [dayA, monthA, yearA] = a.Date.split("/");
      const [dayB, monthB, yearB] = b.Date.split("/");
  
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
  
      // Set the time to midnight to only consider the date portion
      dateA.setHours(0, 0, 0, 0);
      dateB.setHours(0, 0, 0, 0);
  
  
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  
    console.log("Sorted Data:", sortedData);
  
    setProjectconverted(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  
  const handledateone = () => {
    const sortedData = [...Projectconverted].sort((a, b) => {
      const [dayA, monthA, yearA] = a.Date.split("/");
      const [dayB, monthB, yearB] = b.Date.split("/");
  
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
  
      // Set the time to midnight to only consider the date portion
      // dateA.setHours(0, 0, 0, 0);
      // dateB.setHours(0, 0, 0, 0);
  
  
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  
  
    setProjectconverted(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Fragment>
      <Breadcrumbs
        mainTitle="Project converted"
        parent="Chat"
        title="Project converted"
      />

      <Row style={{ marginTop: "20px" }}>
        <Col xl="12">
          <h3>Project Converted History</h3>
          <div style={{ display: "flex" }} className="workinputnutton">
            <div
            //   style={ {
            //     display: "flex",
            //     position: "relative",
            //     left: "66%",
            //     top: "0",
            //     gap: "5px"
            // } }
            >
              <Input
                className="searchdaily"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  height: "35px",
                  width: "380px",
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
              <Button color="primary" onClick={handlePrint}>
                Print
              </Button>
            </div>
          </div>
          <div className="dailytasktable dailytasktable-1" >
            <Table id="myTable" className="myTable-1">
              <thead>
                <tr >
                  <th onClick={handledate}>
                    Date
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th  onClick={handledateone}
                  // onClick={ sortByTaskName }
                  >
                    Project Name
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
                 onClick={handledateone}
                  >
                   Discrption
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
                 onClick={handledateone}
                  >
                    quotation price
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
              onClick={handledateone}
                  >
                    final price
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
                  onClick={handledateone}
                  >
                    Advance paid
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th 
                 onClick={handledateone}
                  >
                   remaing price
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
                onClick={handledateone}
                  >
                  Project time
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
                  onClick={handledateone}
                  >
                   paid again
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                  <th
                  onClick={handledateone}
                  >
                  remark
                    <FaSort style={{ color: "#BABABA" }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Projectconverted.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Date}</td>
                    <td>{item.ProjectName}</td>
                    <td>{item.Discrption}</td>
                    <td>{item.quotation}</td>
                    <td>{item.finalprice}</td>
                    <td>{item.Advancepaid}</td>
                    <td>{item.remaingamount}</td>
                    <td>{item.Projectduration}</td>
                    <td>{item.paidagain}</td>
                    <td>{item.remark}</td>
                
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default ChatAppContain;
