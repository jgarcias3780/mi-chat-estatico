const chatbotButton = document.getElementById('chatbot-button');
const chatbotButton2 = document.getElementById('chatbot-button2');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotQuestion = document.getElementById('chatbot-question');
    const chatbotSend = document.getElementById('chatbot-send');
    var urlEndpoint = "https://productdocumentationia.bizagi.com/webhook/EnglishChatCount";
    chatbotButton.style = 'background-color:rgb(158, 67, 223); box-shadow: 0 0 10px rgba(0,0,0,0.3);  opacity: 1;';
  
    chatbotButton.addEventListener('click', () => {
      chatbotButton.style = 'background-color:rgb(158, 67, 223); box-shadow: 0 0 10px rgba(0,0,0,0.3);  opacity: 1;';
      chatbotButton2.style = 'background-color:rgb(101, 42, 136) box-shadow: 0 0 10px rgba(0,0,0,0.3);  opacity: 1;';
      urlEndpoint = "https://productdocumentationia.bizagi.com/webhook/EnglishChatCount"
      chatbotMessages.innerHTML = "";
    });

    chatbotButton2.addEventListener('click', () => {
      chatbotButton2.style = 'background-color:rgb(158, 67, 223); box-shadow: 0 0 10px rgba(0,0,0,0.3);  opacity: 1;';
      chatbotButton.style = 'background-color:rgb(101, 42, 136) box-shadow: 0 0 10px rgba(0,0,0,0.3);  opacity: 1;';
      urlEndpoint = "https://productdocumentationia.bizagi.com/webhook/1125UserGuideAIChat"
      chatbotMessages.innerHTML = "";
    });

    
     // Send question to n8n webhook and display response
  chatbotSend.addEventListener('click', async () => {
    const question = chatbotQuestion.value.trim();
    if (!question) return;

      // Display user question
    const userMessage = document.createElement('div');
    userMessage.classList.add('chatbot-message', 'user-message');
    userMessage.textContent = `You: ${question}`;
    chatbotMessages.appendChild(userMessage);
    chatbotQuestion.value = '';

     // Call n8n webhook
    try {
      const response = await fetch(urlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question })
      });

      const data = await response.json();

      // Display AI response 
      
      function convertMarkdownLinksToHTML(text) {
     //Convert links
     text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
     return text;
     }   

      const aiMessage = document.createElement('div');
      aiMessage.classList.add('chatbot-message', 'bot-message');
      aiMessage.innerHTML = `Bizagi: ${convertMarkdownLinksToHTML(data.output)}`;
      chatbotMessages.appendChild(aiMessage);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }  catch (error) {
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Error: Unable to fetch response. Please try again later.';
      chatbotMessages.appendChild(errorMessage);
    }
    });