const superagent = require('superagent');

window.onload = () => {  
  const input = window.document.getElementById('yt2mp3input');
  const button = window.document.getElementById('submitconvert');
  const results = window.document.getElementById('fileresults');
  
  const submit = (event) => {
    event.preventDefault();
    button.removeEventListener('click', submit);
    
    const url = input.value;
    const notification = document.createElement('div');
    notification.innerHTML = 'please wait for conversion';
    
    button.remove();
    input.remove();
    results.appendChild(notification);
    
    superagent
    .get('/yt2mp3')
    .retry(0)
    .query({
      url
    })
    .timeout({
      response: 300000,
      deadline: 600000,
    })
    .end((err, res) => {
      const id = res.text;
      
      const getStatus = () => {
        superagent
        .get('/status')
        .query({
          id
        })
        .end((err, res) => {
          if (res.text === 'ready') {
            const aTag = document.createElement('a');
            const output = `/output/${id}_finished.mp3`;
            aTag.href = output;
            aTag.innerHTML = 'right click save as';
            results.appendChild(aTag);
            window.clearInterval(interval);
            getStatus = 0;
          } else {
            return false;
          }
        })
      }
      
      const interval = window.setInterval(getStatus, 10000);
    })    
  };
  
  button.addEventListener('click', submit);
}
