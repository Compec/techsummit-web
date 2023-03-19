// Auto-copyright (c)
document.querySelector("#year").innerText = new Date().getFullYear()

// Auto-fill & GS integration START
const API_KEY = "AIzaSyATnlWZtGiZ8TbWOCCkFY5LeSC_FYlOOLY"
const SPREADSHEET_ID = "1RLYg8Z5GLMANyw9oJ6XBUEcT3j4Chr4mFU0RhPGD1S0"
const DATA_RANGE = "B5:F"
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
            el2Fill[loadedData[i][4] - 1].innerHTML += `<li>                                    
                                    <span class="event-time">${loadedData[i][3]}</span> - <span>${loadedData[i][1]} (${loadedData[i][0]})</span>
                                    <br>
                                    <span class="event-location">${loadedData[i][2]}</span>
                                </li>
                                `
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