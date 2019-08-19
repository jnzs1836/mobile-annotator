const initialTable = {

    // Game index
    // 局数
    id: 0,
    gameVisible: 0,

    //  opening: service to the forth stroke
    //  开局阶段，发球到第四拍

    //  sustained: rally
    //  相持阶段

    // Player A1
    playerA1OpeningScore: 0,
    playerA1OpeningLose: 0,
    playerA1SustainedScore: 0,
    playerA1SustainedLose: 0,

    // Player A2
    playerA2OpeningScore: 0,
    playerA2OpeningLose: 0,
    playerA2SustainedScore: 0,
    playerA2SustainedLose: 0,

    // Player B1
    playerB1OpeningScore: 0,
    playerB1OpeningLose: 0,
    playerB1SustainedScore: 0,
    playerB1SustainedLose: 0,

    // Player B2
    playerB2OpeningScore: 0,
    playerB2OpeningLose: 0,
    playerB2SustainedScore: 0,
    playerB2SustainedLose: 0,


    operations: [],
};
let matchData = {

    metaData:{
        playerA1: "A",
        playerB1: "B",
        place: "广州",
        date: '07/15/2019',
        type: "世锦赛",
        entry: "single-man",
        round: 'final',
        year:2019,
        month:7,
        day:15,

    },

    tableData:
        [
            initialTable,
            initialTable,
            initialTable,
        ],
    gameVisible: 0,

};

export async function getFakeMatchData() {
    return matchData;
}