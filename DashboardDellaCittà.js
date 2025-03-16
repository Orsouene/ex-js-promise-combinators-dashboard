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

    return {
      city: destinazione[0].name,
      country: destinazione[0].country,
      temperature: weathers[0].temperature,
      weather: weathers[0].weather_description,
      airport: airoports[0].name,
    };
  } catch (error) {
    throw new Error("errore nel recupero di dati : ", error.message);
  }
}
getDashboardData("london")
  .then((data) => {
    // console.log("Dasboard data:", data);
    console.log(
      `${data.city} is in ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
        `The main airport is ${data.airport}.\n`
    );
  })
  .catch((error) => console.error(error));
