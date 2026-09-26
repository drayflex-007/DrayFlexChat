const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");

/*
    DrayFlexChat API

    During local development:
    http://localhost:8000

    When we deploy the backend, this URL will be changed
    to the real DrayFlexChat backend address.
*/
const API_URL = "http://localhost:8000";


/* =========================
   ADD MESSAGE TO CHAT
========================= */

function addMessage(message, sender) {
    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    if (sender === "user") {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("assistant-message");
    }

    const nameDiv = document.createElement("div");

    nameDiv.classList.add("message-name");

    nameDiv.textContent =
        sender === "user"
            ? "You"
            : "DrayFlexChat";

    const contentDiv = document.createElement("div");

    contentDiv.classList.add("message-content");

    contentDiv.textContent = message;

    messageDiv.appendChild(nameDiv);
    messageDiv.appendChild(contentDiv);

    chatMessages.appendChild(messageDiv);

    scrollToBottom();
}


/* =========================
   SCROLL TO LATEST MESSAGE
========================= */

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


/* =========================
   SHOW TYPING MESSAGE
========================= */

function showTypingIndicator() {
    const typingDiv = document.createElement("div");

    typingDiv.id = "typingIndicator";
    typingDiv.classList.add(
        "message",
        "assistant-message"
    );

    const nameDiv = document.createElement("div");

    nameDiv.classList.add("message-name");

    nameDiv.textContent = "DrayFlexChat";

    const contentDiv = document.createElement("div");

    contentDiv.classList.add("message-content");

    contentDiv.textContent = "Thinking...";

    typingDiv.appendChild(nameDiv);
    typingDiv.appendChild(contentDiv);

    chatMessages.appendChild(typingDiv);

    scrollToBottom();
}


/* =========================
   REMOVE TYPING MESSAGE
========================= */

function removeTypingIndicator() {
    const typingIndicator =
        document.getElementById("typingIndicator");

    if (typingIndicator) {
        typingIndicator.remove();
    }
}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage() {

    const message =
        messageInput.value.trim();

    if (!message) {
        return;
    }


    /* Show user's message */

    addMessage(message, "user");


    /* Clear input */

    messageInput.value = "";


    /* Disable button */

    sendButton.disabled = true;

    sendButton.textContent = "Sending...";


    /* Show AI thinking indicator */

    showTypingIndicator();


    try {

        const response = await fetch(
            `${API_URL}/chat`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        /* Check server response */

        if (!response.ok) {
            throw new Error(
                `Server error: ${response.status}`
            );
        }


        /* Convert response to JSON */

        const data =
            await response.json();


        /* Remove thinking indicator */

        removeTypingIndicator();


        /* Display AI response */

        if (data.reply) {

            addMessage(
                data.reply,
                "assistant"
            );

        } else {

            addMessage(
                "I received an empty response from the AI service.",
                "assistant"
            );
        }


    } catch (error) {

        console.error(
            "DrayFlexChat error:",
            error
        );


        removeTypingIndicator();


        addMessage(
            "I couldn't connect to the DrayFlexChat server. Please make sure the backend is running and try again.",
            "assistant"
        );

    } finally {

        /* Re-enable button */

        sendButton.disabled = false;

        sendButton.textContent = "Send";

        messageInput.focus();
    }
}


/* =========================
   SEND BUTTON
========================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


/* =========================
   ENTER KEY
========================= */

messageInput.addEventListener(
    "keydown",
    function(event) {

        /*
            Enter = send
            Shift + Enter = new line
        */

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }
    }
);


/* =========================
   INITIAL FOCUS
========================= */

messageInput.focus();
