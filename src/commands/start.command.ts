import {Markup, Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import {Command} from "./command.class";
import  getWeek  from 'date-fns/getWeek'
import weeksToDays from 'date-fns/weeksToDays';
import {format} from "date-fns";
export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((ctx) => {
            const week = getWeek(new Date());
            console.log(week);
            if(week%2===0) {
                ctx.session.week = 2;
            } else {
                ctx.session.week = 1;
            }
            console.log(ctx.session);
            ctx.reply("commands", Markup.keyboard([
                '/today',
                '/anotherDay'
            ]));
        });

        this.bot.action("Monday", (ctx) => {
            ctx.session.courseLike = true;
            return ctx.reply("1.Программ веб приложения \n 2.Проектир и разраб интерфейса ");
        });
        this.bot.command("/today", (ctx) => {
            const today = format(new Date(), "eeee");
            ctx.reply('prod. @tyforhate', Markup.inlineKeyboard([
                Markup.button.callback(today, today)
            ]));});
        this.bot.command("/anotherDay", (ctx) => {
            ctx.reply('prod. @tyforhate', Markup.inlineKeyboard([
                Markup.button.callback('Понедельник', 'Monday'),
                Markup.button.callback('Вторник', 'Tuesday'),
                Markup.button.callback('Среда', 'Wednesday'),
                Markup.button.callback('Четверг', 'Thursday'),
                Markup.button.callback('Пятница', 'Friday'),
            ]));});

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
            ctx.reply(
                first +
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
            ctx.reply("2.Граф.дизайн\n" + second + "\n "+
                "4.Физическая культура\n");
        });
    }
}