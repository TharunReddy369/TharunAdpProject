import axios from 'axios';


const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8085/candidates';

export const getcandidates = async ()=>{
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL+'/get');
    return response;
};

export const getUnsentCandidates = async ()=>{
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL+'/get-unsent-list');
    return response;
};

 export const getSelectedCandidates = async (candidates, type) => {
    console.log("candidates.....")
    console.log(candidates)
    console.log(candidates)
      const response = await axios.post(EMPLOYEE_BASE_REST_API_URL+'/getlist',{totallist:candidates, type:type} );
     // const response = await axios.post(EMPLOYEE_BASE_REST_API_URL+'/getlist',candidates);
      return response;
  }


export const analyticsData = async ()=>{
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL+'/analytics');
    return response;
};

export const analyticsDataByMonth = async ()=>{
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL+'/by-doj');
    return response;
};

export const analyticsCombined = async ()=>{
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL+'/combined-results');
    return response;
};

export const getCredById = async (id) => {
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL + "/eletter/letter/" + id);
    return response;
}



export const getAllIds = async () => {
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL + "/eletter/allcreds");
    return response;
}

export const getpreviewcandidates = async ()=>{
    const response = await axios.get(EMPLOYEE_BASE_REST_API_URL+'/getpreview');
    console.log("preview.....")


    console.log(response);
    return response;
};

export const uploadcsv = async (file) => {
    const formdata = new FormData();
    formdata.append('file', file);
    const response = await axios.post(EMPLOYEE_BASE_REST_API_URL + "/upload-csv", formdata,
    {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
    );
    console.log("upoading");

    return response;
}