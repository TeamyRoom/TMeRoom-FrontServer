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
        options.body = JSON.stringify(request);
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
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch((error) => {
            console.log(error.status);
            if (error.status === 403) {
                window.location.href = "/error"; // redirect
            }
            return Promise.reject(error);
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