const chatbotButton = document.getElementById('chatbot-button');
const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotQuestion = document.getElementById('chatbot-question');
    const chatbotSend = document.getElementById('chatbot-send');

  
    chatbotButton.addEventListener('click', () => {
      chatbotWindow.style.display = chatbotWindow.style.display === 'none' || !chatbotWindow.style.display ? 'flex' : 'none';
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
      const response = await fetch('https://productdocumentationia.bizagi.com/webhook/1125UserGuideAIChat', {
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