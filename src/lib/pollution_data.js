import response_from_result from "../util/response_from_result.js";
import fetch from 'node-fetch';

const get_pollution_data = async (latitude, longitude) => {
    const url = `${process.env.AIR_VISUAL_API_URL}/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.AIR_VISUAL_API_KEY}`
    const result = await fetch(url)
    return result
}

const return_pollution_data = async (req, res)=>{
    const {longitude, latitude} = req.query

    if(!longitude && !latitude){
        const url = `${process.env.AIR_VISUAL_API_URL}/nearest_city?key=${process.env.AIR_VISUAL_API_KEY}`
        const result = await fetch(url)
        await response_from_result(result, res)
        return
    }

    const result = await get_pollution_data(latitude, longitude)

    await response_from_result(result, res)
}

export {return_pollution_data, get_pollution_data}