const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());

const products = [];

(async () => {
   try {
      await request('https://c873d395f841c64634c5330ce9118c9d:5dcf9317c6ff86ea61d21b0d4dd0a1a8@toolio-retail.myshopify.com/admin/api/2019-10/products.json', (err, res, body) => {
         let product;
         for (product of JSON.parse(body).products) {
            products.push(
               {
                  id: product.id,
                  title: product.title
               }
            );
         }
         console.log(products);
      });
   }  catch (error) {
      console.log(error.response.body);
   }
 })().then(() => {
   app.get('/products', (req, res) => {
      res.send(products);
   });

   app.get('/products/:keyword', (req, res) => {
      res.send(products.filter(el => {
         return el.title.toLowerCase().search(req.params.keyword.toLocaleLowerCase()) != -1
      }));
   });
   
   app.listen(3000);
 });

