async function getCountries() {
  const container = document.getElementById("country");
  const apiResult = await fetch("https://restcountries.com/v3.1/all");
  const countries = await apiResult.json();
  countries.sort((a, b) =>
    a.name.common.toUpperCase() < b.name.common.toUpperCase() ? -1 : 1
  );

  let content = "";

  countries.forEach((country) => {
    content += `
        <option value="${country.name.common}">
          ${country.name.common}
        </option>
    `;
  });

  container.innerHTML = content;
}

getCountries();
