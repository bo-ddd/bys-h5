let serveUrl = import.meta.env.MODE == "production" ? "http://49.235.119.92:8090/" : "/api";
export const postConfig = {
    url: "",
    baseURL: serveUrl,
    headers:{
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    timeout: 5000
}

export const getConfig = {
    url: "",
    baseURL: serveUrl,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    },
    timeout: 5000
};