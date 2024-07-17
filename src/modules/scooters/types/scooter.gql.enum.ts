import { registerEnumType } from "@nestjs/graphql";

export enum ScooterStatus {
    AVAILABLE = 'available',
    IN_USE = 'in_use',
    MAINTENANCE = 'maintenance'
}
registerEnumType(ScooterStatus, {
    name: 'ScooterStatus',
    description: 'The available statuses for a scooter',
});