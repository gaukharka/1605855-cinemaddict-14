
export const createCommentTemplate = (filmInfo) => {

  for(let i=0; i<filmInfo.comments.length; i++) {`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${filmInfo.comments[i].emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${filmInfo.comments[i].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${filmInfo.comments[i].author}</span>
          <span class="film-details__comment-day">${filmInfo.comments[i].data}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }
};
