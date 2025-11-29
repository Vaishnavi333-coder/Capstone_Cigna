"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClaimDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_claim_dto_1 = require("./create-claim.dto");
class UpdateClaimDto extends (0, mapped_types_1.PartialType)(create_claim_dto_1.CreateClaimDto) {
}
exports.UpdateClaimDto = UpdateClaimDto;
//# sourceMappingURL=update-claim.dto.js.map