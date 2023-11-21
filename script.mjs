import * as fs from "node:fs";

fs.writeFile("file-ese.txt", "Mi chiamo Umberto", (err) => {
    if (err) {
        console.error(err)
    }
})