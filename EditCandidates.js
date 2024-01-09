import React, { useState, useEffect, useRef } from "react";
import { getUnsentCandidates } from "../service/service";
import { getSelectedCandidates } from "../service/service";
import { Button, notification, Space } from "antd";
import Dropdown from "react-bootstrap/Dropdown";
import "./EditCandidate.css";
import { useNavigate, useLocation } from "react-router-dom";

function EditCandidates() {
  let [candidates, setCandidates] = useState([]);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [offertype, setOfferType] = useState(location?.state || "offer_letter");
  console.log(location.state)



  const clickCount = useRef(0);

  useEffect(() => {
    getAllEmployees();
  }, [flag]);

  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      return { ...prevCheckedItems, [id]: !prevCheckedItems[id] };
    });
  };

  const close = () => {
    console.log(
      "Notification was closed. Either the close button was clicked or duration time elapsed."
    );
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button size="small" onClick={() => api.destroy()}>
          close
        </Button>
        <Button size="small" onClick={moveToPreview}>
          Preview
        </Button>
      </Space>
    );
    api.open({
      type: type,
      message: "Sent Successfuly",
      duration: 3,
      description:
        "Offer Letters that you selected sent successfuly. You can also view generated offer Letters by clicking preview button.",
      btn,
      key,
      onClose: close,
    });
  };

  const warnNotification = (type) => {
    api[type]({
      message: "Warning",
      description: "Please select the Candidates",
    });
  };

  const moveToPreview = () => {
    navigate("/home/preview", { state: { pdata: candidates, type: offertype } });
  };

  const getSelectedItems = () => {
    if (clickCount.current == 0) {
      clickCount.current += 1;
      const newarr = candidates.filter((item) => checkedItems[item.id]);
      console.log(newarr);
      getSelectedCandidates(newarr, offertype)
        .then((response) => {
          console.log(response);
          if (newarr.length === 0) {
            warnNotification("warning");
          } else {
            openNotification("success");
            setTimeout(() => {
              setFlag(!flag);
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        clickCount.current = 0;
      }, 3000);

      console.log(newarr);
    }
  };

  const handleCheckAll = () => {
    if (checkedItems.current === 0) {
      clickCount.current += 1;

      const allChecked = Object.fromEntries(
        candidates.map((item) => [item.id, true])
      );
      console.log("checked all");
      console.log(allChecked);
      console.log(candidates);
      setCheckedItems(allChecked);
      console.log(" all");
      getSelectedCandidates(candidates)
        .then((response) => {
          if (candidates.length === Object.keys(allChecked).length) {
            openNotification("success");
            setTimeout(() => {
              setFlag(!flag);
            }, 1000);
          } else {
            warnNotification("warning");
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        clickCount.current = 0;
      }, 3000);

      console.log(candidates);
    }
  };

  const handleSelect = (selectedValue) => {
    setOfferType(selectedValue);
    console.log(selectedValue);
  };

  const getAllEmployees = () => {
    getUnsentCandidates()
      .then((response) => {
        setCandidates(response.data);
        console.log(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("My ....");
  console.log(candidates);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => setSearchTerm(event.target.value);
  candidates = candidates.filter((item) => {
    if (
      item.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doj.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.salary.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.worklocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm)
    ) {
      return item;
    }
  });

  return (
    <>
      {contextHolder}
      <div class="mx-auto w-100 ">
        <br />

        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <div style={{border:"1px solid black", height:"2.5rem", borderRadius:"20px", marginTop:"7px", marginLeft:"10px"}}>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle
              variant=""
              id="dropdown-basic"
            >
              {offertype || "Select Value"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="offer_letter">
                Offer Letter
              </Dropdown.Item>
              <Dropdown.Item eventKey="bonus_letter">
                Bonus Letter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{marginLeft:"28rem", position:"fixed"}}>
        <h1 >Candidates List</h1>
        </div>
        <div
          class="position-relative"
          style={{ transform: "translate(-50px,20px)" }}
        >
          <div class="position-absolute top-0 end-0 translate-middle-y">
            <textarea
              style={{
                height: "2.5rem",
                marginTop: "13px",
                paddingTop: "8px",
                paddingLeft: "10px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
              placeholder="Search here.."
              onChange={(e) => handleSearch(e)}
            ></textarea>
          </div>
        </div>
        </div>
        <br />
        <div class="row justify-content-center">
          <div class="col-auto wrapper" style={{}}>
            <table
              class="table table-hover container-fluid mx-auto table table-responsive mx-auto "
              margin
            >
              <thead class="table-dark theadd ">
                <tr>
                  <td>select</td>
                  <td>ID</td>
                  <td>FIRSTNAME</td>
                  <td>LASTNAME</td>
                  <td>SALARY</td>
                  <td>ADDRESS</td>
                  <td>DESIGNATION</td>
                  <td>DOJ</td>
                  <td>CONTACTNUMBER</td>
                  <td>EMAILID</td>
                  <td>WORKLOCATION</td>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr>
                    <td>
                      {" "}
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id={`${candidate.id}`}
                        onChange={() => handleCheckboxChange(candidate.id)}
                        checked={checkedItems[candidate.id] || false}
                        value=""
                        aria-label="..."
                      />
                    </td>
                    <td>{candidate.id}</td>
                    <td>{candidate.firstname}</td>
                    <td>{candidate.lastname}</td>
                    <td>{candidate.salary}</td>
                    <td>{candidate.address}</td>
                    <td>{candidate.designation}</td>
                    <td>{candidate.doj}</td>
                    <td>{candidate.contactnumber}</td>
                    <td>{candidate.emailid}</td>
                    <td>{candidate.worklocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <div class="container">
        <div class="row">
          <div
            class="btn-group d-grid gap-2 d-md-block col text-center"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={getSelectedItems}
            >
              Generate
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={handleCheckAll}
            >
              GenerateAll
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={moveToPreview}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditCandidates;
