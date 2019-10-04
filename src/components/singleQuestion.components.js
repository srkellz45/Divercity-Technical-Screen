import React from 'react';
import Moment from 'moment';
import Linkify from 'linkifyjs/react';

const IndividualQuestion = ({ answers, ID }) => {
  return (
    <div className="question-grid">
      <div id="question-reply-photo">
        <a href={`/users/${answers.author_id}`}>
          <img src={ answers.author_info.avatar_medium } alt="profile" />
        </a>
      </div>
      <div id="question-reply">
        <div id="question-reply-author">
          <a href={`/users/${answers.author_id}`}>{ answers.author_info.name }</a>
          &nbsp;<b>&sdot;</b>&nbsp;{ Moment(answers.created_at).fromNow() }
        </div>
        <div id="question-reply-body">
          <Linkify>
            { answers.text }
          </Linkify>
        </div>
      </div>
    </div>
  )
}

export default IndividualQuestion;

// if(comments !== undefined){
//     return (
//       <div className="question-grid">
//         <div className="topicdate">
//           <NavLink to={`groups/${id}/`}>
//             { topic }&nbsp;<b>&sdot;</b>&nbsp;{ date }
//           </NavLink>
//         </div>
//         <div id="question-item">
//           <div id="question-photo">
//             <img src={ authorImage } alt="profile" />
//           </div>
//           <div id="question-body">
//             <NavLink to={`questions/${questionID}/`}>
//             { body }
//             </NavLink>
//           </div>
//           <div id="question-author">
//             posted by&nbsp;
//               <a href={`/users/${authorId}`}>{ author }</a>
//             &nbsp;comments by
//             <div className="question-comment-image">
//               { comments.map((photo) => (
//               <img className="question-comment-photo" src={ photo.avatar_medium } key={ photo.id } alt="profile"/>
//               ))}
//             </div>
//           </div>
//         </div>
//         <hr />
//         <div id="question-reply-photo">
//           <a href={`/users/${replyId}`}>
//             <img src={ replyImage } alt="profile" />
//           </a>
//         </div>
//         <div id="question-reply">
//           <div id="question-reply-author">
//             <a href={`/users/${replyId}`}>{ replyAuthor }</a>
//           </div>
//           <div id="question-reply-body">
//             { reply }
//           </div>
//         </div>
//         <div className="question-add-comment">
//           <hr />
//           <div id="question-reply-photo">
//             <a href={`/users/${replyId}`}>
//               <img src={ localStorage.image } alt="profile" />
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//       return (
//         <div className="question-grid">
//           <div className="topicdate">
//           <NavLink to={`groups/${id}/`}>
//             { topic }&nbsp;<b>&sdot;</b>&nbsp;{ date }
//           </NavLink>
//           </div>
//           <div id="question-item">
//             <div id="question-photo">
//               <img src={ authorImage } alt="profile" />
//             </div>
//             <div id="question-body">
//               { body }
//             </div>
//             <div id="question-author">
//               posted by&nbsp;
//               <a href={`/users/${authorId}`}>{ author }</a>
//               &nbsp;no comments yet.
//             </div>
//           </div>
//           <hr />
//         </div>
//       );
//     }