const editFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value.trim();
    const content = document.querySelector('input[name="description"]').value.trim();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        postTitle,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector('.editPostForm')
    .addEventListener('submit', editFormHandler);