const requestDiv = document.getElementById("requestDiv");

const proxyUrl = document.getElementById("proxyUrl");

// sample urls : 
// https://jsonplaceholder.typicode.com/todos
// https://example.com/answer
// https://codepen.io/PierBotteroWeb/pen/yLywbyZ
// https://superheroapi.com/api/2313113182087527/1/biography

const actualUrl = document.getElementById("actualUrl");
const method = document.getElementById("method");
const postData = document.getElementById("postData");

//
const postDataDiv = document.getElementById("postDataDiv");

const responseDiv = document.getElementById("responseDiv");

const textAreaResponse = document.getElementById("textAreaResponse");
const flatValues = document.getElementById("flatValues");

//
const executeBtn = document.getElementById("executeBtn");

/////////////////////////////

const flattenJSON = (obj = {}, res = {}) => {
  for (key in obj) {
    if (typeof obj[key] !== 'object') {
      res[key] = obj[key];
    } else {
      flattenJSON(obj[key], res);
    };
  };
  return res;
};

const flattenJSONLimited = (obj = {}, res = {}, extraKey = '') => {
  for (key in obj) {
    if (typeof obj[key] !== 'object') {
      res[extraKey + key] = obj[key];
    } else {
      //  flattenJSONExtra(obj[key], res, `${extraKey}${key}.`);
    };
  };
  return res;
};

const flattenJSONExtra = (obj = {}, res = {}, extraKey = '') => {
  for (key in obj) {
    if (typeof obj[key] !== 'object') {
      res[extraKey + key] = obj[key];
    } else {
      flattenJSONExtra(obj[key], res, `${extraKey}${key}.`);
    };
  };
  return res;
};

var formatObj = function (obj) {
  var string = '';
  for (const [key, value] of Object.entries(obj)) {
    // console.log(`${key}: ${value}`);
    string += `<dt class="col-sm-4 text-truncate">${key.replace(/_/g, " ")}</dt> <dd class="col-sm-8 text-truncate">${(value + "").replace(/_/g, " ")}</dd>`;
  }
  return string;
}

executeBtn.addEventListener("click", (e) => {
  fetch(
    (!proxyUrl.value ? '' : proxyUrl.value + '/') + actualUrl.value,
    {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-request-headers': 'application/json'
      },
      method: method.value,
      mode: 'cors',
      cache: 'no-cache',
      body: 'POST' === method.value ? postData.value : undefined
    }
  )
    .then((response) => response.json())
    .then((json) => {
      textAreaResponse.innerHTML = JSON.stringify(json, null, "\t");
      flatValues.innerHTML = formatObj(flattenJSON(json));
      responseDiv.style = "display:block";
    })
    .catch((res) => alert((res)));
});


function onChangeMethod(e) {
  console.log(e)
  if (e === 'POST') {
    postDataDiv.style = "display:block";
  } else {
    postDataDiv.style = "display:none";
  }
}
