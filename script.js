document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // --- Dynamic Color Hover for Projects ---
    const projects = document.querySelectorAll('.project-row');
    
    projects.forEach(project => {
        const color = project.getAttribute('data-color');
        
        project.addEventListener('mouseenter', () => {
            // Cursor expands
            cursor.classList.add('hovered');
            
            // Apply inline color styles dynamically
            project.style.borderColor = color;
            project.querySelector('h2').style.color = color;
            
            // Move the background blob slightly to track focus?
            // Optional advanced feel, but keeping it simple for stability.
        });

        project.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            
            // Reset styles
            project.style.borderColor = 'rgba(255,255,255,0.1)';
            project.querySelector('h2').style.color = 'white';
        });

        // Image Follow Mouse inside the row
        project.addEventListener('mousemove', (e) => {
            const img = project.querySelector('.hover-reveal-img');
            // Calculate position relative to the project row
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            
            // We want the image to center on the mouse X, but stay fixed vert centered
            // Just adjusting rotation based on mouse X speed could be cool too
            // For now, let's just make it follow horizontally slightly
            const moveX = (x - rect.width/2) * 0.2; // subtle parallax
            img.style.transform = `translate(calc(-50% + ${moveX}px), -50%) rotate(0deg)`;
        });
    });

    // --- Nav Hover ---
    const links = document.querySelectorAll('a, .nav-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
});
// --- Stats Counter Animation ---
    const statsSection = document.querySelector('.stats-list');
    const stats = document.querySelectorAll('.stats-list span');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                // Simple animation for the "100%" and "0.1s"
                stats[2].innerText = "0%";
                let count = 0;
                let timer = setInterval(() => {
                    count++;
                    stats[2].innerText = count + "%";
                    if(count === 100) clearInterval(timer);
                }, 10);
                hasAnimated = true;
            }
        });
    });

    if(statsSection) statsObserver.observe(statsSection);
    function sendToWhatsApp() {
    const phoneNumber = "213541210706"; // Your WhatsApp number
    const message = document.getElementById('wa-message').value;
    
    if (message.trim() === "") {
        alert("Please type a message before sending!");
        return;
    }

    // Encodes the message for a URL
    const encodedMessage = encodeURIComponent(message);
    
    // Opens WhatsApp in a new tab
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}