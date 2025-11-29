"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../ormconfig");
const user_entity_1 = require("./users/user.entity");
const policy_entity_1 = require("./policies/policy.entity");
const claim_entity_1 = require("./claims/claim.entity");
const bcrypt = require("bcrypt");
async function run() {
    const ds = ormconfig_1.AppDataSource;
    if (!ds.isInitialized)
        await ds.initialize();
    const userRepo = ds.getRepository(user_entity_1.User);
    const policyRepo = ds.getRepository(policy_entity_1.Policy);
    const claimRepo = ds.getRepository(claim_entity_1.Claim);
    const existing = await userRepo.findOne({ where: { email: 'demo@insureconnect.com' } });
    if (existing) {
        console.log('Seed already executed');
        process.exit(0);
    }
    const user = new user_entity_1.User();
    user.email = 'demo@insureconnect.com';
    user.password = await bcrypt.hash('password', 10);
    user.name = 'Demo User';
    await userRepo.save(user);
    const p = new policy_entity_1.Policy();
    p.user = user;
    p.insurer = 'InsureConnect';
    p.policyType = 'Health';
    p.premiumAmt = 1200.0;
    p.startDate = '2024-01-01';
    p.endDate = '2025-01-01';
    p.status = 'Active';
    await policyRepo.save(p);
    const c = new claim_entity_1.Claim();
    c.user = user;
    c.policy = p;
    c.claimAmt = 500.0;
    c.description = 'Minor surgery';
    c.status = 'Submitted';
    await claimRepo.save(c);
    console.log('Seed completed');
    process.exit(0);
}
run().catch((err) => console.error(err));
//# sourceMappingURL=seed.js.map