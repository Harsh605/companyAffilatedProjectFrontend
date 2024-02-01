import React, { Fragment, useRef, useState} from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
} from "reactstrap";
import { FaSort, FaSortUp, FaSortDown, FaCheck } from 'react-icons/fa'; // Import the icons
import { Breadcrumbs } from "@mui/material";

const  UsersEditContain = () => {
  const [todayTaskFormData, setTodayTaskFormData] = useState({
    date: "",
    RefferalIncome: "",
    Image: "",
    TaskIncome: "",
    RewardIncome: "",
    TotalIncome:"",
  });


  const [todaytaskHistoryData, settodayTaskHistoryData] = useState([
    // Sample data, replace with your actual data
    {
      ProjectIncome :"162774",
      LevelIncome:"7346274",
      RefferalIncome: "24323",
       TaskIncome: "24343",
       RewardIncome: "7234246",
      TotalIncome:"345355",
    
    },
    {
      ProjectIncome :"213234",
      LevelIncome:"824385",
      RefferalIncome: "23423",
      TaskIncome: "342",
      RewardIncome: "23426",
      TotalIncome:"353453",
     
    },
    {
      ProjectIncome :"324243",
      LevelIncome:"3264642",
      RefferalIncome: "546",
      Image: "2347",
      TaskIncome: "247",
      RewardIncome: "3462",
      TotalIncome:"43534535",
     
    },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOrderone, setSortOrderone] = useState("asc");

 
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

  //------------------- today task history data-------------------------------------*/ 
  
  const copyTableone = () => {
    const table = document.getElementById("myTableone");
  
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


  const handlePrintone = () => {
    window.print();
  };
  const downloadTableAsCSVone = () => {
    const table = document.getElementById("myTableone");

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
// *----------end----------------//

 
  

  const [searchTerm, setSearchTerm] = useState(""); // Step 1

  // ... (unchanged)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [searchTermone, setSearchTermone] = useState(""); // Step 1
  const handleSearchChangeone = (e) => {
    setSearchTermone(e.target.value);
  };

  const filteredtodaytaskHistoryData = todaytaskHistoryData.filter((item) => {
    // Step 3
    return (
      item.ProjectIncome.toLowerCase().includes(searchTermone.toLowerCase()) ||
      item.LevelIncome.toLowerCase().includes(searchTermone.toLowerCase()) ||
       item.RefferalIncome.toLowerCase().includes(searchTermone.toLowerCase()) ||
      item.TaskIncome.toLowerCase().includes(searchTermone.toLowerCase()) ||
      item.RewardIncome.toLowerCase().includes(searchTermone.toLowerCase()) ||
      item.TotalIncome.toLowerCase().includes(searchTermone.toLowerCase())
    );
  } );

  const handleSortone = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    

    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortByRefferalIncomeone = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.RefferalIncome.localeCompare(b.RefferalIncome);
      } else {
        return b.RefferalIncome.localeCompare(a.RefferalIncome);
      }
    });
    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByImageone = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.Image.localeCompare(b.Image);
      } else {
        return b.Image.localeCompare(a.Image);
      }
    });
    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByProjectIncome = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.ProjectIncome.localeCompare(b.ProjectIncome);
      } else {
        return b.ProjectIncome.localeCompare(a.ProjectIncome);
      }
    });
    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

 

  const sortByTaskIncomeone = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.TaskIncome.localeCompare(b.TaskIncome);
      } else {
        return b.TaskIncome.localeCompare(a.TaskIncome);
      }
    });
    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

 
  const sortByRewardIncomeone = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.RewardIncome.localeCompare(b.RewardIncome);
      } else {
        return b.RewardIncome.localeCompare(a.RewardIncome);
      }
    });
    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  const sortByTotalIncomeone = () => {
    const sortedData = [...todaytaskHistoryData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.TotalIncome.localeCompare(b.TotalIncome);
      } else {
        return b.TotalIncome.localeCompare(a.TotalIncome);
      }
    });
    settodayTaskHistoryData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Daily Task" parent="Widgets" title="Daily Task" />
      <Container fluid={true} classLevelIncome="general-widget">
        {/* ... (unchanged) */ }
        
        <Row style={{ marginTop: "20px" }}>
          <Col xl="12">
            <div style={{display:"flex",gap:"20px"}} classLevelIncome="workinputnutton">
            <h3>My Income</h3>
            <div
            //   style={ {
            //     display: "flex",
            //     position: "relative",
            //     left: "66%",
            //     top: "0",
            //     gap: "5px"
            // } }
            >

            <Input classLevelIncome="searchdaily"
          type="text"
          placeholder="Search..."
          value={searchTermone}
          onChange={handleSearchChangeone}
                  style={ {
                  height:"35px",
            width:"380px"
            // marginTop:"15px"
            // position: "absolute"
            
          }}
        />
            </div>
              <div classLevelIncome="tableworkbuttondaily">
                

              <Button
                 color="primary"
                // style={{
                //   border: "1px solid #DEE2E6",
                //   width: "70px",
                //   height: "30px",
                // }}
                onClick={copyTableone}
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
                onClick={downloadTableAsCSVone}
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
                onClick={downloadTableAsCSVone}
              >
                Excel
              </Button>
              <Button
              color="primary"
                onClick={handlePrintone}
              >
                Print
              </Button>
             
              </div>
            </div>
            <div classLevelIncome="dailytasktable" style={{ overflowX: "auto" }}>
              
          
           
            <Table   id="myTableone">
              <thead>
                <tr>
                <th onClick={sortByProjectIncome}>
                Project Income
                      <FaSort style={{color:"#BABABA"}} />
                  </th>
                  <th onClick={sortByProjectIncome}>
                  Level Income
                      <FaSort style={{color:"#BABABA"}} />
                  </th>
                  <th onClick={ sortByTaskIncomeone }>Task Income
                    <FaSort style={{color:"#BABABA"}} />
                    </th>
                   
                    <th onClick={sortByRefferalIncomeone}>
                    Refferal Income
                      <FaSort style={{color:"#BABABA"}} />
                    </th>
                    
                    <th onClick={ sortByRewardIncomeone }>Reward Income  
                    <FaSort style={{color:"#BABABA"}} />
                    </th>
                    <th onClick={ sortByRewardIncomeone }>Total Income
                    <FaSort style={{color:"#BABABA"}} />
                    </th>
                  
                </tr>
              </thead>
              <tbody>
              {filteredtodaytaskHistoryData.map((item, index) => (
                  <tr key={index}>
                    
                    <td>{item.ProjectIncome}</td>
                    <td>{item.LevelIncome}</td>
                    <td>{item.TaskIncome}</td>
                    <td>{item.RefferalIncome}</td>
                    <td>
                      {item.RewardIncome}
                    </td>
                  <td>{item.TotalIncome}</td>
                   
                  </tr>
                ))}
              </tbody>
              </Table>
              </div>
          </Col>
        </Row>
      </Container>
    
   
    </Fragment>



  );
};

export default  UsersEditContain;