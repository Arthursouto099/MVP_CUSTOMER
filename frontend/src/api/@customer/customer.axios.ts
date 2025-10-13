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
loginCustomer: async ({email, password}: {email: string, password: string}) => {
    try {
        const login = await customerInstance.post("/login", {email, password})
        console.log(login)


        return {
            message: login.data.message,
            data: login.data.data.token as string,
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

updateCustomer: async ({data, id_customer}: {data: Partial<Customer>, id_customer: string}) => {
    try {
        const updateCustomer = await customerInstance.put(`/update/${id_customer}`, data)
        


        return {
            message: updateCustomer.data.message,
            data: updateCustomer.data.data as Customer,
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
deleteCustomer: async ({ id_customer}: { id_customer: string}) => {
    try {
        const updateCustomer = await customerInstance.delete(`/delete/${id_customer}`)
        


        return {
            message: updateCustomer.data.message,
            data: updateCustomer.data.data as Customer,
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
getCustomer: async ({id_customer}: {id_customer: string}) => {
    try {
        const findCustomers = await customerInstance.get(`/${id_customer}`)
        console.log(findCustomers)


        return {
            message: findCustomers.data.message,
            data: findCustomers.data.data as Customer,
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