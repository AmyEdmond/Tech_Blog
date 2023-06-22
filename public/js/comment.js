const commentFormHandler = async function(event) {
    event.preventDefault();
        const commentDescription = document.querySelector('input[name="commentBody"]').value.trim();
        const post_id = window.location.toString().split('/')[
          window.location.toString().split('/').length - 1
        ];
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
    } else {
      alert(response.statusText);
  }
  };
  document.querySelector('.newCommentForm').addEventListener('submit', commentFormHandler);