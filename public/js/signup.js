const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#nameSignup').value.trim();
    const username = document.querySelector('#usernameSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
  
    if (name && username && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signupForm')
  .addEventListener('submit', signupFormHandler);