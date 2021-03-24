import { Query } from '../';

// query that calls the stored procedure 'spBlogTags' that will pull the tags for a given blog using the blogtags table
// stored procedure is detailed below the exports 
const getTags = (blogid: number) => Query('CALL spBlogTags(?)', [blogid]);
// query that inserts data into the blogtags table, which connects a blog an a tag
const insert = (blogid: number, tagid: number) => Query('INSERT INTO blogtags (blogid, tagid) VALUES (?, ?)', [blogid, tagid]);
// query that removes data from the blogtags table, which removes the connection between blog and tag (this must be done before a blog with tags can be deleted)
const remove = (blogid: number) => Query('DELETE FROM blogtags WHERE blogid = ?', [blogid]);
// all queries are exported to be used in the blogtags route
export default {
    getTags,
    insert,
    remove
}

// spBlogTags details:

// DELIMITER $$
// CREATE PROCEDURE spBlogTags(blog_id INT)
// BEGIN 
//     SELECT tags.id, tags.name, FROM blogtags
//     JOIN tags ON tags.id = blogtags.tagid
//     WHERE blogid = blog_id;
// END $$
// DELIMITER;