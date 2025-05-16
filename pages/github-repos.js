// Fetch GitHub repositories and create tiles
async function fetchGitHubRepos(username) {
    try {
        // Fetch repositories from GitHub API
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter out archived repositories
        const nonArchivedRepos = repos.filter(repo => !repo.archived);
        // Create list of archived repos
        const archivedRepos = repos.filter(repos => repo.archived);
        
        return nonArchivedRepos, archivedRepos;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
}

// Create a tile/card element for a repository
function createRepoTile(repo) {
    // Create container div with card class
    const card = document.createElement('div');
    card.className = 'card';
    
    // Create image placeholder (GitHub icon as default)
    const img = document.createElement('img');
    img.src = '../images/github-mark.svg';
    img.width = 100;
    img.height = 100;
    img.alt = `${repo.name} repository`;
    
    // Create link to repository
    const link = document.createElement('a');
    link.href = repo.html_url;
    link.className = 'button';
    link.textContent = repo.name;
    link.target = '_blank'; // Open in new tab
    
    // Create description paragraph if available
    let description = document.createElement('p');
    if (repo.description) {
        description.textContent = repo.description;
    } else {
        description.textContent = "No description available";
        description.style.fontStyle = "italic";
        description.style.color = "#666";
    }
    
    // Add elements to card
    card.appendChild(img);
    card.appendChild(link);
    card.appendChild(description);
    
    return card;
}

// Main function to load repos and create tiles
async function loadGitHubRepoTiles(username, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }
    
    // Show loading message
    container.innerHTML = '<p>Loading repositories...</p>';
    
    // Fetch repositories
    const repos = await fetchGitHubRepos(username);
    
    if (repos.length === 0) {
        container.innerHTML = '<p>No repositories found or there was an error loading them.</p>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create a heading for the repositories section
    const heading = document.createElement('h2');
    heading.textContent = 'Active GitHub Repositories';
    container.appendChild(heading);
    
    // Create a container for the cards with similar styling to your homepage cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards';
    container.appendChild(cardsContainer);
    
    // Add each repository as a tile
    repos.forEach(repo => {
        const tile = createRepoTile(repo);
        cardsContainer.appendChild(tile);
    });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Replace 'bobbyreed' with your GitHub username if different
    loadGitHubRepoTiles('bobbyreed', 'github-repos-container');
    loadGitHubRepoTiles('bobbyreed', 'archived-repos-container');
});