"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/users/user.entity");
const policy_entity_1 = require("./src/policies/policy.entity");
const claim_entity_1 = require("./src/claims/claim.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'oracle',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 1521),
    username: process.env.DB_USERNAME || 'system',
    password: process.env.DB_PASSWORD || 'Vaishu@0410',
    serviceName: process.env.DB_SERVICE_NAME || 'XEPDB1',
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User, policy_entity_1.Policy, claim_entity_1.Claim],
});
//# sourceMappingURL=ormconfig.js.map