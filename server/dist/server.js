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
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
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
app.use((0, express_session_1.default)({
    secret: "test123#",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));
// middlewares
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)());
// routes
// app.use('/',)
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