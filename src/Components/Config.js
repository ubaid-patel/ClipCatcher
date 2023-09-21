const host = process.env.REACT_APP_API_URL
function formatName(filename) {
    // Replace special characters with spaces
    return filename.replace(/[^a-zA-Z0-9_.-]/g, ' ');
}

export function download(id, itag) {
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

export function getInfo(url) {
    return new Promise((resolve,reject)=>{
        var data = JSON.stringify({
            "link": url
        });
    
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if(this.status === 200){
                    resolve(JSON.parse(this.responseText))
                    console.log(JSON.parse(this.responseText))
                }
            } 
        })
        xhr.open("POST", host+"/info");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    })
  }