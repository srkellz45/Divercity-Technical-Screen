import React from 'react';
import { NavLink } from 'react-router-dom';

const Question = ({ topic, date, body, topicImage, editQuestion, author, authorImage, authorId, questionID, comments, reply, replyImage, replyAuthor, replyId, id }) => {
  let addDefaultSrc = (evt) => {
    evt.target.src = 'https://s3-us-west-2.amazonaws.com/pinc-backend/images/cdn/avatars/Profile2.png';
  };

	let generateBody = body => (
		<div>
			{body.replace(/\bhttps?:\/\/\S+/gi, "")}

			{body.match(/\bhttps?:\/\/\S+/gi) && body.match(/\bhttps?:\/\/\S+/gi).map((link, i) => <div className="linkified" key={i}>{link}</div>)}
		</div>
	);

  if(comments !== undefined){
    return (
      <div className="question-grid">
        <div className="topicdate">
          <NavLink to={`/groups/${id}/`}>
            { topic }
          </NavLink>
        </div>
        <div id="question-item">
          <div id="question-photo">
            <img src={ authorImage } onError={ addDefaultSrc } alt="profile" />
          </div>
          <div id="question-body">
          { authorId === parseInt(localStorage.id) && (
            <button
              className="Question-Delete-btn"
              type="button"
              id={questionID}
              onClick={editQuestion}>
              &middot;&middot;&middot;
            </button>
          )}
            <NavLink to={`/questions/${questionID}/`}>
              {generateBody(body)}
            </NavLink>

            {
            	(topicImage && (topicImage !== "https://apinew.pincapp.com/images/default_avatar.png")) ? (
					<div id="question-image">
						<img className="question-content-image" src={ topicImage } alt="profile"/>
					</div>
                ) : null 
            }
          </div>

          <div id="question-author">
            posted by&nbsp;
              <a href={`/users/${authorId}`}>{ author }</a>
            &nbsp;comments by
            <div className="question-comment-image">
              { comments.map(photo => (
              <img className="question-comment-photo" src={ photo.avatar_medium } onError={ addDefaultSrc } key={ photo.id } alt="profile"/>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div id="question-reply-photo">
          <a href={`/users/${replyId}`}>
            <img src={ replyImage } onError={ addDefaultSrc } alt="profile" />
          </a>
        </div>
        <div id="question-reply">
          <div id="question-reply-author">
            <a href={`/users/${replyId}`}>{ replyAuthor }</a>
          </div>
          <div id="question-reply-body">
            {generateBody(body)}
          </div>
        </div>
        <div className="question-add-comment">
          <hr />
          <div id="question-reply-photo">
            <img src={ localStorage.image } onError={ addDefaultSrc } alt="profile" />
          </div>
        </div>
      </div>
    );
  } else {
      return (
        <div className="question-no-comment-grid">
          <div className="topicdate">
          <NavLink to={`/groups/${id}/`}>
            { topic }&nbsp;<b>&sdot;</b>&nbsp;{ date }
          </NavLink>
          </div>
          <div id="question-item">
            <div id="question-photo">
              <img src={ authorImage } onError={ addDefaultSrc } alt="profile" />
            </div>
            <div id="question-body">
            { authorId === parseInt(localStorage.id) && (
              <button
                className="Question-Delete-btn"
                type="button"
                id={questionID}
                onClick={editQuestion}>
                &middot;&middot;&middot;
              </button>
            )}
              <NavLink to={`/questions/${questionID}/`}>
                {generateBody(body)}
              </NavLink>
              { topicImage && (
                <React.Fragment>
                  { topicImage !== "https://apinew.pincapp.com/images/default_avatar.png" ? (
                    <div id="question-image">
                      <img className="question-content-image" src={ topicImage } alt="profile"/>
                    </div>
                  ) : null }
                </React.Fragment>
              )}
            </div>
            <div id="question-author">
              posted by&nbsp;
              <a href={`/users/${authorId}`}>{ author }</a>
              &nbsp;no comments yet.
            </div>
          </div>
          <hr />
          <div id="question-reply-photo">
            <img src={ localStorage.image } onError={ addDefaultSrc } alt="profile" />
          </div>
        </div>
      );
    }
}

export default Question;
