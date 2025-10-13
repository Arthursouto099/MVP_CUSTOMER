import axios, { isAxiosError } from "axios";
import AxiosInstance from "../@instance/AxiosInstance";
import type { Vehicle } from "./vehicle.type";


// instancia do axios para requisições do customer
const vehicleIstance = axios.create({baseURL: `${AxiosInstance.defaults.baseURL}/vehicles`})



const VehicleHttpActions = {

createVehicles: async ({data}: {data: Vehicle}) => {
    try {
        const vehicleCreated = await vehicleIstance.post("/create", data, {headers: {Authorization: `bearer ${localStorage.getItem("token")}`}})
        console.log(vehicleCreated)


        return {
            message: vehicleCreated.data.message,
            data: vehicleCreated.data.data as Vehicle,
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

updateVehicle: async ({data, id_vehicle}: {data: Partial<Vehicle>, id_vehicle: string}) => {
    try {
        const vehicleUpdated = await vehicleIstance.put(`/update/${id_vehicle}`, data)
        console.log(vehicleUpdated)


        return {
            message: vehicleUpdated.data.message,
            data: vehicleUpdated.data.data as Vehicle,
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
deleteVehicle: async ({ id_vehicle}: { id_vehicle: string}) => {
    try {
        const vehicle = await vehicleIstance.delete(`/delete/${id_vehicle}`)
        


        return {
            message: vehicle.data.message,
            data: vehicle.data.data as Vehicle,
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

getVehicles: async ( {page, limit} :{page: number, limit: number}) => {
    try {
        const vehicles = await vehicleIstance.get(`/all?page=${page}&limit=${limit}`, {headers: {Authorization: `bearer ${localStorage.getItem("token")}`}})

        console.log(vehicles)


        return {
            message: vehicles.data.message,
            data: vehicles.data.data as Vehicle[],
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
getVehicle: async ({id_vehicle}: {id_vehicle: string}) => {
    try {
        const service = await vehicleIstance.get(`/${id_vehicle}`)
        console.log(service)


        return {
            message: service.data.message,
            data: service.data.data as Vehicle,
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


export default VehicleHttpActions