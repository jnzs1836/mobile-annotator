import {getFakeMatchData} from 'fake'


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


export function fetchMatch({matchId}){
    let data = getFakeMatchData();
    return {
        id: 0,
        data: data,
    }
}