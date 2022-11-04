// for to write data in json file


const userRegistrationData = (data) => {

    fs.writeFile("./users.json", data, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      } else {
        console.log("user inserted");
      }
    });
  }