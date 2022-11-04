const express = require('express');
const { sendStatus } = require('express/lib/response');
const mysql = require('mysql');
const app = express();
const dbname = 'sitechecker';

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Wofnithin@2015',
    database: dbname
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connected")
    }
});
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE sitechecker';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('db created');
        }

    });
})
//name,password,fullname,email,role,dob,country,city
app.get('/createtable', (req, res) => {
    let tablename = 'admin';
    let sql = 'CREATE TABLE '+tablename+' (name VARCHAR(20), password VARCHAR(20),'+
    'fullname VARCHAR(45), email VARCHAR(45), role VARCHAR(6), '+
    'dob DATE, country VARCHAR(45), city VARCHAR(45))';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send('success!');
        }

    });
})
app.get('/selectData', (req, res) => {
    let tablename = 'user';
    let sql = 'SELECT * FROM '+tablename;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }

    });
})
app.post('/insertData', (req, res) => {
    let tablename = 'user';    
    const submitData = req.body;
    console.log(req)
    let valueString = '(';
    if(submitData.name != undefined) {
        valueString = valueString + submitData.name +',';
    } else {
        res.sendStatus(404);
        res.send('name missing');
    }
    if(submitData.password != undefined) {
        valueString = valueString + submitData.password +',';
    } else {
        res.sendStatus(404);
        res.send('password missing');
    }
    if(submitData.fullname != undefined) {
        valueString = valueString + submitData.fullname +',';
    } else {
        res.sendStatus(404);
        res.send('fullname missing');
    }
    if(submitData.email != undefined) {
        valueString = valueString + submitData.email +',';
    } else {
        res.sendStatus(404);
        res.send('email missing');
    }
    console.log(valueString);
    res.send('success');
    /**
     let sql = 'INSERT INTO '+tablename+'(name,password,fullname,email,role,dob,country,city) VALUES '+
    '("saritha","encsaritha","saritha k s","saritha451@gmail.com","admin","1990-7-30","india","idukki")';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('db created');
            res.send(result);
        }

    });
     */
});
const returnString = (submitData, key, valueString) => {
    if (submitData[key] != undefined) {
      return ('"' + submitData[key] + '" ,');
    } else {
      res.send(key + ' is missing');
      res.sendStatus(404);
    }
  }
  
  constants.app.get('/sc-selectData', (req, res) => {
    let tablename = 'user';
    let sql = 'SELECT * FROM ' + tablename;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
  
    });
  })
  constants.app.post('/sc-insertData', (req, res) => {
    console.log("i am here")
    let tablename = 'user';
    const submitData = req.body;
    console.log(submitData)
    let valueString = '(';
    valueString = valueString + returnString(submitData, 'name', valueString);
    valueString = valueString + returnString(submitData, 'password', valueString);
    valueString = valueString + returnString(submitData, 'fullname', valueString);
    valueString = valueString + returnString(submitData, 'email', valueString);
    valueString = valueString + returnString(submitData, 'role', valueString);
    valueString = valueString + returnString(submitData, 'dob', valueString);
    valueString = valueString + returnString(submitData, 'country', valueString);
    valueString = valueString + returnString(submitData, 'city', valueString);
    valueString = valueString.replace(/,\s*$/, "") + ')';
    console.log(valueString);
    let keys = '(name,password,fullname,email,role,dob,country,city)';
    let sql = 'INSERT INTO ' + tablename + '(name,password,fullname,email,role,dob,country,city) VALUES ' + valueString;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('value inserted');
        res.send(result);
      }
  
    });
  
  })
app.listen('5050', () => {
    console.log("connected 5050!");
})