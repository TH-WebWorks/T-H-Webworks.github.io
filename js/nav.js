function toggleMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
    }
}

// Close menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#myLinks a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById("myLinks").style.display = "none";
        });
    });
}); 