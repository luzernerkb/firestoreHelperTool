# 🔥 Firestore Helper Tool
This is a small helper for importing and exporting data from [Google Firestore](https://console.firebase.google.com/).

## Installation
1) Clone repo and install all modules
```bash
git clone <THISREPO> firestoreHelperTool
cd firestoreHelperTool
npm i 
```
2) Generate two Firebase Admin SDK private key (Target + Source) in the [Google Firebase Console](https://console.firebase.google.com/). Project Settings -> Service Accounts -> Firebase Admin SDK.
3) Copy the downloaded .json files in to the `_credentials` folder and rename it to 
```
./_credentials/firebase.prod.json
./_credentials/firebase.dev.json
```

## Exporting
To export data from PROD run:
```
node exportPROD.js <COLLECTION-NAME>

# Example
node exportPROD.js events
```
➡️ The data was exported to the `_data` folder

## Convert Timestamps
Since timestamps are export in a special way by firebase we need to convert them before importing.
You can do this by:
```
node convertDates.js <FILENAME>

# Example
node convertDates.js ./_data/firestore-events.json
```
➡️ The changes were made in the same file


## Importing
To import a collection again:
```
node importDEV.js <COLLECTION-NAME>

# Example
node importDEV.js events
```
➡️ The data will be imported to the specified Firestore collection
