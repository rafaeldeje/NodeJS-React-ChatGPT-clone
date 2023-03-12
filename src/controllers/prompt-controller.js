const InputPrompt = require("../models/input-model")
const openai = require ("../config/openai")

module.exports ={
    async sendText(req, res){

        const openaiAPI = openai.configuration()
        const inputModel = new InputPrompt(req.body)

        try {
            const response = await openaiAPI.createCompletion(
                openai.textCompletion(inputModel)
            )
            return res.status(200).json({
                sucess: true,
                data: response.data.choises[0].text
            })

        } catch (error) {

            return res.status(400).json({
                sucess: false,
                error: error.response
                ? error.response.data
                : 'tem erro no servidor'
            })
        }
    }
}