import * as React from 'react';
import type { IBlog } from '../utils/types';
import PreviewCard from '../components/PreviewCard';
// home page created in the Home FC
const Home: React.FC<HomeProps> = props => {
    // blogs state is used to store the blogs received from API
    const [blogs, setBlogs] = React.useState<IBlog[]>([]);
    // fetch request is used to recieve blogs from API and then stored to the 'blogs' state
    React.useEffect(() => {
        (async () => {
            const res = await fetch('/api/blogs');
            const blogs = await res.json();
            setBlogs(blogs);
        })();    
    }, []);
    // Home page is rendered and the blogs are mapped through to create a card for each one
    // PreviewCard component is called to set up these cards
    return (
        <main className="container">
            <section className="row">
                <div className="col-12 d-flex justify-content-center">
                    <h1 className="font-weight-bold text-primary mb-2">BLOGS</h1>
                </div>
                {blogs.map(blog => (
                    <PreviewCard key={`blog-preview-${blog.id}`} blog={blog} />
                ))}
            </section>
        </main>
    );
}

interface HomeProps {}
// Home is exported
export default Home;