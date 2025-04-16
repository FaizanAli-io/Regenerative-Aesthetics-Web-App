"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wishlists_controller_1 = require("./wishlists.controller");
const wishlists_service_1 = require("./wishlists.service");
const wishlists_items_entity_1 = require("./entities/wishlists-items.entity");
const products_module_1 = require("../products/products.module");
let WishlistsModule = class WishlistsModule {
};
exports.WishlistsModule = WishlistsModule;
exports.WishlistsModule = WishlistsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                wishlists_items_entity_1.WishlistItemEntity,
            ]),
            products_module_1.ProductsModule,
        ],
        controllers: [wishlists_controller_1.WishlistsController],
        providers: [wishlists_service_1.WishlistsService],
    })
], WishlistsModule);
//# sourceMappingURL=wishlists.module.js.map