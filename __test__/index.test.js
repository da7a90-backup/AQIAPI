const axios = require('axios')
const nearest_city_url = 'http://127.0.0.1:3000/nearest_city'
const most_polluted_paris_url = "http://127.0.0.1:3000/paris/most_polluted"
  
describe('Nearest city and most polluted datetime for Paris', () => {
  test('Should get AQI data for city based on IP (latitude and longitude not given)', async () => {
    const res = await axios.get(nearest_city_url)

    expect(res).toBeTruthy()
    expect(res.status).toBe(200)
    expect(res.data.Result.Pollution.aqius).toBeTruthy()
  })
  test('Should get AQI data for city based on latitude and longitude', async () => {
    const lat = 35.98
    const lon = 140.33
    const res = await axios.get(`${nearest_city_url}?latitude=${lat}&longitude=${lon}`)

    expect(res).toBeTruthy()
    expect(res.status).toBe(200)
    expect(res.data.Result.Pollution.aqius).toBeTruthy()
  })
  test('Should get timestamp of the time where Paris was most polluted (based on DB records)', async () => {
    const res = await axios.get(most_polluted_paris_url)

    expect(res).toBeTruthy()
    expect(res.status).toBe(200)
    expect(new Date(res.data).getTime()).toBeTruthy()
  })
})
