const response_from_result = async (result, res) => {
    const json = await result.json()

    if(json.status == 'fail'){
        res.status(result.status).json(json.data.message)
        return
    }
    const response = {Result:{
        Pollution: json.data.current.pollution
    }}

    res.status(200).json(response)
}

export default response_from_result