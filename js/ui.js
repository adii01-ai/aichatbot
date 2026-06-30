/**
 * UI logic for rendering messages and effects
 */
const UI = {
    chatWindow: document.getElementById('chatWindow'),
    userInput: document.getElementById('userInput'),

    // Add a message bubble to the chat
    appendMessage(role, text) {
        // Remove welcome message on first interaction
        const welcome = document.querySelector('.welcome-message');
        if (welcome) welcome.remove();

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', role);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        if (role === 'ai') {
            // Parse Markdown and highlight code blocks
            contentDiv.innerHTML = marked.parse(text);
            contentDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        } else {
            contentDiv.textContent = text;
        }

        messageDiv.appendChild(contentDiv);
        this.chatWindow.appendChild(messageDiv);
        this.scrollToBottom();
    },

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.classList.add('typing');
        typingDiv.textContent = 'Gemini is thinking...';
        this.chatWindow.appendChild(typingDiv);
        this.scrollToBottom();
    },

    hideTyping() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    },

    scrollToBottom() {
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
    },

    clearInput() {
        this.userInput.value = '';
        this.userInput.style.height = 'auto';
    },

    clearChat() {
        this.chatWindow.innerHTML = '<div class="welcome-message"><h2>How can I help you today?</h2></div>';
    }
};
