import server from "./server.js";

const PORT = 3000;
const HOST = "192.168.1.179";

server.listen(PORT, HOST, () =>
    console.log(`Server running in http://${HOST}:${PORT}`)
);
