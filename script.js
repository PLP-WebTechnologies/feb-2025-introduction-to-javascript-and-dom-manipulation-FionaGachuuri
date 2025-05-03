// DOM Elements
const issueForm = document.getElementById('issue-form');
const issueTitle = document.getElementById('issue-title');
const issueLocation = document.getElementById('issue-location');
const issueType = document.getElementById('issue-type');
const issueDescription = document.getElementById('issue-description');
const issuesContainer = document.getElementById('issues-container');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');
const statusMessage = document.getElementById('status-message');

// Variables
let issues = JSON.parse(localStorage.getItem('environmentalIssues')) || [];
const statusMessages = [
    "Report environmental issues in your community",
    "Together we can make a difference",
    "Help protect our environment",
    "Every report matters in environmental conservation"
];
let currentMessageIndex = 0;

// Initialize the app
function init() {
    renderIssues();
    startStatusRotation();
    
    // Check if dark mode was previously enabled
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Rotate status messages every 5 seconds
function startStatusRotation() {
    setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % statusMessages.length;
        // DOM Manipulation: Changing text content dynamically
        statusMessage.textContent = statusMessages[currentMessageIndex];
    }, 5000);
}

// Render all reported issues
function renderIssues() {
    if (issues.length === 0) {
        issuesContainer.innerHTML = '<p class="no-issues">No issues reported yet. Be the first to report!</p>';
        return;
    }
    
    issuesContainer.innerHTML = '';
    
    issues.forEach((issue, index) => {
        // DOM Manipulation: Adding elements
        const issueCard = document.createElement('div');
        issueCard.className = 'issue-card';
        
        issueCard.innerHTML = `
            <h3>${issue.title}</h3>
            <p class="location"><strong>Location:</strong> ${issue.location}</p>
            <p>${issue.description}</p>
            <span class="type">${issue.type}</span>
            <button class="delete-issue" data-index="${index}">Delete</button>
        `;
        
        issuesContainer.appendChild(issueCard);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-issue').forEach(button => {
        button.addEventListener('click', deleteIssue);
    });
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Create new issue object
    const newIssue = {
        title: issueTitle.value,
        location: issueLocation.value,
        type: issueType.value,
        description: issueDescription.value,
        date: new Date().toLocaleString()
    };
    
    // Add to issues array
    issues.unshift(newIssue);
    
    // Save to localStorage
    localStorage.setItem('environmentalIssues', JSON.stringify(issues));
    
    // Clear form
    issueForm.reset();
    
    // Show confirmation message
    showConfirmation();
    
    // Re-render issues list
    renderIssues();
}

// Show confirmation message after submission
function showConfirmation() {
    const oldStatus = statusMessage.textContent;
    
    // DOM Manipulation: Modifying CSS styles
    statusMessage.style.color = '#4caf50';
    statusMessage.style.fontWeight = 'bold';
    statusMessage.textContent = "Thank you! Your report has been submitted.";
    
    // Reset after 3 seconds
    setTimeout(() => {
        statusMessage.style.color = '';
        statusMessage.style.fontWeight = '';
        statusMessage.textContent = oldStatus;
    }, 3000);
}

// Delete an issue
function deleteIssue(e) {
    const index = parseInt(e.target.getAttribute('data-index'));
    
    // DOM Manipulation: Removing elements
    const issueCard = e.target.parentElement;
    issueCard.style.backgroundColor = '#ffcdd2';
    issueCard.style.opacity = '0.7';
    
    setTimeout(() => {
        // Remove from array
        issues.splice(index, 1);
        
        // Save to localStorage
        localStorage.setItem('environmentalIssues', JSON.stringify(issues));
        
        // Re-render issues list
        renderIssues();
    }, 300);
}

// Clear form fields
function clearForm() {
    issueForm.reset();
    
    // DOM Manipulation: Changing styles
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        group.style.backgroundColor = '#fffde7';
        
        setTimeout(() => {
            group.style.backgroundColor = '';
        }, 300);
    });
}

// Toggle dark/light mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Event Listeners
issueForm.addEventListener('submit', handleFormSubmit);
clearBtn.addEventListener('click', clearForm);
themeToggle.addEventListener('click', toggleTheme);

// Initialize the app
document.addEventListener('DOMContentLoaded', init);