const SPRING_SERVER_URL = process.env.REACT_APP_SPRING_SERVER_URL;

export async function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    let options = {
        headers: headers,
        url: SPRING_SERVER_URL + api,
        method: method,
        credentials: 'include',
    };

    if (request) {
        if(method === "GET"){
            options.url += '?';
            var keys = Object.keys(request); //키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
            for (var i=0; i<keys.length; i++) {
                var key = keys[i];
                var val = request[key];
                options.url += `${key}=${val}`;
                if(i !== keys.length-1) options.url +='&'; 
            }
        }else{
            options.body = JSON.stringify(request);
        }    
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (json.resultCode !== "SUCCESS") {
                    if (json.result && Array.isArray(json.result)) {
                        // result 배열 각각에 대해 field와 message 출력
                        json.result.forEach((error) => {
                            alert(`${error.field}: ${error.message}`);
                        });
                    } else {
                        // result 하나 출력
                        alert(json.result);
                    }
                }
                return json;
            })
        )
        .catch((error) => {
            console.log(error.status);
            Promise.reject(error);
        });
}

export async function getResultCodeCall(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    let options = {
        headers: headers,
        url: SPRING_SERVER_URL + api,
        method: method,
        credentials: 'include',
    };

    if (request) {
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                return json;
            })
        )
        .catch((error) => {
            console.log(error.status);
            Promise.reject(error);
        });
}

export async function signIn(webDTO) {
    return call("/auth/login", "POST", webDTO);
}

export function signOut() {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
}

export function signUp(webDTO) {
    return call("/member", "POST", webDTO);
}

export function findId(webDTO){
    return call("/member/id/lost", "GET", webDTO);
}

export function findPw(webDTO){
    return call("/member/password/lost", "POST", webDTO);
}

export function getAccessToken() {
    const name = "accessToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
}

export function createLecture(lectureDTO) {
    return call("/lecture", "POST", lectureDTO)
        .then((response) => {window.location.href = `lecture/${response.result.lectureCode}`;});
}

export function confirmEmail(confirmCode){
    return getResultCodeCall("/member/email/confirm/"+confirmCode, "PUT", null);
}

export function confirmResetCode(resetCode){
    return getResultCodeCall("/member/password/checking/"+resetCode, "GET", null);
}

export function resetPassword(webDTO){
    return getResultCodeCall("/member/password/lost", "PUT", webDTO);
}

export function accessLecture(lectureCode) {
    return getResultCodeCall(`/lecture/${lectureCode}`, "GET");
}