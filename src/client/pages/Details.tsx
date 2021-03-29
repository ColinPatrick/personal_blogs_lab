import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import * as moment from 'moment';
import type { IBlog, ITag } from '../utils/types';
import { User } from '../utils/api';

const Details: React.FC<DetailsProps> = (props) => {
    // the blog ID is stored as a param 
    const { blogid } = useParams<ParamsProps>();
    // states are used to keep track of the blog stored from the blogid and its tags
    const [blog, setBlog] = React.useState<IBlog>(null);
    const [blogtags, setBlogtags] = React.useState<ITag[]>([]);
    const [adminLink, setAdminLink] = React.useState<string>('')
    // when the page loads, fetch requests are made to the API routes to get the specific blog and its tags
    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/blogs/${blogid}`);
            const blog = await res.json();
            const nextRes = await fetch(`/api/blogtags/${blogid}`);
            const blogtags = await nextRes.json();
            // the blog and its tags are stored in their respective states
            setBlog(blog);
            setBlogtags(blogtags);
            console.log(User.role);
            if (User.userid == blog.authorid || User.role == 'admin') {
                setAdminLink('m-2');
            } else {
                setAdminLink('d-none');
            };
        })();        
    }, []);
    // since the main render is dependent on the fetch requests, an temporary render is created
    // a page will not load if there isn't something to render immediately
    if (!blog) {
        return <h1>Loading...</h1>
    }
    // Details page render creates a card using the data retrieved from the fetch request
    // all of the blogs data is displayed to the user
    // one link at the bottom of the page takes the user back to the home page
    // the other link uses the blogid value to take the user to an admin page for the given blog
    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <article className="card my-2 shadow rounded">
                        <div className="card-body">
                            <h1 className="card-text text-center py-1">{blog.title}</h1>
                            <h6 className="card-text text-center text-muted mb-2 py-1">{blog.name}, {moment(blog._created).format("MMM Do YYYY")}</h6>
                            <div className="d-flex justify-content-center flex-wrap align-items-center">
                                {blogtags.map(blogtag => (
                                    <span className="badge text-info mx-2" key={`blogtag-${blogtag.id}`}>#{blogtag.name}</span>
                                ))}
                            </div>
                            <div className="card-text px-md-5 my-3">{blog.content.split('\n').map((para, i) => (
                                <p key={`para-block-${i}`}>{para}</p>
                            ))}</div>
                            <div className="d-flex justify-content-around">
                                <Link className="btn btn-outline-secondary m-2" to='/'>Back to Blogs</Link>
                                <Link className={`btn btn-outline-secondary ${adminLink}`} to={`/admin/${blogid}`}>Admin Options</Link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
}
// blogid is typed as string
interface ParamsProps {
    blogid: string
}

interface DetailsProps {}
// Details page is exported
export default Details;