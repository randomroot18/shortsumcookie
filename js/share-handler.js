// share-handler.js

document.addEventListener("DOMContentLoaded", () => {
    // Check if the browser supports the Web Share Target API
    if (!window.location.search) return;
  
    // Parse the incoming URL parameters
    const params = new URLSearchParams(window.location.search);
  
    const title = params.get("title");
    const text = params.get("text");
    const url = params.get("url");
  
    // Validate the incoming data
    if (!url) {
      console.error("No URL was shared");
      return;
    }
  
    // Log or handle the shared data (e.g., display on the frontend or send to backend)
    console.log("Shared Title:", title);
    console.log("Shared Text:", text);
    console.log("Shared URL:", url);
  
    // Optionally send the shared data to your backend API
    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        title: title || "",
        text: text || "",
        url: url
      })
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to send shared data to the server");
          return;
        }
        return response.text();
      })
      .then((data) => {
        console.log("Server response:", data);
  
        // Redirect or show confirmation to the user
        document.body.innerHTML = `<h1>Submission successful!</h1>`;
      })
      .catch((error) => console.error("Error sending shared data:", error));
  });
  