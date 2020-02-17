const randombutton = document.getElementById('getRandomData');
if (randombutton) {
  randombutton.addEventListener('click', getRandomData);
}

function getRandomData() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then((data) => {
    let output = '<h2>Posts</h2>';
    data.forEach(function(data) {
      output += `
      <div>
      <h4>${data.title}</h4>
      <p>&emsp;${data.body}</p>
      </div>
      `;
    });
    document.getElementById('output').innerHTML = output;
  })
}