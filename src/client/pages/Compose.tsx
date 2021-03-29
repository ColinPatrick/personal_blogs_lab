import * as React from 'react';
import { json, User } from '../utils/api';
import { useHistory } from 'react-router-dom';
import { ITag } from '../utils/types';
// Compose page uses an FC to allow the user to create a new blog
const Compose: React.FC<ComposeProps> = props => {
    const history = useHistory();
    // states are used to store the title, content, and chosen tag for the blog
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [tagSelect, setTagSelect] = React.useState('0');
    // this state is used to store the tag options from the API
    const [tags, setTags] = React.useState<ITag[]>([]);
    // when the page loads, a fetch request is made to the API to get the tag options
    // these are stored in the 'tags' state
    React.useEffect(() => {
        if (User.userid == null) {
            history.push('/login');
        }
        (async () => {
            const res = await fetch('/api/tags');
            const tags = await res.json();
            setTags(tags);  
        })();
    }, []);
    // method that uses the api/blogs route to post the new blog to the db when the submit btn is clicked
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let blog: { authorid: number, title: string, content: string } = {
            authorid: User.userid,
            title: title,
            content: content 
        }

        let result = await json('/api/blogs', 'POST', blog);
        const blogResult = result;
        // if a tag is chosen, another post request is made to add that tags to the db
        if(tagSelect !== '0') {
            const nextRes = await fetch('/api/blogtags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blogid: blogResult.id, tagid: tagSelect })
            });
            const blogTagResults = await nextRes.json();
        }
        // when all of the posts are finished, the user is pushed to the Details page for the blog        
        history.push(`/details/${blogResult.id}`);
    }
    // page render for the Compose page view
    // a form is created and tied to the title, content, and tagSelect states
    // submit btn is tied to the handleSubmit method
    // tags are mapped through to create the tag options the user can choose from
    return (
        <main className="container">
            <section className="row d-flex justify-content-center">
                <div className="col-md-12 d-flex justify-content-center">
                    <h1 className="font-weight-bold text-primary mt-2">WRITE A BLOG</h1>
                </div>
                <div className="col-8">
                    <form className="form-group p-3">
                        <label className="my-2" htmlFor="title">Title</label>
                        <input 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            type="text" 
                            className="form-control form-control-lg my-2" 
                            placeholder="Blog Title" 
                        />
                        <label className="my-2" htmlFor="content">Content</label>
                        <textarea 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={20}
                            className="form-control form-control-lg my-2"
                            placeholder="Enter your blog content here..."
                        />
                        <label className="my-2" htmlFor="select tag">Select a tag</label>
                        <select value={tagSelect} onChange={e => setTagSelect(e.target.value)} className="form-control form-control-lg my-2">
                            <option disabled value="0">None</option>
                            {tags.map(tag => (
                                <option key={`tag-number-${tag.id}`} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        <div className="d-flex justify-content-end">
                            <button onClick={ handleSubmit } className="btn btn-primary btn-lg my-3">Post</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface ComposeProps {}
// Comose page exported
export default Compose;