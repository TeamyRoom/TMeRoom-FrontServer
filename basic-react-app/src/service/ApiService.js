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

    const response = await call("/auth/login", "POST", webDTO).catch((error) => { alert("입력 정보가 올바르지 않습니다."); });
    return response;

}

export function signOut() {
    window.location.href = "/";
}

export function signUp(webDTO) {
    console.log("signUp function : ", webDTO);
    return call("/member", "POST", webDTO);
}