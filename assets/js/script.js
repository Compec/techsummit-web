// Auto-copyright (c)
document.querySelector("#year").innerText = new Date().getFullYear()

// Auto-fill & GS integration START
const API_KEY = "AIzaSyATnlWZtGiZ8TbWOCCkFY5LeSC_FYlOOLY"
const SPREADSHEET_ID = "1RLYg8Z5GLMANyw9oJ6XBUEcT3j4Chr4mFU0RhPGD1S0"
const DATA_RANGE = ["B5:H","J5:L"]
function getSheetValues() {
	gapi.client.init({
        "apiKey": API_KEY,
		    "discoveryDocs": ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    }).then(() => {
		return gapi.client.sheets.spreadsheets.values.batchGet({
			spreadsheetId: SPREADSHEET_ID,
			ranges: DATA_RANGE
		})
	}).then((response) => {
		    fetchedData = response.result.valueRanges
        let loadedData = fetchedData[0].values
        let el2Fill = document.querySelectorAll(".event-details")
        
        for (let i=0; i<loadedData.length; i++) {
            let el2Append = document.createElement("li")
            el2Append.innerHTML = `
                                  <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                      <div class="modal-body d-flex align-items-sm-center"><img class="rounded-circle mb-3 fit-cover" width="80" height="80" src=${loadedData[i][2] ? loadedData[i][2] : "assets/img/default.png"}>
                                          <div>
                                              <p style="margin-left: 16px;margin-bottom: 2px;margin-top: 4px; font-weight: bold;font-size: 12px;"><span style="color: var(--bs-blue);">${loadedData[i][5]} |</span><span> ${loadedData[i][0]}</span></p>
                                              <p style="margin-left: 16px;margin-bottom: 6px;">${loadedData[i][3]}</p>
                                              <p style="margin-left: 16px;font-size: 12px;">${loadedData[i][1]}</p>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                  `
            el2Fill[loadedData[i][6] - 1].appendChild(el2Append)
        }
        loadedData = fetchedData[1].values
        let colors = {
          "Ana Sponsor":"#61de2a",
          "Platin Sponsor":"#36d0ff",
          "Altın Sponsor":"#fa921f",
          "Stant Sponsoru": "#fa4a4a",
          "Çekiliş Sponsoru": "#fa4a4a"
        }
        el2Fill = document.querySelector(".slide-track")
        for (let i=0; i<loadedData.length; i++) {
          let el2Append = document.createElement("div")
          el2Append.class = "d-flex flex-column slide"
          el2Append.style = "text-align: center; margin: 10px 40px"
          el2Append.innerHTML = `
                                <img src=${loadedData[i][1]} class="mb-3 fit-cover" style="width: 130px; border: 5px solid ${colors[loadedData[i][2]]}; border-radius: 50%">
                                <h5 class="fw-bold text-primary"><strong>${loadedData[i][0]}</strong></h5>
                                <p class="text-muted" style="margin-top: -7px">${loadedData[i][2]}</p>
                                `
          el2Fill.appendChild(el2Append)
        }
	})
}
// Auto-fill & GS integration END
// JParticles.Wave START
new JParticles.Wave("#hero-bg", {
    num: 3,
    // Draw line
    line: true,
    // The colors of the three lines in sequence
    lineColor: [
        "red",
        "green",
        "blue"
    ],
    // The width of the three lines in turn
    lineWidth: [0.5, 0.7, 0.9],
    // The offset value of the three lines from the left in turn
    offsetLeft: [2, 1, 0],
    // All three lines are 0.75 times the height of the top offset container
    offsetTop: 0.75,
    // The height of the crests of the three lines in sequence
    crestHeight: [10, 14, 18],
    // All three lines have only two crests
    crestCount: 2,
    speed: 0.1
})
document.querySelector("#hero-bg").style.display = "block"
document.querySelector("#hero-bg canvas").style.position = "absolute"
// JParticles.Wave END
// Glider START
// Glider END
gapi.load("client", getSheetValues)