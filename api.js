import {getFakeMatchData, getFakeMatchList} from 'fake'


export function loginAction(payload){
    if (payload.password == "correct"){
        return true;
    } else{
        return false;
    }
}

export function submitAnnotation(payload) {
    return true;
}


export async function fetchMatch({matchId}){
    let data = getFakeMatchData();
    return {
        id: 0,
        data: data,
    }
}

export async function fetchMatchList() {
    let data = getFakeMatchList()
    return {
        data: data
    }
}