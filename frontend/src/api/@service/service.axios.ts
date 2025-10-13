import axios, { isAxiosError } from "axios";
import AxiosInstance from "../@instance/AxiosInstance";
import type { Service } from "./service.type";


// instancia do axios para requisições do customer
const serviceInstane = axios.create({baseURL: `${AxiosInstance.defaults.baseURL}/services`})



const ServiceHttpActions = {

createService: async ({data}: {data: Service}) => {
    try {
        const createCustomer = await serviceInstane.post("/create", data)
        console.log(createCustomer)


        return {
            message: createCustomer.data.message,
            data: createCustomer.data.data as Service,
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

updateService: async ({data, id_service}: {data: Partial<Service>, id_service: string}) => {
    try {
        const updateCustomer = await serviceInstane.put(`/update/${id_service}`, data)
        console.log(updateCustomer)


        return {
            message: updateCustomer.data.message,
            data: updateCustomer.data.data as Service,
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
deleteService: async ({ id_service}: { id_service: string}) => {
    try {
        const updateCustomer = await serviceInstane.delete(`/delete/${id_service}`)
        


        return {
            message: updateCustomer.data.message,
            data: updateCustomer.data.data as Service,
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

getServices: async ( {page, limit} :{page: number, limit: number}) => {
    try {
        const findCustomers = await serviceInstane.get(`/all?page=${page}&limit=${limit}`)
        console.log(findCustomers)


        return {
            message: findCustomers.data.message,
            data: findCustomers.data.data as Service[],
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
getService: async ({id_service}: {id_service: string}) => {
    try {
        const service = await serviceInstane.get(`/${id_service}`)
        console.log(service)


        return {
            message: service.data.message,
            data: service.data.data as Service,
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


export default ServiceHttpActions