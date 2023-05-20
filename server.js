const express=require('express');
const mongoose=require('mongoose')
const app=express();
const cors=require("cors")
app.use(express.json());
require('./connection')

// const axios = require('axios');
// const url = 'https://me.itachyon.com/rest/27/xp77o5948rzldiuh/crm.deal.add.json';

// const data = {
//   fields: {
//     TITLE: "title",
//     UF_CRM_1683697473619: "groot",
//     UF_CRM_632EC9E45AFBD: "I am groot",
//     UF_CRM_1683702408727: "iamgroot@gmail.com",
//     UF_CRM_1675089346322: "grrot",
//     UF_CRM_1675875292996: "I am groot",
//     'bxu_files[]': ''
//   }
// };

// axios.post(url, data, {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(response => {
//     if (response.status === 200) {
//       console.log('Ticket created in Bitrix DB', response.status);
//       return true;
//     } else {
//       console.log('Ticket not created', response.status);
//     }
//   })
//   .catch(error => {
//     console.error('Error from DB:', error);
//   });

const router1 = require('./routes/userRoute');
const router2 = require('./routes/clinicRoute')
const router3 = require('./routes/taskRoute')
// const router4= require('./routes/createDealRoute')

app.use(cors());

PORT=process.env.PORT||7000;



app.use('/',router1);
app.use('/',router2);
app.use('/',router3);


// module.exports = router;



app.listen(PORT,()=>{
    console.log(`server started ap PORT : ${PORT}`)
})