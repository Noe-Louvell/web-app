import { message, notification } from "antd";
import axios from "axios";
import Cookies from 'js-cookie';
import router from "next/router";
import { useContext } from "react";
import { ContextApp } from "./Context/ContextAuth/ContextAuth";

const instance = axios.create({
    baseURL:'http://localhost:3000/api'
})


export default instance;