import Dropdownn from "./Dropdownn";
import React, { useEffect, useState } from "react";
import { getcandidates, uploadcsv } from "../service/service";
import "./DisplayTable.css";
import { Button, notification, Space } from "antd";


const DisplayTable = () => {
  const [data, setData] = useState([]);
  const [sampledata, setSampleData] = useState();
  const [text, setText] = useState("");
  const[flag, setFlag] = useState(false);
  const [file, setFile] = useState();

  useEffect(() => {
    getAllEmployees();
  }, [flag]);

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  const [api, contextHolder] = notification.useNotification();
  const successNotification = (type) => {
    const key = `open${Date.now()}`;

    api.open({
      type: type,
      message: "Success",
      duration: 2,
      description: "Data uploaded successfuly in databse ",
      // btn,
      key,
      onClose: close,
    });
  };

  const warnNotification = (type) => {
    const key = `open${Date.now()}`;

    api.open({
      type: type,
      message: "Failed",
      duration: 2,
      description: "Error occur in uploading ",
      // btn,
      key,
      onClose: close,
    });
  };

  const getAllEmployees = () => {
    getcandidates()
      .then((response) => {
        setData(response.data);
        setSampleData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let content;
  content = (
    <tbody>
      {data.map((candidate, index) => (
        <tr key={candidate.id}>
          <td>{index + 1}</td>
          <td>{candidate.firstname}</td>
          <td>{candidate.designation}</td>
          <td>{candidate.emailid}</td>
          <td>{candidate.contactnumber}</td>
          <td
            className={`${
              candidate.status === "S" ? "text-green-700" : `text-red-700`
            } font-semibold`}
          >
            {candidate.status === "S" ? "Sent" : "Not Sent"}
          </td>
        </tr>
      ))}
    </tbody>
  );

  const search = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
    const searchResult = sampledata.filter((post) => {
      return (
        // String(post.pid).toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.firstname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.designation.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.status.toLowerCase().includes(e.target.value.toLowerCase())
        // post.emailid.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setData(searchResult);
  };

  const handleOnChange = (e) => {
    console.log("selected")
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    uploadcsv(file).then((response) => {
      console.log(response);
      successNotification('success')
      setFlag(!flag);
      setFile(null);
    }).catch((e) =>  { 
      warnNotification('error');
      console.log(e)});

    console.log("uploading");
  }

  const handleClear = () => {
    setFile(null);
  }

  return (
    <>
    {contextHolder}
    <div>
      <div className="home_wrapper">
        <div className="table_data m-1">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Status</h3>
            <textarea
              style={{
                height: "3rem",
                paddingTop: "12px",
                paddingLeft: "10px",
                border: "1px solid black",
                // borderTop: "1px solid black",
                // borderLeft: "1px solid black",
                borderRadius: "5px",
              }}
              placeholder="Search here.."
              onChange={(e) => search(e)}
            ></textarea>
          </div>
          {data.length === 0 && (
            <i className="text-center w-[100%] mt-5 h-[50%] bg-slate-200 rounded flex justify-center  items-center">
              <h2>No Records Available</h2>
            </i>
          )}
          {data.length !== 0 && (
            <div className="table_wrapper">
              <table className="table ">
                <thead
                  //   style={{ border: "1px solid black" }}
                  className=" text-blue-600"
                >
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Sent Status</th>
                  </tr>
                </thead>
                {content}
              </table>
            </div>
          )}
        </div>
        <div style={{ marginTop: "15px",marginLeft:"45px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
          <div class="card" style={{
            // backgroundColor:"#E0F4FF",
            backgroundColor:"#EADBC8",
          boxShadow: "0 0 10px rgba(100, 100, 100, 0.26)",
          width: "300px",
          height: "110px",
        }}>
  <div class="card-body">
        <form onSubmit={handleOnSubmit}>
          {file ? (
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
              <div>
              <p>Selected file: {file.name}</p>
              </div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
              <button style={{marginRight:"7px"}} type="submit" class="btn btn-outline-success">Upload</button>
              <button type="button" class="btn btn-outline-danger" onClick={handleClear}>Clear</button>
              </div>
              {/* <Upload> */}
              {/* <Button type="submit" onSubmit={handleOnSubmit}  icon={<UploadOutlined />}>Upload</Button> */}
              {/* </Upload> */}
            </div>
          ) : (
            <div>
            <p>Upload Data</p>
            <input type={"file"} id="csvFileInput" accept=".csv" onChange={handleOnChange} />
            </div>
          )}
        {/* <input type="file" id="csvFileInput" accept=".csv" onChange={handleOnChange} value={file ? file.name : ''} />
        <button type="submit"
          // onClick={
          //   handleOnSubmit}
          >
          IMPORT 
        </button> */}
      </form>
      </div>
      </div>
          </div>
          <Dropdownn />
        </div>
      </div>
    </div>
    /</>
  );
};

export default DisplayTable;
