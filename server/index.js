const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const url = require("url");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypeMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  };
  return contentTypeMap[ext] || "application/octet-stream";
}

async function loadStaticFile(filePath, dir = PUBLIC_DIR) {
  const fullPath = path.join(dir, filePath);

  try {
    const data = await fs.readFile(fullPath);
    return { content: data, contentType: getContentType(fullPath) };
  } catch (error) {
    console.error(`Error loading static file '${fullPath}':`, error);
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  if (pathname === "/") {
    pathname = "/index.html";
  } else if (pathname === "/cars") {
    pathname = "/cars.html";
  }

  const result = await loadStaticFile(pathname);

  if (result) {
    res.writeHead(200, { "Content-Type": result.contentType });
    res.end(result.content);
  } else {
    const errorPage = await loadStaticFile("404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(errorPage.content);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
