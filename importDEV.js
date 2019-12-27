const fs = require('fs');
const YAML = require('js-yaml');
const admin = require("firebase-admin");
const serviceAccount = require("./_credentials/firebase.dev.json");

let collectionName = process.argv[2];

let fileName = "./_data/firestore-"+collectionName+".json"

// You should replace databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lukb-events-dev.appspot.com"
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

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

  udpateCollection(dataArray);

})

async function udpateCollection(dataArray){
  for(const index in dataArray){
    const collectionName = index;
    for(const doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
        await startUpdating(collectionName, doc, dataArray[index][doc]);
      }
    }
  }
}



function startUpdating(collectionName, doc, data){
  // convert date from unixtimestamp  
  let parameterValid = true;
  
  if(parameterValid) {
    return new Promise(resolve => {
      db.collection(collectionName).doc(doc)
      .set(data)
      .then(() => {
        console.log(`${doc} is imported successfully to firestore!`);
        resolve('Data wrote!');
      })
      .catch(error => {
        console.log(error);
      });
    });
  } else {
    console.log(`${doc} is not imported to firestore. Please check your parameters!`);    
  }
}


