const superagent = require('superagent');

window.onload = () => {  
  const input = window.document.getElementById('yt2mp3input');
  const button = window.document.getElementById('submitconvert');
  const results = window.document.getElementById('fileresults');
  
  button.addEventListener('click', () => {
    const url = input.value;
    const notification = document.createElement('div');
    notification.innerHTML = 'please wait for conversion';
    
    button.remove();
    results.appendChild(notification);
    
    superagent
    .get('/yt2mp3')
    .query({
      url
    })
    .timeout({
      response: 300000,
      deadline: 600000,
    })
    .end((err, res) => {
      const aTag = document.createElement('a');
      aTag.href = res.text;
      aTag.innerHTML = 'right click save as';
      results.appendChild(aTag);
    })    
  });
}
