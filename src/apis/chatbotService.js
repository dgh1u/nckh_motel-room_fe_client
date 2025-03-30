// src/services/chatService.js
export async function sendQuery(question) {
  try {
    const response = await fetch("http://localhost:3000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      console.error(
        "Chatbot API error:",
        response.status,
        await response.text()
      );
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending query:", error);
    throw error;
  }
}
