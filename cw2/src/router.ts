import http, { IncomingMessage, ServerResponse } from "http";

export const handleRoute = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello World from router!");
    }
    else if (req.url === "/info" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is the info page.");
    }
    else if(req.url === "/json" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ 
            message: "This is a JSON response.",
            timestamp: new Date().toISOString()}));
    }

    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h3>Not Found</h3>");
    }

}