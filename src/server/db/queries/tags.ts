import { Query } from '../index';
// query that selects all data from the tags table
const all = () => Query('SELECT * FROM tags');
// tags query is exported to be used in tags route
export default { 
    all
}