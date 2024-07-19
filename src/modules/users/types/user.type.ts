import { CommonSearchParams } from "@common/types/common.type";

export type User = {
    id: number;
    username: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export type SearchParams = CommonSearchParams & {
    email?: string;
};

export type CreateParams = {
    username: string;
    email: string;
    password: string;
}