import { Cookies } from "react-cookie";
const SPRING_SERVER_URL = process.env.REACT_APP_SPRING_SERVER_URL;

const cookies = new Cookies();

const setCookie = (name, value, option) => {
    return cookies.set(name, value, { ...option });
};

const getCookie = (name) => {
    return cookies.get(name);
};

const removeCookie = (name, option) => {
    return cookies.remove(name, { ...option });
};

export async function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    let options = {
        headers: headers,
        url: SPRING_SERVER_URL + api,
        method: method,
    };

    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (!response.ok) {
                    // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
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
    if (response.headers.SET_COOKIE) {
        setCookie("Authorization", response.headers.SET_COOKIE, {
            path: "/",
        })
    }

}

export function signOut() {
    removeCookie("Authorization");
    window.location.href = "/";
}

export function signUp(webDTO) {
    console.log("signUp function : ", webDTO);
    return call("/member", "POST", webDTO);
}