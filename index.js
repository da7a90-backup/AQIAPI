import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import {get_pollution_data, return_pollution_data} from './src/lib/pollution_data.js';
import {insert_row_in_paris_pollution_table, get_highest_aqius_reading_paris} from './src/data/supabase_client.js';

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cors())

app.get('/nearest_city', async (req, res) => await return_pollution_data(req, res))

app.get('/paris/most_polluted', async (req, res) => {
    const highest_aqius = await get_highest_aqius_reading_paris()
    res.status(200).json(highest_aqius)
})

app.listen(3000, () => {
    console.log("server is running at port 3000")

    cron.schedule('* * * * *', async () => {
        console.log("running job")
        const data = await get_pollution_data(process.env.PARIS_LATITUDE, process.env.PARIS_LONGITUDE)
    
        const json = await data.json()
    
        await insert_row_in_paris_pollution_table(json.data.current.pollution)
    },{
        scheduled: true,
        timezone: "Europe/Paris"
      });
  })