const chatContainer = document.getElementById('chatContainer');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const resetBtn = document.getElementById('resetBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const uploadedFilesDiv = document.getElementById('uploadedFiles');
const filesListDiv = document.getElementById('filesList');

let sessionId = generateSessionId();
let isProcessing = false;
let uploadedFiles = [];

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// File upload handling
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadedFiles.push({
                name: file.name,
                content: event.target.result,
                size: file.size
            });
            updateFilesList();
        };
        reader.readAsText(file);
    }
    
    fileInput.value = '';
});

function updateFilesList() {
    if (uploadedFiles.length === 0) {
        uploadedFilesDiv.classList.add('hidden');
        return;
    }
    
    uploadedFilesDiv.classList.remove('hidden');
    filesListDiv.innerHTML = uploadedFiles.map((file, index) => `
        <div class="flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg text-sm">
            <i class="fas fa-file-alt"></i>
            <span>${file.name}</span>
            <span class="text-xs text-indigo-600">(${(file.size / 1024).toFixed(1)} KB)</span>
            <button onclick="removeFile(${index})" class="ml-2 text-indigo-600 hover:text-indigo-800">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

window.removeFile = function(index) {
    uploadedFiles.splice(index, 1);
    updateFilesList();
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message flex items-start space-x-3';
    
    if (isUser) {
        messageDiv.classList.add('flex-row-reverse', 'space-x-reverse');
    }
    
    const avatar = document.createElement('div');
    avatar.className = 'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center';
    
    if (isUser) {
        avatar.classList.add('bg-indigo-600');
        avatar.innerHTML = '<i class="fas fa-user text-white"></i>';
    } else {
        avatar.classList.add('gradient-bg');
        avatar.innerHTML = '<i class="fas fa-palette text-white"></i>';
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'flex-1 rounded-2xl p-4 max-w-3xl';
    
    if (isUser) {
        messageContent.classList.add('bg-indigo-600', 'text-white', 'rounded-tr-none');
    } else {
        messageContent.classList.add('bg-gray-100', 'text-gray-800', 'rounded-tl-none');
    }
    
    const formattedContent = formatMessage(content);
    messageContent.innerHTML = formattedContent;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);
    
    scrollToBottom();
}

function formatMessage(content) {
    let formatted = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<div class="code-block"><code>${escapeHtml(code.trim())}</code></div>`;
    });
    
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-2 py-1 rounded text-sm">$1</code>');
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message flex items-start space-x-3';
    typingDiv.innerHTML = `
        <div class="flex-shrink-0 w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
            <i class="fas fa-palette text-white"></i>
        </div>
        <div class="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatContainer.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function sendMessage(message) {
    if (isProcessing || (!message.trim() && uploadedFiles.length === 0)) return;
    
    isProcessing = true;
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    
    // Build message with file context
    let fullMessage = message;
    if (uploadedFiles.length > 0) {
        fullMessage += '\n\n[Uploaded Files]:\n';
        uploadedFiles.forEach(file => {
            fullMessage += `\nFile: ${file.name}\nContent:\n\`\`\`\n${file.content}\n\`\`\`\n`;
        });
    }
    
    addMessage(message + (uploadedFiles.length > 0 ? ` (with ${uploadedFiles.length} file(s))` : ''), true);
    messageInput.value = '';
    addTypingIndicator();
    
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: fullMessage,
                sessionId: sessionId,
                files: uploadedFiles
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }
        
        const data = await response.json();
        removeTypingIndicator();
        addMessage(data.response, false);
        
        // Clear uploaded files after sending
        uploadedFiles = [];
        updateFilesList();
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage('Sorry, I encountered an error. Please try again.', false);
    } finally {
        isProcessing = false;
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<span>Send</span><i class="fas fa-paper-plane"></i>';
        messageInput.focus();
    }
}

async function resetChat() {
    if (!confirm('Are you sure you want to reset the chat? This will clear all conversation history.')) {
        return;
    }
    
    try {
        await fetch('http://localhost:3000/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: sessionId
            })
        });
        
        chatContainer.innerHTML = `
            <div class="message flex items-start space-x-3">
                <div class="flex-shrink-0 w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <i class="fas fa-palette text-white"></i>
                </div>
                <div class="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
                    <p class="text-gray-800">Hello! I'm Codex Web Designer, your autonomous website design and development agent. I can help you with HTML, CSS, JavaScript, React, Next.js, and more. I have direct access to GitHub repositories and can read, edit, create files, and manage pull requests. How can I assist you today?</p>
                </div>
            </div>
        `;
        
        sessionId = generateSessionId();
        
    } catch (error) {
        console.error('Error resetting chat:', error);
        alert('Failed to reset chat. Please try again.');
    }
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
    }
});

resetBtn.addEventListener('click', resetChat);
messageInput.focus();

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});
