import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCredById, getAllIds } from "../service/service";
import "./Login.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [iderrormsg, setIderrormsg] = useState("");
  const [passerrormsg, setPasserrormsg] = useState("");
  const [crederrormsg, setCrederrormsg] = useState("");
  const [dataid, setDataid] = useState("");
  const [datapassword, setDatapassword] = useState("");
  const [ids, setIds] = useState([]);
  const [invaliduser, setInvaliduser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getIds();
    if (id) {
      getCredById(id)
        .then((response) => {
          setDataid(response.data.id);
          setDatapassword(response.data.pwd);
        })
        .catch((error) => {
          console.log(error);
          // setIderrormsg("Associate Id wrong")
        });
    }
  }, [id.length === 4]);

  const getIds = () => {
    // checkid();
    getAllIds()
      .then((response) => {
        setIds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkid = () => {
    if (id) {
      getCredById(id)
        .then((response) => {
          setDataid(response.data.id);
          setDatapassword(response.data.pwd);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const callLogin = async (e) => {
    // checkid();
    // await checkid();

    e.preventDefault();
    if (id === "") {
      setIderrormsg("Associate Id cannot be empty");
    } else if (password === "") {
      setPasserrormsg("Password cannot be empty");
    } else if (id != "" && password != "") {
      setIderrormsg("");
      setPasserrormsg("");
      setCrederrormsg("");
      var valid = false;

      for (let i in ids) {
        if (id == ids[i].id) {
          valid = true;
          break;
        }
        console.log("ids" + ids[i].id);
      }
      // checkid();
      console.log(valid);
      if (valid) {
        if (id == dataid && password == datapassword) {
          console.log(dataid);
          console.log(datapassword);
          // localStorage.setItem("token", 1);
        // localStorage.setItem("hrData",JSON.stringify( response));
          localStorage.setItem("token",1);
          localStorage.setItem("data", id);
          navigate("/home/display");
          console.log("Login success");
        } else {
          setCrederrormsg("Invalid Credentials");
          setIderrormsg("");
          setPasserrormsg("");
        }
      } else {
        setInvaliduser("User not found");
        console.log(dataid);
        console.log(datapassword);
      }
    } else {
      console.log("Enter your credentials");
    }
  };


  return (
    <>
      <div className="loginpage ">
        <div className="d-flex justify-content-start pb-4">
          <img
            src="../adp.png"
            alt="ADP Logo"
            className="img-fluid"
            style={{ width: "130px", height: "60px", margin: "10px" }}
          ></img>
        </div>
        <h2 className="text-center pb-4 pt-3">
          Welcome to E-letter<sup>®</sup>
        </h2>
        <div className="d-flex align-items-center justify-content-center h-100 pt-5">
          <div className="card shadow-lg rounded">
            <div className="card-body">
              <form>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="form-group pb-3">
                    <label className="form-label pb-1"> Associate Id :</label>
                    <input
                      type="text"
                      placeholder="Enter Associate Id"
                      name="id"
                      className="form-control"
                      onChange={(e) => setId(e.target.value)}
                      style={{ width: "auto" }}
                    ></input>
                    <small className="pb-2 text-danger">{iderrormsg}</small>
                  </div>
                  <div className="form-group pb-3">
                    <label className="form-label pb-1"> Password :</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "auto" }}
                    ></input>
                    <small className="pb-2 text-danger">{passerrormsg}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center pt-3 pb-2">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => callLogin(e)}
                  >
                    Login
                  </button>
                </div>
                <h6 className="pb-2 text-danger text-center">{crederrormsg}</h6>
              </form>
              <h6 className="text-danger text-center">{invaliduser}</h6>
            </div>
          </div>
        </div>
        <footer
          className="d-flex justify-content-end position-absolute bottom-0 end-0 w-100"
          style={{ height: "60px", "background-color": "#E3DFDA" }}
        >
          <div className="d-flex align-items-center justify-content-center pe-4">
            <p className="text-dark text-center pt-2">
              Copyright © 2023 ADP, Inc.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Login;
