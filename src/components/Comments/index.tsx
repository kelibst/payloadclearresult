import { Comment } from '@/payload-types';
import React from 'react';
import RichText from '../RichText';



const Comment: React.FC<{ comment:Comment }> = ({ comment }) => { // Corrected type
    //@ts-expect-error
    const authorName = comment?.author?.firstName + ' ' + comment?.author?.lastName
    return (
        <div>
            {/* Rich text rendering may vary based on your rich text solution */}
            {/* <RichText data={comment?.content} /> */}
           { comment?.author && <p>By: {authorName}</p>}
        </div>
    )
}



export default Comment

