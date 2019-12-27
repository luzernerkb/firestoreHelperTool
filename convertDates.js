const fs = require('fs');
const YAML = require('js-yaml');
const path = require('path');


const fileName = process.argv[2];

let collectionName = path.parse(fileName).name.split("-")[1];


let dateArray = [
    'datetimeStart',
    'datetimeEnd',
    'date',
    'time',
    'timeStart',
    'timeEnd'
  ];

fs.readFile(fileName, 'utf8', function(err, data){
  if(err){
    return console.log(err);
  }

  // Turn string from file to an Array
  if (fileName.endsWith('yaml') || fileName.endsWith('yml')) {
    dataArray = YAML.safeLoad(data);
  } else {
    dataArray = JSON.parse(data);
  }

  replaceTimestamps(dataArray);

})

function replaceDateTime(obj, searchKey) {
  //loop through object:
for (var key in obj) {
  var value = obj[key];
  var isMatch = false;
  if (key === searchKey) {
          delete obj[key];
          obj[searchKey] = new Date(value._seconds * 1000);
          isMatch = true;
  }
  
  if (typeof value === 'object' && !isMatch) {
    obj[key] = replaceDateTime(value, searchKey);
  }
}
  return obj;
}


function replaceTimestamps(data){
  // convert date from unixtimestamp  
  let parameterValid = true;

  let tmpData = data;

  // Enter date value
  if(typeof dateArray !== 'undefined') {        
    dateArray.map(date => {  
      tmpData = replaceDateTime(tmpData, date);
    });    
  }
  fs.writeFile(fileName, JSON.stringify(tmpData, null, 4), 'utf8' , function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Dates successfully converted in file: " + fileName);
});
  

}


