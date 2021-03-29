import { Query } from '../';
// all queries for the blogs table
// query that calls all the blogs from the blog table, joining the authors table to get the author's name
const all = () => Query('SELECT blogs.*, authors.name FROM blogs JOIN authors on authors.id = blogs.authorid');
// query that selects one blog - also joins the authors table to get the author's name
const one = (id: number) => Query('SELECT blogs.*, authors.name FROM blogs JOIN authors on authors.id = blogs.authorid WHERE blogs.id = ?', [id]);
// query that inserts/posts a new blog to the table
const insert = (newBlog: { title: string; content: string; authorid: number }) => Query('INSERT INTO blogs SET?', newBlog);
// query that updates data of a given blog within the db
const update = (editBlog: {title: string; content: string }, id: number) => Query('UPDATE blogs SET ? WHERE id = ?', [editBlog, id]);
// query that deletes all data of a given blog within the db
const remove = (id: number) => Query('DELETE FROM blogs WHERE id = ?', [id]);
// all queries are exported to be used in the blogs api route
export default {
    all,
    one,
    insert,
    update,
    remove
} 