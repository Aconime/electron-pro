const { app, BrowserWindow, BrowserView } = require("electron");
const path = require("path");
const { appName } = require("./app-config");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: appName,
    width: 800,
    height: 600,
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile("./public/index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  if (process.platform === "win32") app.setAppUserModelId(appName);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

require("electron-reload")(__dirname, {
  elecrton: path.join(__dirname, "node_modules", ".bin", "electron"),
});
