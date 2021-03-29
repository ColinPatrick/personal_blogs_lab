import * as React from 'react';
import { json, User } from '../utils/api';
import { useHistory, Link, useParams } from 'react-router-dom';
// Admin page allows the user to edit a blog and its tags, or delete the blog
const Admin: React.FC<AdminProps> = props => {
    const history = useHistory();
    // blogid is stored as a param to keep track of the specific blog using its ID
    const { blogid } = useParams<ParamsProps>();
    // the title and content of a blog are tied to states so that their values can be updated
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    // when the page loads a fetch request is made to the blogs API route to retrieve the blog being edited by its ID
    // that blog's title and content are stored to their respective states
    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();
            setTitle(blog.title);
            setContent(blog.content);
        })(); 
    }, [blogid]);
    // a method is created to handle what happens when the save button is clicked
    // the title and content states will be sent as values in a put request to the api/blogs route for the given blog
    // when the blog data is updated in the api/db, the user is pushed to that blog's details page
    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let result = await json(`/api/blogs/${blogid}`, 'Put', { title, content });
        history.push(`/details/${blogid}`);
    }
    // a method is created to handle the event of the delete btn being clicked
    // a delete request is made to the api/blotags route of the given blog.id to delete the associated tags
    // the above must be done first or the blog won't be deleted and an error will occur
    // next a delete request is made to the api/blogs route to delete the given blog
    // if both of these requests are successful, the user is pushed home
    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/blogtags/${blogid}`, {
            method: 'DELETE'
        });
        let nextRes = await json(`/api/blogs/${blogid}`, 'DELETE');
        if (res.ok && nextRes) {
            history.push('/');
        }
    }
    // the Admin page is rendered and a form is created
    // the current value of the blog's title, content and tags (stored in states) are used as current values in the inputs
    // the input values are tied to the states to keep track of updates to any value
    // the save and delete btns are tied to their respecitve methods
    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center">
                    <h1 className="font-weight-bold text-primary mt-2">ADMIN OPTIONS</h1>
                </div>
                <div className="col-md-8">
                    <form className="form-group p-3">
                        <label className="my-2" htmlFor="title">Title</label>
                        <input 
                            defaultValue={title} 
                            onChange={e => setTitle(e.target.value)} 
                            type="text" 
                            className="form-control form-control-lg my-2" 
                            placeholder="Blog Title" 
                        />
                        <label className="my-2" htmlFor="content">Content</label>
                        <textarea 
                            defaultValue={content}
                            onChange={e => setContent(e.target.value)}
                            rows={20}
                            className="form-control form-control-lg my-2"
                            placeholder="Enter your blog content here..."
                        />
                        <div className="d-flex justify-content-around">                            
                            <Link className="btn btn-outline-secondary btn-lg my-2" to={`/details/${blogid}`}>Back</Link>
                            <button onClick={ handleSave } className="btn btn-primary btn-lg my-2">Save</button>
                            <button onClick={ handleDelete } className="btn btn-danger btn-lg my-2">Delete</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface AdminProps {}
// blogid is typed as a string
interface ParamsProps {
    blogid: string
}
// Admin page is exported
export default Admin;