const commentFormHandler = async function(event) {
    event.preventDefault();
        const commentDescription = document.querySelector('#comment_description').value.trim();
        const postId = document.querySelector('[data-id]').getAttribute('data-id');
    if (commentDescription) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          commentDescription
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      document.location.reload();
    } else {
      alert(response.statusText);
  }
  };
  document.querySelector('.newCommentForm').addEventListener('submit', commentFormHandler);