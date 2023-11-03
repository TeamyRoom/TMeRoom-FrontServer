export const SPRING_SERVER_URL = process.env.REACT_APP_SPRING_SERVER_URL;

export async function call(api, method, request, type) {
    let header;
    let body;
    let options;

    if (type) {
        header = new Headers({});
        const formData = new FormData();
        formData.append("file", request);
        body = formData;
    } else {
        header = new Headers({
            "Content-Type": "application/json",
        });
        body = request ? JSON.stringify(request) : null;
    }

    if (method === "GET") {
        options = {
            headers: header,
            url: SPRING_SERVER_URL + api,
            method: method,
            credentials: 'include',
        };

        if (request) {
            options.url += '?';
            var keys = Object.keys(request);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var val = request[key];
                options.url += `${key}=${val}`;
                if (i !== keys.length - 1) options.url += '&';
            }
        }
    } else {
        options = {
            headers: header,
            url: SPRING_SERVER_URL + api,
            method: method,
            credentials: 'include',
            body: body
        };
    }

    return fetch(options.url, options)
        .then((response) =>
            response.json().then((json) => {
                if (json.resultCode === "TOKEN_NOT_FOUND") {
                    const refreshOptions = {
                        headers: header,
                        url: SPRING_SERVER_URL + `/auth/refresh`,
                        method: "POST",
                        credentials: 'include',
                    };
                    return fetch(refreshOptions.url, refreshOptions)
                        .then((res) => {
                            if (res.json().resultCode === "SUCCESS") {
                                return call(api, method, request, type);
                            }
                            else {
                                console.log(res.json().resultCode);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                return json;
            })
        )
        .catch((error) => {
            console.log(error.status);
        });
}

export function showError(json) {
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
}

export async function signIn(webDTO) {
    return call("/auth/login", "POST", webDTO)
        .then((response) => (showError(response)));
}

export function signOut() {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
}

export function signUp(webDTO) {
    return call("/member", "POST", webDTO)
        .then((response) => (showError(response)));
}

export function idDuplicateCheck(id) {
    return call(`/member/id/duplicate/${id}`, "GET");
}

export function emailDuplicateCheck(email) {
    return call(`/member/email/duplicate/${email}`, "GET");
}

export function findId(webDTO) {
    return call("/member/id/lost", "GET", webDTO)
        .then((response) => (showError(response)));
}

export function findPw(webDTO) {
    return call("/member/password/lost", "POST", webDTO)
        .then((response) => (showError(response)));
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
        .then((response) => (showError(response)))
        .then((response) => { window.location.href = `lecture/${response.result.lectureCode}`; });
}

export function confirmEmail(confirmCode) {
    return call("/member/email/confirm/" + confirmCode, "PUT", null);
}

export function confirmResetCode(resetCode) {
    return call("/member/password/checking/" + resetCode, "GET", null);
}

export function resetPassword(webDTO) {
    return call("/member/password/lost", "PUT", webDTO);
}

export function accessLecture(lectureCode) {
    return call(`/lecture/${lectureCode}`, "GET");
}

export function suggestTeacher(lectureCode, teacherId) {
    return call(`/lecture/${lectureCode}/teacher`, "POST", { teacherId: teacherId });
}

export function dismissTeacher(lectureCode, teacherId) {
    return call(`/lecture/${lectureCode}/teacher/${teacherId}`, "DELETE");
}

export function acceptStudent(lectureCode, studentId) {
    return call(`/lecture/${lectureCode}/application/${studentId}`, "PUT"); 
}

export function rejectStudent(lectureCode, studentId) {
    return call(`/lecture/${lectureCode}/application/${studentId}`, "DELETE");
}

export function decisionTeacher(lectureCode, answer) {
    if (answer) {
        return call(`/lecture/${lectureCode}/teacher`, "PUT");
    } else {
        return call(`/lecture/${lectureCode}/teacher`, "DELETE");
    }
}