# AQIAPI

# Running the server locally
Clone the repository <br>`git clone https://github.com/da7a90-backup/AQIAPI.git` <br>
then run <br> `cd AQIAPI` <br>
install the dependencies with <br> `npm install` <br>
then start the server with either <br> `npm start` or `npm run dev`

# Running tests
`npm run test`

# Database 
The Database used here is a Postgres instance on Supabase. It contains only one table `paris_pollution` with the following definition:
```
{
id: PK int8 identity (Auto-increment)
aqius: numeric 
mainus: text
aqicn: numeric
maincn: text
ts: numeric (unix timestamp in ms)
}
```

# Data Access

I'm using the Supabase JS client to access the data through their REST API.

# Env
I've included a .env file with the required Supabase and Airvisual API URLS and Keys (throwaway accounts so you can test without creating accounts).

# CRON

I'm using node-cron to schedule a cron job upon starting the server. It fetches the pollution data for the Paris region from the AirVisual API every minute, checks our Database 
to see if the returned result's timestamp matches one we already have (impossible to have different readings for the exact same timestamp) this helps us avoid cluttering the table with
duplicates, if it doesn’t match any record we insert it into our table otherwise we skip it.

# API

<b>GET /nearest_city</b>: <br>
  a. parameters: latitude - Number (Optional), longitude - Number (Optional) <br>
  b. behaviour: returns the air quality data from the AirVisual API for the nearest city according to IP if no params are specified or the nearest city to GPS coordinates if latitude and longitude are specified. <br>
  c. example result: 
```
{
    "Result": {
        "Pollution": {
            "ts": "2023-08-30T00:00:00.000Z",
            "aqius": 25,
            "mainus": "p2",
            "aqicn": 9,
            "maincn": "p2"
        }
    }
}
``` 
<b>GET /paris/most_polluted</b>: <br>
  a. parameters: none <br>
  b. behaviour: returns the datetime where the paris region was most polluted according to the data gathered from the CRON job and saved to the database.<br>
  c. example result: <br> `"2023-08-29T23:00:00.000Z"`

