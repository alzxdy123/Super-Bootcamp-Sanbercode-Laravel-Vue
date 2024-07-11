import fs from "fs";
import fsPromise from "fs/promises";
import "core-js/stable";

const path = "data.json";

export const addStudent = async (reqBody) => {
  let [name, trainer] = reqBody.split(",");

  try {
    const data = await fsPromise.readFile(path);
    const dataJson = JSON.parse(data);

    const adminIndex = dataJson.findIndex(
      (item) => item.role == "admin" && item.isLogin == true
    );

    if (adminIndex == -1) {
      console.log("Only Admin can add student");
    }

    const trainerIndex = dataJson.findIndex(
      (item) => item.role == "trainer" && item.name == trainer
    );

    if (trainerIndex == -1) {
      console.log("Trainer not found");
    }

    const trainerData = dataJson[trainerIndex];

    trainerData.students.push({
      name: name,
    });

    await fsPromise.writeFile(path, JSON.stringify(dataJson));

    console.log("Student added successfully");
  } catch (err) {
    console.log(err);
  }
};
