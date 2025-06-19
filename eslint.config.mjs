// .eslintrc.js
import { dirname } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = dirname(__filename);

export default [
  {
    // ignore every file in the project
    ignores: ["*/"],
  },
];