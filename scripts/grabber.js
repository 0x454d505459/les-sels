const
    url = "http://les-fles.22web.org/",
    cookie = "_test=c9512e612635f45d66f61a048fd860d7; PHPSESSID=e2321586987020694bbeb3b751fdac1c"

var headers = new Headers;

headers.append('Content-Type', 'text/html')
fetch(url, {headers:headers})
  .then((response) => response.text())
  .then(d => console.log(d));