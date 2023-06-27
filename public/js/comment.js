const commentFormHandler = async function(event) {
    event.preventDefault();
    console.log(event);
    const postId = event.target.dataset.id;
    const commentDescription = document.getElementById("comment-" + postId).value.trim();
        
    if (commentDescription) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          post_id: postId,
          comment_description: commentDescription
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: "manual"
      });
      
      if (response.status === 0) {
        document.location="/login";
      }
     document.location.reload();
    } else {
      alert(response.statusText);
  }
  };
  const forms = document.querySelectorAll('.newCommentForm');
  
    for (let i=0; i<forms.length; i++) {
    const form = forms[i];
    console.log(form);
    form.addEventListener("submit", commentFormHandler);
  }
  