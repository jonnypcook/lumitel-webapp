import { Token } from '../models/token.model';

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    token: Token;
};