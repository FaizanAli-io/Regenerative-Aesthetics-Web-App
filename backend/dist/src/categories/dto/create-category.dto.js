"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCategoryDto {
    title;
    description;
    parentCategoryId;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the category',
        example: 'Electronics',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Title can not be empty.',
    }),
    (0, class_validator_1.IsString)({
        message: 'Title should be string.',
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the category',
        example: 'Devices and gadgets including smartphones, laptops, and accessories',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Description can not be empty.',
    }),
    (0, class_validator_1.IsString)({
        message: 'Description should be string.',
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Optional parent category ID',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, {
        message: 'Parent Category Id need to be a number(which will be validated later).',
    }),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "parentCategoryId", void 0);
//# sourceMappingURL=create-category.dto.js.map