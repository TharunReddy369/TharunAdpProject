import React, { useState, useEffect } from "react";
import { getpreviewcandidates } from "../service/service";
import { useLocation } from "react-router-dom";
function Preview() {
  let [candidates, setCandidates] = useState([]);
  const location = useLocation();
  const receiveddata = location.stata?.pdata || [];
  const[type, settype] = useState(location.state?.type || "");
  useEffect(() => {
    getAllEmployees();
  }, []);

  let [count, setCount] = useState(0);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else setCount(0);
  };
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }
  const [currentDate, setCurrentDate] = useState(getDate());

  const [mydata, setdata] = useState([{ firstname: "xyz" }]);
  const getAllEmployees = () => {
    getpreviewcandidates()
      .then((response) => {
        setCandidates(response.data);
        console.log("aaa");
        console.log(response.data);
        if (response.data.length === 0) {
          console.log("empty");
          setdata([{ firstname: "John", lastname: "Doe" }]);
        } else {
          setdata(response.data);
        }
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setdata([
          { firstname: "John", lastname: "Doe", designation: "developer" },
        ]);
      });
  };
  const increment = () => {
    console.log(count + " " + mydata.length);
    if (count < mydata.length - 1) {
      setCount(count + 1);
    } else setCount(mydata.length - 1);
  };
  return (
    <>
    <div style={{}}>

      <h1 class="text-center">Preview List</h1>
      <div
        class="card mx-auto my-auto"
        style={{
          width: "50rem",
          background: `url(${"https://online.adp.com/api/brand-service/v1/brands/image?productId=$default$&imageId=ADP_default_background.png"})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      >
        {type !== "bonus_letter" ? (
        <div class="card-body">
          <h5 class="card-title mx-auto">Offer Letter</h5>
          <p class="card-text">
            <p>{currentDate}</p>
            <br />
            Dear {mydata[count].firstname + " " + mydata[count].lastname},<br />
            <p>
              Congratulations! We are pleased to extend an offer for you to be a
              part of ADP. Please find the offer details below:
            </p>
            <p>
              {" "}
              Grade & Position:{mydata[count].designation || "developer"} <br />
              Start Date:{mydata[count].doj || "2023-11-25"} <br />
              Compensation:{mydata[count].salary || 600000} <br />
              Location:{mydata[count].worklocation || "Hyderabad"}
              <br />
              On the date of joining, please report at the Experienced Plaza for
              documentation and orientation. If this date is not acceptable,
              please report to me through the email attached at the earliest
              opportunity. We are confident you will be able to make a
              significant contribution to the success of our beloved
              organization and look forward to working with you.
              <br />
              Sincerely, <br />
              Maria White
              <br />
              mariawhite@adp.com
              <br />
              Head of HR
              <br />
              ADP, Hyderabad
              <br />
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <a href="#" class="btn btn-primary" onClick={decrement}>
                prev
              </a>
              <a href="#" class="btn btn-primary" onClick={increment}>
                next
              </a>
            </div>
          </p>
        </div>
      ) : (
        <div class="card-body">
        <h5 class="card-title mx-auto">Appraisal  Letter</h5>
        <br />
        <p class="card-text">
          <p>{currentDate}</p>
          From 
          <br />
ADP Hyderabad 
<br />
Date: {currentDate}
<br />
To
<br />
Subject: Bonus Declaration for {mydata[count].salary || 600000}
<br />
Dear {mydata[count].firstname + " " + mydata[count].lastname}
<br />
Warm congratulations to you for making it to the list of “Best Performers of {mydata[count].designation || "developer"}  ”. We highly appreciate you for working hard and success.
<br />
As per the company policy, we offer annual bonus to all our employees who feature in the list of best performers as a gesture to show our appreciation towards the hard work you have put in. We, therefore, announce a bonus of Rs. 3000   for you which will reflect in your next pay check.
<br />
We again extend a warm thank you for being an inspiring and committed employee. We are certainly fortunate to have you in our company.

            <br />
            Sincerely, <br />
            Maria White
            <br />
            mariawhite@adp.com
            <br />
            Head of HR
            <br />
            ADP, Hyderabad
            <br />
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <a href="#" class="btn btn-primary" onClick={decrement}>
              prev
            </a>
            <a href="#" class="btn btn-primary" onClick={increment}>
              next
            </a>
          </div>
      </div>
      )}
      </div>
      </div>
    </>
  );
}
export default Preview;
