// File streaming, handling large file

const fs = require("fs");
function fileStream() {
  const readStrem = fs.createReadStream("./text.txt");
  const writeStream = fs.createWriteStream("./textOutput.txt");

  let totalBytes = 0;

  // Log progress in real time
  readStrem.on("data", (chunk) => {
    console.log("Data chunk received");
    console.log(chunk);
    totalBytes += chunk.length;
    console.log(`Read ${chunk.length} bytes... Total: ${totalBytes} bytes`);
  });

  // event for when the stream is finished
  readStrem.on("end", () => {
    console.log("End of reading data");
  });

  readStrem.on("error", (err) => {
    console.error("Error reading data", err);
  });

  // Pipe the read stream to the write stream
  readStrem.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("Finished writing data");
  });

  writeStream.on("error", (err) => {
    console.error("Error writing data", err);
  });
}

fileStream();
