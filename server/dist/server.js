"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const connnectDb_1 = __importDefault(require("./config/connnectDb"));
const errorHandler_1 = require("./middlewares/errorHandler");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const passport_middleware_1 = require("./middlewares/passport.middleware");
// uncaughtException error handler
process.on("uncaughtException", (error) => {
    console.log(` Error:${error.message}`);
    console.log("shuttting down the server due to uncaughtException ");
    process.exit(1);
});
// rest variables
const app = (0, express_1.default)();
const PORT = validateEnv_1.default.PORT || 7000;
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
(0, passport_middleware_1.passportInitialize)();
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)());
// routes
app.use(index_1.default);
// error handlers
app.use(errorHandler_1.errorHandler);
app.use(errorHandler_1.notFound);
const server = app.listen(PORT, () => {
    console.log(`Listening at the port ${PORT}`);
});
// unhandled Rejection error handler
process.on("unhandledRejection", (error) => {
    console.log(` Error:${error.message}`);
    console.log("shuttting down the server due to  unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=server.js.map