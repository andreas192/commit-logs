import fs from 'fs';
import moment from 'moment';

import Csv from './csv.js';

const today = moment();

const thisMonth = today.format("MMM y");

const todayDate = today.format("D");

const FILENAME = `${process.env.CSV_OUTPUT}Andrei Luculescu Timesheet ${thisMonth}.csv`;

export default class CommitLog {
    static async initialize () {
        return fs.existsSync(FILENAME) ?
            await Csv.parse(FILENAME) :
            [];
    }

    static groupByDate (csvContent) {
        return csvContent.reduce((group, content) => {
            const {day} = content;
            group[day] = group[day] ?? {};

            group[day] = content;

            return group;
        }, {});
    }

    static add (csvContentByDate, todayDate, commitMessage) {
        csvContentByDate[todayDate] = {
            day: todayDate,
            amount: 8,
            description: commitMessage
        };

        return csvContentByDate;
    }

    static edit (csvContentByDate, todayDate, commitMessage) {
        csvContentByDate[todayDate].description += "; " + commitMessage;

        return csvContentByDate;
    }

    static processMessage (csvContentByDate, commitMessage) {
        return !csvContentByDate[todayDate] ?
            CommitLog.add(csvContentByDate, todayDate, commitMessage) :
            CommitLog.edit(csvContentByDate, todayDate, commitMessage);
    }

    static async generateCsv (csvContentByDate) {
        await Csv.generate(FILENAME, csvContentByDate);
    }
}
