import { CommonSearchParams } from "@common/types/common.type";

export type RentRecord = {
    id: number;
    userId: number;
    scooterId: number;
    startTime: Date;
    endTime: Date | null;
    startLatitude: number | null;
    startLongitude: number | null;
    endLatitude: number | null;
    endLongitude: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export type SearchParams = CommonSearchParams & {
    userId?: number;
    scooterId?: number;
};

export type CreateParams = {
    userId: number;
    scooterId: number;
    startLatitude: number;
    startLongitude: number;
}

export type UpdateParams = {
    id: number;
    endLatitude: number;
    endLongitude: number;
}