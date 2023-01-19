import {IBotContext} from "../context/context.interface";
import {Telegraf} from "telegraf";

export abstract class Command {
    constructor(public readonly bot: Telegraf<IBotContext>) {

    }
    abstract handle(): void;
}