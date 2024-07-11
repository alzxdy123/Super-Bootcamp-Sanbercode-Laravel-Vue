import { Register, Login } from "./libs/Auth.js";
import { addStudent } from "./libs/student.js";

const args = process.argv;
const command = args[2];
const input = args[3];

switch (command) {
  case "register":
    Register(input);
    break;
  case "login":
    Login(input);
    break;
  case "addStudent":
    addStudent(input);
  default:
    break;
}
