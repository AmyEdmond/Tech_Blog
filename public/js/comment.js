const commentFormHandler = async function(event) {
    event.preventDefault();
        const post_id = document.querySelector('.newCommentForm').dataset.postid;
    const commentDescription = document.querySelector('#commentDescription').value.trim();
    if (commentDescription) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id,
          commentDescription
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      document.location.reload();
    }
  };
  document
    .querySelector('.newCommentForm')
    .addEventListener('submit', commentFormHandler);