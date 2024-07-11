import fs from "fs";
import fsPromise from "fs/promises";
import "core-js/stable";

const path = "data.json";

export const Register = (reqBody) => {
  let [name, password, role] = reqBody.split(",");

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let dataJson = JSON.parse(data);

    dataJson.push({
      name: name,
      password: password,
      role: role,
      isLogin: false,
      ...(role === "trainer" && { students: [] }),
    });

    fs.writeFile(path, JSON.stringify(dataJson), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Register Success");
      }
    });
  });
};

export const Login = (reqBody) => {
  let [name, password] = reqBody.split(",");

  fsPromise
    .readFile(path)
    .then((data) => {
      let dataJson = JSON.parse(data);

      let index = dataJson.findIndex((item) => {
        return item.name == name;
      });

      if (index == -1) {
        console.log("Employee not found");
      } else {
        let employee = dataJson[index];

        if (employee.password == password) {
          employee.isLogin = true;

          dataJson.splice(index, 1, employee);

          fs.writeFile(path, JSON.stringify(dataJson), (err) => {
            if (err) {
              console.log(err);
            }
          });

          console.log("Login success");
        } else {
          console.log("Password not match");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
