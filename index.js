const {google} = require('googleapis');
const { join } = require('path/posix');
const keys=require('./keys.json');
var client=new google.auth.JWT(
keys.client_email,
null,
keys.private_key,
['https://www.googleapis.com/auth/spreadsheets']
);




client.authorize(function(err,tokens){

    if(err){
        console.log(err);
    }
    else{
        console.log('connected succesfully!');
        gsrun(client);
    }
});


async function gsrun(cl){

    const gsapi=google.sheets({version:'v4',auth:cl});

    const opt={
        spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
        range:'send 1!A2:C2'
    };
    let data=await gsapi.spreadsheets.values.get(opt);
    let dataArray=data.data.values;

    let newDataArray=dataArray.map(function(r){
        return r;
    });
    

 /**    const updateOptions={
        spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
        range:'blocked!A2',
        valueInputOption:'USER_ENTERED',
        resource:{values:newDataArray}
        };
    
    let res=await gsapi.spreadsheets.values.update(updateOptions);
console.log(res);
*/


const addtoBlocked={
    spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
    range:'blocked',
    valueInputOption:'USER_ENTERED',
    resource:{values:newDataArray}
    };

let res=await gsapi.spreadsheets.values.append(addtoBlocked);
console.log(res);




const lastrow_F_Stock2={
    spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
    range:'stock!E1'
};
let data1=await gsapi.spreadsheets.values.get(lastrow_F_Stock2);
let dataArray1=data1.data.values;


var lastrow_F_Stock=data1.data.values[0].toString();

//select the new email from stock
const last_email={
    spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
    range:'stock!A'+lastrow_F_Stock.toString()+':C'+lastrow_F_Stock.toString()
};
let data2=await gsapi.spreadsheets.values.get(last_email);
let dataArray2=data2.data.values;

//--------------------------------------

const updateOptions1={
    spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
    range:'send 1!A2:C2',
    valueInputOption:'USER_ENTERED',
    resource:{values:dataArray2}
    };

let res1=await gsapi.spreadsheets.values.update(updateOptions1);
console.log(res1);
//--------------------------------------
 //delete email token from stock
 const updateOptions5={
    spreadsheetId:'1xH4q3W_EzQpBzzcwTeyMNhtA7dqWlwjj8Fh4cayJWFM',
    range:'stock!A'+lastrow_F_Stock.toString()+':C'+lastrow_F_Stock.toString(),
   
    };

let res5=await gsapi.spreadsheets.values.clear(updateOptions5);
console.log(res5);


console.log(dataArray2[0][0].toString());
console.log(dataArray2[0][1].toString());
console.log(dataArray2[0][2].toString());

}



