import axios, { isAxiosError } from "axios";
import AxiosInstance from "../@instance/AxiosInstance";
import type { Customer } from "./customer.type";


// instancia do axios para requisições do customer
const customerInstance = axios.create({baseURL: `${AxiosInstance.defaults.baseURL}/customer`})



const CustomerHttpActions = {

createCustomer: async ({data}: {data: Customer}) => {
    try {
        const createCustomer = await customerInstance.post("/create", data)
        console.log(createCustomer)


        return {
            message: createCustomer.data.message,
            data: createCustomer.data.data as Customer,
            success: true 
        }
    }
    catch(e) {
        
        if(isAxiosError(e)) {
        return {
            message: e.message,
            error: e.cause,
            stack: e.stack,
            success: true
        }
        }

        return {
            message: "Error não esperado...",
            success: true
        }
    }

},

getCustomers: async ( {page, limit} :{page: number, limit: number}) => {
    try {
        const findCustomers = await customerInstance.get(`/all?page=${page}&limit=${limit}`)
        console.log(findCustomers)


        return {
            message: findCustomers.data.message,
            data: findCustomers.data.data as Customer[],
            success: true 
        }
    }
    catch(e) {
        
        if(isAxiosError(e)) {
        return {
            message: e.message,
            error: e.cause,
            stack: e.stack,
            success: true
        }
        }

        return {
            message: "Error não esperado...",
            success: true
        }
    }

},


}


export default CustomerHttpActions