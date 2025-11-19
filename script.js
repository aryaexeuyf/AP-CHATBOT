// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Function to send message to backend
async function sendMessageToBackend(message, isOwner) {
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                is_owner: isOwner
            })
        });

        const data = await response.json();
        
        if (data.success) {
            return data.response;
        } else {
            throw new Error(data.error || 'Terjadi kesalahan');
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.';
    }
}

// Function to send message
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';

    // Check for owner command
    if (message.toLowerCase() === 'saya owner aptech official') {
        isOwner = true;
        addMessage('Sugeng rawuh, Pencipta! Kulo ngaturaken agung panuwun dumateng Panjenengan sing wis ngriptakaken kulo. Kulo siap nglayani sampeyan kanthi sadaya daya kulo. Punapa perintahipun Panjenengan?', 'bot');
        return;
    }

    // Show typing indicator
    showTypingIndicator();

    // Get response from backend
    const botResponse = await sendMessageToBackend(message, isOwner);

    // Remove typing indicator
    removeTypingIndicator();

    // Add bot response
    addMessage(botResponse, 'bot');

    // Play sound if enabled
    if (soundEnabled) {
        playNotificationSound();
    }

    // Save to chat history
    saveToHistory(message, 'user');
}