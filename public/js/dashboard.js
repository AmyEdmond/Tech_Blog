const newFormHandler = async function(event){
    event.preventDefault();

    const postTitle = document.querySelector('input[name="postTitle"]').value;
    const description = document.querySelector('textarea[name="description"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            postTitle,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}



const editFormHandler = async function(event) {
    event.preventDefault();
  
    const postTitle = document.querySelector('input[name="postTitle"]').value.trim();
    const description = document.querySelector('input[name="description"]').value.trim();
  
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
  
  
const deleteFormHandler = async function(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        post_id: id,
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
  

  document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);
  document.querySelector('.editPostForm').addEventListener('submit', editFormHandler);

  document.querySelector('.deletePostBtn').addEventListener('click', deleteFormHandler);