/**
 * Application Controller
 */
const App = {
    init() {
        this.addEventListeners();
    },

    addEventListeners() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        const newChatBtn = document.getElementById('newChatBtn');

        // Click Send
        sendBtn.addEventListener('click', () => this.handleSendMessage());

        // Press Enter (without Shift)
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // New Chat Button
        newChatBtn.addEventListener('click', () => UI.clearChat());

        // Auto-resize textarea
        userInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    },

    async handleSendMessage() {
        const text = UI.userInput.value.trim();
        
        if (!text) return;

        // 1. Show User Message
        UI.appendMessage('user', text);
        UI.clearInput();

        // 2. Show Typing Indicator
        UI.showTyping();

        // 3. Get AI Response
        const aiResponse = await GeminiAPI.fetchResponse(text);

        // 4. Hide typing and show AI Response
        UI.hideTyping();
        UI.appendMessage('ai', aiResponse);
    }
};

// Start the app
// document.addEventListener('DOMContentLoaded', () => App.init());

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});