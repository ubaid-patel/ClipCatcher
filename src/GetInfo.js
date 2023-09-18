const host = process.env.REACT_APP_API_URL
export default function getInfo(url) {
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