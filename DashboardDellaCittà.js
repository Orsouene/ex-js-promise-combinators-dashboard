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
    const [destinazioneRes, weathersRes, airoportsRes] =
      await Promise.allSettled(promise);

    console.log([destinazioneRes, weathersRes, airoportsRes]);
    // console.log(weathersRes[0]);
    let data = {};

    //! DESTINAZIONE
    if (destinazioneRes.status === "rejected") {
      console.log("invalid destination  errore  :", destinazioneRes.status);
      data.city = null;
      data.country = null;
    } else {
      const destinazione = destinazioneRes.value[0];
      data.city = destinazione ? destinazione.name : null;
      data.country = destinazione ? destinazione.country : null;
    }
    //! WEATHER
    if (weathersRes.status === "rejected") {
      console.log("invalid destination  errore  :", weathersRes.status);
      data.temperature = null;
      data.weather_description = null;
    } else {
      const weather = weathersRes.value[0];
      data.temperature = weather ? weather.temperature : null;
      data.weather = weather ? weather.weather_description : null;
    }
    //! AEROPORT
    if (airoportsRes.status === "rejected") {
      console.log("invalid destination  errore  :", destinazioneRes.status);
      data.airport = null;
    } else {
      const airoport = airoportsRes.value[0];
      data.airport = airoport ? airoport.name : null;
    }

    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`non trova la query : ${query} ${"=>"} ${error.message}`);
  }
}
getDashboardData("london")
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
