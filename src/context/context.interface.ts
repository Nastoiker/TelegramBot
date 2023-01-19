import { Context } from 'telegraf';
export interface IBotContext extends Context {
    session: SessionData;
}
export interface SessionData {
    courseLike: boolean;
    week: 1 | 2;
}