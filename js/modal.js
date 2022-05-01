/*
   Filename: modal.js

   Purpose: Logic that display information quering rest API with id
*/

async function showMovie(id) {
  const container = document.getElementById("modalContent");
  const apiResult = await apiCall(`Title/k_3ia6todj/${id}`);
  container.classList.remove("lds-ring");

  const {
    fullTitle,
    releaseDate,
    contentRating,
    image,
    stars,
    plot,
    directors,
    genres,
    runtimeStr,
    trailer,
    awards,
    writers,
    companies,
    languages,
  } = apiResult;

  container.innerHTML = `
    <div class="row">
        <div class="col-12 col-md-4">
            <img 
                class="img-fluid"
                src="${image}"  
                alt="" loading="lazy"
            />
        </div>

        <div class="col-12 col-md-8">
            <h2>${fullTitle}</h2>
            <h6>
                ${releaseDate ? `Realease Date: ${releaseDate}` : ""}
                ${
                  contentRating
                    ? `<span class="badge rounded-pill bg-info">${contentRating}</span>`
                    : ""
                }
            </h6>

            <hr>

            <p><b>Stars:</b> ${stars || "N/A"}</p>
            <p><b>Summary:</b> ${plot || "N/A"}</p>
            <p>
                <b>Director(s):</b> ${directors || "N/A"}<br>
                <b>Writer(s):</b> ${writers || "N/A"}<br>
                <b>Companies:</b> ${companies || "N/A"}<br>
                <b>Genre(s):</b> ${genres || "N/A"}<br>
                <b>Language(s):</b> ${languages || "N/A"}<br>
                <b>Award(s):</b> ${awards || "N/A"}<br>
                <b>Runtime:</b> ${runtimeStr || "N/A"}<br>
            </p>

            ${
              trailer
                ? `
                    <video width="320" height="240" controls>
                        <source src="${trailer}">
                        Your browser does not support the video tag.
                    </video>
                  `
                : ""
            }
        </div>
    </div>
  `;
}
