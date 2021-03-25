import * as mysql from 'mysql';
import config from '../config';
// mysql pool created and connection stored
const pool = mysql.createPool(config.mysql); 
// mysql Query is outlined here
export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        
        const sql = mysql.format(query, values);

        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
// all queries are imported
import blogs from './queries/blogs';
import blogtags from './queries/blogtags';
import tags from './queries/tags';
import authors from './queries/authors';
import accesstokens from './queries/accesstokens';
// exported for future use
export default {
    blogs,
    blogtags,
    tags,
    authors,
    accesstokens
}