import Promise from 'bluebird';
import {parse, stringify} from 'csv';
import fs from 'fs';

export default class Csv {

    static initializeHeader () {
        return {
            day: 'day',
            amount: 'amount',
            description: 'description',
        };
    }

    static async generate(filename, rows) {
        try {
            stringify(rows, {
                header: true,
                columns: Csv.initializeHeader(),
            }, (err, data) => {
                if (err) {
                    console.log("stringify err: ", err);
                }

                fs.writeFileSync(filename, data);
            })

        } catch (err) {
            throw new Error(`Unable to generate csv file with name: ${filename} and rows: ${rows} with err: ${err}`);
        }
    }

    static async parse(filename) {
        try {
            const csvPromise = new Promise((resolve, reject) => {
                fs.readFile(filename, (err, fileData) => {
                    if (err) {
                        return reject(err);
                    }

                    parse(
                        fileData,
                        {
                            headers: true,
                            columns: true,
                            skip_empty_lines: true,
                            delimiter: ","
                        },
                        function(err, rows) {
                            if (err) {
                                return reject(err);
                            }
                            resolve(rows) ;
                        }
                    );
                });
              })


            return await csvPromise;
        } catch (e) {
            throw new Error(`Unable to parse csv file with name: ${filename}`);
        }
    }
}
