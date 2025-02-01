const projects = [
    {
        title: "T7 Mods",
        description: "A Docutmentation webite for Call of Duty: Black Ops 3 modding.",
        image: "assets/portfolio/t7mods.jpg",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://t7mods.com"
    },
    {
        title: "Hardwood Hero",
        description: "A clean and functional website for a local hardwood flooring company.",
        image: "assets/portfolio/hardwoodhero.jpg",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://hardwoodherodsm.com"
    },
    {
        title: "EXAMPLE SITE",
        description: "EXAMPLE DESCRIPTION.",
        image: "assets/portfolio/hardwoodhero.jpg",
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://hardwoodherodsm.com"
    }
];

function createProjectCard(project) {
    return `
        <article class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-details">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-button">
                    View Project <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    projectGrid.innerHTML = projects.map(createProjectCard).join('');
}); 