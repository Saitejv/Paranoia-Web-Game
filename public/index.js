
const userName = prompt("what is your name", )


const socket = io();

    socket.emit("user-joined", userName )
    
    console.log("here")
      const form = document.getElementById('form');
      const input = document.getElementById('input');
      const messages = document.getElementById('messages')
    
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value) {
          socket.emit('chat message', input.value);
          input.value = '';
        }
        createMessage(msg)
      });
      

      socket.on('question_asked', (msg)=>{

        //FINISH THIS PART
        //NOWWWWWWWWWWWW
      })
      socket.on('chat message', (msg) =>{
        const item = document.createElement('li')
        item.textContent = msg
        messages.appendChild(item)
        window.scrollTo(0, document.body.scrollHeight);

      })

      socket.on('user-disconnect', (msg) =>{
        createMessage(msg)

      })

      

      function createMessage(msg){
        const item = document.createElement('li')
        item.textContent = msg
        messages.appendChild(item)
        window.scrollTo(0, document.body.scrollHeight);
      }


      function displayQuestion(msg){

        //add this here

        

      }

const askQuestion = document.getElementById('ask_question');
askQuestion.addEventListener('submit', ()=>{
  const question = prompt("What is your question");
  socket.emit('question', question);
});