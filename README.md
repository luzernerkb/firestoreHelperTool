# 🔥 Firestore Helper Tool
This is a small helper for importing and exporting data from [Google Firestore](https://console.firebase.google.com/).

## Installation
1) Clone repo and install all modules
```bash
git clone <THISREPO> firestoreHelperTool
cd firestoreHelperTool
npm i 
```
2) Generate a Firebase Admin SDK private key in the [Google Firebase Console](https://console.firebase.google.com/). Project Settings -> Service Accounts -> Firebase Admin SDK.
3) Copy the download .json file to the `_credentials` folder and name it `firebase.json`

## Exporting
To export data change the scheme you want to export in `_config/schema.js`. Than run:
```
vi _config/schema.js
npm run export
```
➡️ The data was exported to the `_data` folder


## Importing
To import data change the scheme you want to import in `_config/schema.js`. Place your data in `_data` folder in the file `import.json` 
```
vi _config/schema.js
cp <DATA> _data/import.json
npm run import
```
➡️ The data will be imported
