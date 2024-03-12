import server from "./server.js";

const PORT = 10000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () =>
    console.log(`Server running in http://${HOST}:${PORT}`)
);
