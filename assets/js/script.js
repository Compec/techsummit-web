// Auto-copyright (c)
document.querySelector("#year").innerText = new Date().getFullYear()

// Auto-fill & GS integration START
const API_KEY = "AIzaSyATnlWZtGiZ8TbWOCCkFY5LeSC_FYlOOLY"
const SPREADSHEET_ID = "1RLYg8Z5GLMANyw9oJ6XBUEcT3j4Chr4mFU0RhPGD1S0"
const DATA_RANGE = "B5:H"
function getSheetValues() {
	gapi.client.init({
        "apiKey": API_KEY,
		    "discoveryDocs": ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    }).then(() => {
		return gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: SPREADSHEET_ID,
			range: DATA_RANGE
		})
	}).then((response) => {
		    let loadedData = response.result.values
        let el2Fill = document.querySelectorAll(".event-details")
        for (let i=0; i<loadedData.length; i++) {
            let el2Append = document.createElement("li")
            el2Append.innerHTML = ` 
                                  <a data-bs-toggle="modal" data-bs-target="#modal" data-modal-id="${i}">                             
                                    <span class="event-time">${loadedData[i][5].slice(0,5)}</span> - <span>${loadedData[i][3]} (${loadedData[i][0]})</span>
                                    <br>
                                    <span class="event-location">${loadedData[i][4]}</span>
                                  </a>
                                  `
            el2Append.addEventListener("click", function() {
              let modal = document.querySelector("#modal .modal-body")
              let modal_id = this.querySelector("a").getAttribute("data-modal-id")
              modal.querySelectorAll("p")[0].innerText = loadedData[modal_id][5] + " | " + loadedData[modal_id][4]
              modal.querySelector("img").src = loadedData[modal_id][2] ? loadedData[modal_id][2] : "assets/img/default.png"
              modal.querySelector("h4").innerText = loadedData[modal_id][0]
              modal.querySelectorAll("p")[1].innerText = loadedData[modal_id][3]
              modal.querySelectorAll("p")[2].innerText = loadedData[modal_id][1]
            })
            el2Fill[loadedData[i][6] - 1].appendChild(el2Append)
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
gapi.load("client", getSheetValues)