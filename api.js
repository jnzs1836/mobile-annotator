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