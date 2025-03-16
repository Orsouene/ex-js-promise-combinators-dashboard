async function getDashboardData(query) {
  try {
    //*Città
    const cityName = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`
    ).then((res) => res.json());
    //*Meteo
    const meteo = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`
    ).then((res) => res.json());
    //*Aeroporto
    const aeroporto = fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`
    ).then((res) => res.json());
    // console.log("Weather oggetto", meteo);
    // console.log("city oggetto", cityName);
    // console.log("Aeroporto oggetto", aeroporto);
    const promise = [cityName, meteo, aeroporto];
    const [destinazione, weathers, airoports] = await Promise.all(promise);
    // console.log([destinazione, weathers, airoports]);
    // console.log(weathers[0]);
    return {
      city: destinazione[0] ? destinazione[0].name : null,
      country: destinazione[0] ? destinazione[0].country : null,
      temperature: weathers[0] ? weathers[0].temperature : null,
      weather: weathers[0] ? weathers[0].weather_description : null,
      airport: airoports[0] ? airoports[0].name : null,
    };
  } catch (error) {
    throw new Error(`non trova la query : ${query} ${"=>"} ${error.message}`);
  }
}
getDashboardData("vienna")
  .then((data) => {
    // console.log("Dasboard data:", data);
    if (data.city != null && data.country != null) {
      console.log(`${data.city} is in ${data.country}.\n`);
    }
    if (data.temperature != null && data.weather != null) {
      console.log(
        ` Today there are${data.temperature} degrees and the weather is ${data.weather}.\n`
      );
    }
    if (data.airport != null) {
      console.log(`The main airport is ${data.airport}.\n`);
    }
  })
  .catch((error) => console.error(error));
