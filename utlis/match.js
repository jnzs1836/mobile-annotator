export function calculateGameScores(tableData, type) {
    let games = []
    if (type === "double") {

        for (let gameData of tableData) {
            let sideAScores = gameData.playerA1OpeningScore + gameData.playerA1SustainedScore
                + gameData.playerA2OpeningScore + gameData.playerA2SustainedScore;
            let sideBScores = gameData.playerB1OpeningScore + gameData.playerB1SustainedScore
                + gameData.playerB2OpeningScore + gameData.playerB2SustainedScore;
            games.push({
                a: sideAScores,
                b: sideBScores,
            })
        }


    } else {
        {
            for (let gameData of tableData) {
                let sideAScores = gameData.serviceScore + gameData.thirdStrokeScore
                    + gameData.serviceReceptionScore + gameData.forthStrokeScore
                    + gameData.fifthStrokeLaterScore;
                let sideBScores = gameData.serviceLose + gameData.thirdStrokeLose
                    + gameData.serviceReceptionLose + gameData.forthStrokeLose
                    + gameData.fifthStrokeLaterLose;
                games.push({
                    a: sideAScores,
                    b: sideBScores,
                })
            }


        }
    }
    return games;
}