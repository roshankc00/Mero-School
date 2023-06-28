"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const connnectDb_1 = __importDefault(require("./config/connnectDb"));
const errorHandler_1 = require("./middlewares/errorHandler");
process.on("uncaughtException", (error) => {
    console.log(` Error:${error.message}`);
    console.log("shuttting down the server due to uncaughtException ");
    process.exit(1);
});
// rest variables 
const app = (0, express_1.default)();
const PORT = validateEnv_1.default.PORT;
// connecting to the database 
(0, connnectDb_1.default)();
// middlewares
app.use(express_1.default.json());
// routes
// error handlers
app.use(errorHandler_1.errorHandler);
app.use(errorHandler_1.notFound);
const server = app.listen(PORT, () => {
    console.log(`Listening at the port ${PORT}`);
});
process.on("unhandledRejection", (error) => {
    console.log(` Error:${error.message}`);
    console.log("shuttting down the server due to  unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map