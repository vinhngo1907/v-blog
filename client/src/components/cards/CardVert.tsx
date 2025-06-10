import React from "react";
import { IBlog } from "../../utils/TypeScript";
import { Link } from "react-router-dom";
interface IProps {
    blog: IBlog
}

const CardVert: React.FC<IProps> = ({ blog }) => {
    console.log({blog})
    return (
        <div className="card">
            {
                typeof (blog.thumbnail) === 'string' &&
                <img src={blog.thumbnail} className="card-img-top" alt="..."
                    style={{ height: '180px', objectFit: 'cover' }} />
            }
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/blog/${blog._id}`} style={{
                        textDecoration: 'none', textTransform: 'capitalize'
                    }}>
                        {blog.title.slice(0, 50) + '...'}
                    </Link>
                </h5>
                <p className="card-text">
                    {blog.description.slice(0, 100) + '...'}
                </p>

            </div>
        </div>
    )
}

export default CardVert;