// Improved Link function with error handling
function Link(pageURL) {
    if (!pageURL) {
        console.error("No URL provided to Link function");
        return;
    }
    
    try {
        window.location.href = pageURL;
    } catch (error) {
        console.error("Error navigating to:", pageURL, error);
    }
}

// Add event listener for when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any necessary functionality here
    console.log("Page fully loaded");
});