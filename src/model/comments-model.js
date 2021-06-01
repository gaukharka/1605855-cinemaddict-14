import Observer from '../utils/observer';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      ...this._comments,
      update,
    ];

    this._notify(updateType);
  }

  deleteComment(updateType, commentId) {
    const commentIndex = this._comments.findIndex((comment) => comment.id === commentId);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, commentIndex),
      ...this._comments.slice(commentIndex + 1),
    ];

    this._notify(updateType);
  }
}
