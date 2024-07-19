import { CommonSearchParams } from "@common/types/common.type";
import { ScooterStatus } from "./scooter.enum";

export type Scooter = {
    id: number;
    model: string;
    status: ScooterStatus;
    latitude: number;
    longitude: number;
    batteryLevel: number;
    serialNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SearchParams = CommonSearchParams & {
    statuses?: ScooterStatus[];
    serialNumber?: string;
};

export type CreateParams = {
    model: string;
    status: ScooterStatus;
    latitude: number;
    longitude: number;
    batteryLevel: number;
    serialNumber: string;
}

export type UpdateParams = {
    id: number;
    status?: ScooterStatus;
    latitude?: number;
    longitude?: number;
    batteryLevel?: number;
}