import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import type { IBlog } from '../utils/types';
// PreviewCard component creates a preview card for each blog mapped through from the Home page
// A Link is added to the bottom of the card that brings the user to the Admin page for each individual blog
const PreviewCard: React.FC<PreviewCardProps> = ({ blog }) => {
    return (
        <div className="col-md-4">
            <article className="card my-2 rounded-lg shadow">
                <div className="card-body">
                    <h4 className="card-title">{blog.title}</h4>
                    <p className="card-text text-muted mb-2">{blog.name}</p>
                    <p className="card-text">{blog.content.substring(0, 125)} ...</p>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="card-text text-muted mb-0">{moment(blog._created).format("MMM Do YYYY")}</p>
                        <Link className="btn btn-sm btn-primary" to={`/details/${blog.id}`}>Read More!</Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
// the blog is typed using the IBlog interface imported from the types file in the utils folder
interface PreviewCardProps {
    blog: IBlog
}
// component is exported
export default PreviewCard;