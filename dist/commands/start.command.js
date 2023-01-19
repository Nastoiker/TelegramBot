"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const telegraf_1 = require("telegraf");
const command_class_1 = require("./command.class");
const getWeek_1 = __importDefault(require("date-fns/getWeek"));
const date_fns_1 = require("date-fns");
class StartCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.start((ctx) => {
            const week = (0, getWeek_1.default)(new Date());
            console.log(week);
            if (week % 2 === 0) {
                ctx.session.week = 2;
            }
            else {
                ctx.session.week = 1;
            }
            console.log(ctx.session);
            ctx.reply("commands", telegraf_1.Markup.keyboard([
                '/today',
                '/anotherDay'
            ]));
        });
        this.bot.action("Monday", (ctx) => {
            ctx.session.courseLike = true;
            return ctx.reply("1.Программ веб приложения \n 2.Проектир и разраб интерфейса ");
        });
        this.bot.command("/today", (ctx) => {
            const today = (0, date_fns_1.format)(new Date(), "eeee");
            ctx.reply('prod. @tyforhate', telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback(today, today)
            ]));
        });
        this.bot.command("/anotherDay", (ctx) => {
            ctx.reply('prod. @tyforhate', telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback('Понедельник', 'Monday'),
                telegraf_1.Markup.button.callback('Вторник', 'Tuesday'),
                telegraf_1.Markup.button.callback('Среда', 'Wednesday'),
                telegraf_1.Markup.button.callback('Четверг', 'Thursday'),
                telegraf_1.Markup.button.callback('Пятница', 'Friday'),
            ]));
        });
        this.bot.action("Tuesday", (ctx) => {
            ctx.session.courseLike = false;
            ctx.reply("1.Разработка веб.пр\n" +
                "\n" +
                "2.ИСПРПО\n" +
                "\n" +
                "3.Проектирование веб приложений\n" +
                "4.Технолгия разр.ПО\n");
        });
        this.bot.action("Wednesday", (ctx) => {
            const first = ctx.session.week === 1 ? "1.Технолгия разр.ПО\n" : "1.Проектирование веб прил.\n";
            ctx.session.courseLike = false;
            ctx.reply(first +
                "2.Граф.дизайн\n" +
                "\n" +
                "3.Разработка веб.пр\n" +
                "\n" +
                "4.Иностранный язык в ПД\n");
        });
        this.bot.action("Thursday", (ctx) => {
            ctx.session.courseLike = false;
            ctx.reply("2.Проектир. И разраб.интерф\n" +
                "\n" +
                "3.Технолгия разр.ПО\n");
        });
        this.bot.action("Friday", (ctx) => {
            const second = ctx.session.week === 1 ? "3.Инстр. средства разр. ПО" : "3.Проектир. И разраб.интерф";
            ctx.reply("2.Граф.дизайн\n" + second + "\n " +
                "4.Физическая культура\n");
        });
    }
}
exports.StartCommand = StartCommand;
