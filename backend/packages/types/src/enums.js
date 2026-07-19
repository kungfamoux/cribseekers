"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnishingType = exports.ListingType = exports.PropertyType = exports.Permission = exports.UserRole = exports.NotificationType = exports.PaymentStatus = exports.InspectionStatus = exports.PropertyStatus = void 0;
var PropertyStatus;
(function (PropertyStatus) {
    PropertyStatus["DRAFT"] = "DRAFT";
    PropertyStatus["PENDING"] = "PENDING";
    PropertyStatus["ACTIVE"] = "ACTIVE";
    PropertyStatus["RENTED"] = "RENTED";
    PropertyStatus["SOLD"] = "SOLD";
    PropertyStatus["INACTIVE"] = "INACTIVE";
    PropertyStatus["SUSPENDED"] = "SUSPENDED";
})(PropertyStatus || (exports.PropertyStatus = PropertyStatus = {}));
var InspectionStatus;
(function (InspectionStatus) {
    InspectionStatus["PENDING"] = "PENDING";
    InspectionStatus["SCHEDULED"] = "SCHEDULED";
    InspectionStatus["IN_PROGRESS"] = "IN_PROGRESS";
    InspectionStatus["COMPLETED"] = "COMPLETED";
    InspectionStatus["CANCELLED"] = "CANCELLED";
    InspectionStatus["NO_SHOW"] = "NO_SHOW";
})(InspectionStatus || (exports.InspectionStatus = InspectionStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PROCESSING"] = "PROCESSING";
    PaymentStatus["COMPLETED"] = "COMPLETED";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["REFUNDED"] = "REFUNDED";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["SYSTEM"] = "SYSTEM";
    NotificationType["EMAIL"] = "EMAIL";
    NotificationType["SMS"] = "SMS";
    NotificationType["PUSH"] = "PUSH";
    NotificationType["IN_APP"] = "IN_APP";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["AGENT"] = "AGENT";
    UserRole["LANDLORD"] = "LANDLORD";
    UserRole["TENANT"] = "TENANT";
})(UserRole || (exports.UserRole = UserRole = {}));
var Permission;
(function (Permission) {
    Permission["CREATE_PROPERTY"] = "CREATE_PROPERTY";
    Permission["READ_PROPERTY"] = "READ_PROPERTY";
    Permission["UPDATE_PROPERTY"] = "UPDATE_PROPERTY";
    Permission["DELETE_PROPERTY"] = "DELETE_PROPERTY";
    Permission["MANAGE_PROPERTY_STATUS"] = "MANAGE_PROPERTY_STATUS";
    Permission["CREATE_INSPECTION"] = "CREATE_INSPECTION";
    Permission["READ_INSPECTION"] = "READ_INSPECTION";
    Permission["UPDATE_INSPECTION"] = "UPDATE_INSPECTION";
    Permission["DELETE_INSPECTION"] = "DELETE_INSPECTION";
    Permission["APPROVE_INSPECTION"] = "APPROVE_INSPECTION";
    Permission["MANAGE_USERS"] = "MANAGE_USERS";
    Permission["MANAGE_AGENTS"] = "MANAGE_AGENTS";
    Permission["VERIFY_AGENT"] = "VERIFY_AGENT";
    Permission["PROCESS_PAYMENT"] = "PROCESS_PAYMENT";
    Permission["REFUND_PAYMENT"] = "REFUND_PAYMENT";
    Permission["VIEW_TRANSACTIONS"] = "VIEW_TRANSACTIONS";
    Permission["MANAGE_ROLES"] = "MANAGE_ROLES";
    Permission["MANAGE_PERMISSIONS"] = "MANAGE_PERMISSIONS";
    Permission["VIEW_ANALYTICS"] = "VIEW_ANALYTICS";
    Permission["MANAGE_SETTINGS"] = "MANAGE_SETTINGS";
})(Permission || (exports.Permission = Permission = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType["APARTMENT"] = "APARTMENT";
    PropertyType["HOUSE"] = "HOUSE";
    PropertyType["FLAT"] = "FLAT";
    PropertyType["STUDIO"] = "STUDIO";
    PropertyType["DUPLEX"] = "DUPLEX";
    PropertyType["TERRACE"] = "TERRACE";
    PropertyType["BUNGALOW"] = "BUNGALOW";
    PropertyType["COMMERCIAL"] = "COMMERCIAL";
    PropertyType["LAND"] = "LAND";
    PropertyType["OFFICE"] = "OFFICE";
    PropertyType["WAREHOUSE"] = "WAREHOUSE";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
var ListingType;
(function (ListingType) {
    ListingType["RENT"] = "RENT";
    ListingType["SALE"] = "SALE";
    ListingType["SHORT_LET"] = "SHORT_LET";
})(ListingType || (exports.ListingType = ListingType = {}));
var FurnishingType;
(function (FurnishingType) {
    FurnishingType["FURNISHED"] = "FURNISHED";
    FurnishingType["SEMI_FURNISHED"] = "SEMI_FURNISHED";
    FurnishingType["UNFURNISHED"] = "UNFURNISHED";
})(FurnishingType || (exports.FurnishingType = FurnishingType = {}));
//# sourceMappingURL=enums.js.map