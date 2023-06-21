const newFormHandler = async function(event){
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value;
    const post_content = document.querySelector('textarea[name="description"]').value.trim();

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

document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);