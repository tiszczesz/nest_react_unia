import http from "http";
import { handleRoute } from "./router.js";
// Create an HTTP server
const server = http.createServer(handleRoute);
const PORT = 3000;
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});