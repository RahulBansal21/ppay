import React from 'react'
import axios from "axios";

const USERS_REST_API_URL = "http://localhost:8080/api/public/register";
function userServices() {
  return (
    axios.post(USERS_REST_API_URL)
  )
}

export default userServices