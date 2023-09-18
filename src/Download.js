function formatName(filename) {
    // Replace special characters with spaces
    return filename.replace(/[^a-zA-Z0-9_.-]/g, ' ');
}
const host = process.env.REACT_APP_API_URL
export default function download(id, itag) {
    // WARNING: For POST requests, body is set to null by browsers.
    var body = JSON.stringify({
        "id": id,
        "itag": itag
    });
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        console.log(body)
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 200) {
                window.location.href = host+"/download/"+JSON.parse(this.responseText).file
                resolve(JSON.parse(this.responseText))
            }
        });

        xhr.open("POST", host+"/convert");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(body);
    })
}