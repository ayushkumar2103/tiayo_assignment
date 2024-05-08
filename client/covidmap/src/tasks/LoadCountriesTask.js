import papa from "papaparse";
import legendItems from "../entities/LegendItems";
import { features } from "../data/countries.json";

class LoadCountryTask {
  covidUrl =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";

  setState = null;

  load = (setState) => {
    this.setState = setState;

    papa.parse(this.covidUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data),
    });
  };

  #processCovidData = (covidCountries) => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      const covidCountry = covidCountries.find(
        (covidCountry) => country.properties.ISO_A3 === covidCountry.ISO3
      );

      country.properties.confirmed = 0;
      country.properties.confirmedText = "";
      country.properties.active = 0;
      country.properties.activeText = "";
      country.properties.recovered = 0;
      country.properties.recoveredText = "";
      country.properties.death = 0;
      country.properties.deathText = "";

      if (covidCountry != null) {
        let confirmed = Number(covidCountry.Confirmed);
        let active = Number(covidCountry.Active);
        let recovered = Number(covidCountry.Recovered);
        let death = Number(covidCountry.Deaths);
        country.properties.confirmed = confirmed;
        country.properties.active = active;
        country.properties.recovered = recovered;
        country.properties.death = death;
        active=confirmed/50;recovered=confirmed/(1.5);                         
        country.properties.confirmedText = this.#formatNumberWithCommas(
          confirmed,
          "Total Confirmed"
        );
        country.properties.activeText = this.#formatNumberWithCommas(
          active,
          "Total Active Cases"
        );
        country.properties.recoveredText = this.#formatNumberWithCommas(
          recovered,
          "Total recovered Cases"
        );
        country.properties.deathText = this.#formatNumberWithCommas(
          death,
          "Total Deaths Cases"
        );

      }
      this.#setCountryColor(country);
    }

    this.setState(features);
  };

  #setCountryColor = (country) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(country.properties.confirmed)
    );

    if (legendItem != null) country.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = (n1,t1) => {
    const formattedNumber1 = n1.toLocaleString();
    return `"${t1}: ${formattedNumber1}"`;
  };
}

export default LoadCountryTask;
