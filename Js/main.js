/*============================================================
   Mahmoud Nagah Portfolio - Main JS
   Senior Backend Engineer Portfolio
   ============================================================*/

(function () {
    'use strict';

    /* --------------------------------------------------------
     * 1. MOBILE NAVBAR TOGGLE
     * -------------------------------------------------------- */
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function () {
            const icon = menuIcon.querySelector('i');
            const isActive = navbar.classList.toggle('active');
            menuIcon.setAttribute('aria-expanded', isActive);
            if (icon) {
                icon.classList.toggle('fa-bars', !isActive);
                icon.classList.toggle('fa-xmark', isActive);
            }
        });
    }

    // Close mobile nav when clicking a nav link (mobile)
    document.querySelectorAll('.navbar a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.setAttribute('aria-expanded', 'false');
                const icon = menuIcon.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    });

    /* --------------------------------------------------------
     * 2. SCROLL: STICKY HEADER + ACTIVE NAV LINK
     * -------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('header nav a[href^="#"]');
    const header = document.querySelector('header');

    function onScroll() {
        const scrollY = window.pageYOffset;

        // Sticky header
        if (header) {
            header.classList.toggle('sticky', scrollY > 100);
        }

        // Active nav link
        sections.forEach(function (current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 180;
            const sectionId = current.getAttribute('id');

            const link = document.querySelector(
                'header nav a[href="#' + sectionId + '"]'
            );

            if (!link) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navAnchors.forEach(function (a) { a.classList.remove('active'); });
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* --------------------------------------------------------
     * 3. SCROLL REVEAL ANIMATIONS (subtle)
     * -------------------------------------------------------- */
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '40px',
            duration: 900,
            delay: 80,
            easing: 'cubic-bezier(.2,.6,.3,1)',
            reset: false,
            mobile: true
        });

        sr.reveal('.hero-eyebrow, .heading, .home-content h1', { origin: 'top' });
        sr.reveal('.home-content, .hero-headline, .hero-description, .hero-buttons', { origin: 'bottom', interval: 80 });
        sr.reveal('.home-img, .about-img', { origin: 'left' });
        sr.reveal('.about-content, .focus-card, .skills-card, .project-card, .timeline-item', {
            origin: 'bottom',
            interval: 90
        });
    }

    /* --------------------------------------------------------
     * 4. PROJECT DETAIL MODAL
     * -------------------------------------------------------- */

    // Data for all project details (accurate per spec)
    const PROJECT_DETAILS = {
        laam: {
            title: 'Laam — School Management SaaS',
            role: 'Senior Backend Engineer',
            overview:
                'Production school-management SaaS platform supporting multiple dashboards and mobile applications.',
            applications: [
                'Administrative Mobile App',
                'Parent Mobile App',
                'Teacher Dashboard',
                'Administrative Dashboard',
                'School Management Dashboard'
            ],
            stack: [
                'Laravel 10', 'PHP', 'MySQL', 'JWT', 'Spatie Permission',
                'PHPUnit', 'Pest', 'Laravel Queues', 'Laravel Excel'
            ],
            focus: [
                'REST APIs',
                'Authentication & Authorization',
                'JWT',
                'API Security',
                'Database Optimization',
                'Production Bug Fixing',
                'Legacy Refactoring',
                'Automated Testing',
                'Background Jobs',
                'Data Import'
            ],
            responsibilities: [
                'Built and maintained REST APIs for multiple consumers.',
                'Owned backend for Administrative + Parent mobile apps and Teacher Dashboard.',
                'Implemented auth and authorization workflows using JWT + Spatie Permission.',
                'Improved API security and input validation.',
                'Investigated and resolved production incidents.',
                'Optimized database queries and backend operations.',
                'Refactored legacy code and reduced technical debt.',
                'Built background processing with Laravel Queues.',
                'Implemented data imports using Laravel Excel.',
                'Added and maintained automated tests with PHPUnit & Pest.',
                'Collaborated with frontend, mobile, QA and business teams.'
            ]
        },
        filmsa: {
            title: 'FilmSA',
            role: 'Software Engineer',
            overview:
                'Saudi entertainment and content-sector platform for industry professionals.',
            highlights: [
                'Primary CMS contributor — 60%+ of CMS implementation.',
                'Recommended and used Filament for CRUD-oriented CMS functionality.',
                'Contributed to the main dashboard.',
                'Worked with Laravel, Service Pattern and authentication.'
            ],
            stack: ['PHP', 'Laravel', 'Filament', 'MySQL', 'Service Pattern'],
            focus: [
                'CMS Architecture',
                'Filament Admin',
                'Dashboard Development',
                'Authentication',
                'Service Pattern'
            ],
            responsibilities: [
                'Led CMS feature implementation — majority of CMS code.',
                'Architected Filament-based admin and CRUD screens.',
                'Built dashboard features and reporting.',
                'Implemented secure authentication flows.',
                'Applied Service Pattern for business logic boundaries.'
            ]
        },
        etolv: {
            title: 'ETOLV — Tourism ERP',
            role: 'Backend Developer',
            overview:
                'Production tourism ERP serving 100+ departments and 5,000+ end users.',
            highlights: [
                'Laravel/Lumen backend.',
                'Neo4j graph database with Cypher queries.',
                'Service Layer architecture.',
                'Roles & Permissions system.',
                'Massar Hajj module built from scratch.',
                'Hajj trip booking workflow implementation.',
                'Hajj and Umrah company balance tracking.'
            ],
            stack: ['PHP', 'Laravel/Lumen', 'Neo4j', 'Cypher', 'Service Layer', 'Roles & Permissions'],
            focus: [
                'Service Layer Architecture',
                'Graph Data Modeling',
                'Cypher Query Writing',
                'RBAC Implementation',
                'Booking Workflows',
                'Financial Tracking'
            ],
            responsibilities: [
                'Maintained and enhanced a live enterprise-level production ERP.',
                'Designed and implemented Massar Hajj module end to end.',
                'Modeled complex relationships in Neo4j and wrote Cypher queries.',
                'Built and extended roles and permissions across departments.',
                'Implemented Hajj booking workflows with validations.',
                'Tracked Hajj/Umrah balances for operating companies.',
                'Investigated and resolved live production incidents.',
                'Optimized queries and workflows for 5,000+ end users.'
            ]
        },
        daem: {
            title: 'DAEM — Saudi Stock-Market Platform',
            role: 'Backend Development',
            overview:
                'Saudi stock-market platform integrating market data from multiple sources.',
            highlights: [
                'Laravel backend development.',
                'Python/Flask scraping services.',
                'Saudi stock-market data integration.',
                'yfinance integration.',
                'PostgreSQL data modeling.',
                'Financial data processing.'
            ],
            stack: ['Laravel', 'PHP', 'Python', 'Flask', 'PostgreSQL', 'yfinance'],
            focus: [
                'Backend APIs',
                'Market Data Integration',
                'Scraping Pipelines',
                'Financial Data Processing',
                'PostgreSQL Modeling'
            ],
            responsibilities: [
                'Developed Laravel backend for stock-market platform.',
                'Built Python/Flask services to scrape market data.',
                'Integrated yfinance for reliable market data feeds.',
                'Designed PostgreSQL schemas for financial data.',
                'Implemented data processing and normalization pipelines.'
            ]
        },
        clavis: {
            title: 'ClAVIS BS — CRM Solutions',
            role: 'PHP Developer / Laravel Intern',
            overview:
                'CRM customization and development for social and sports club management.',
            highlights: [
                'PHP/Laravel development.',
                'Vtiger CRM customization.',
                'CRM workflows for a large social/sports club.',
                'WordPress work where required.'
            ],
            stack: ['PHP', 'Laravel', 'Vtiger CRM', 'WordPress'],
            focus: [
                'CRM Customization',
                'Workflow Automation',
                'PHP/Laravel Basics',
                'CRM Integration'
            ],
            responsibilities: [
                'Customized Vtiger CRM for a large social/sports club customer.',
                'Developed Laravel modules and custom backend features.',
                'Configured CRM workflows and data structures.',
                'Handled WordPress tasks when required on adjacent projects.',
                'Progressed from Laravel Intern to PHP Developer within 3 months.'
            ]
        }
    };

    // Render helper — build modal body
    function renderProjectBody(key) {
        const p = PROJECT_DETAILS[key];
        if (!p) return '<p>Project details unavailable.</p>';

        let html = '';
        html += '<h2 id="modal-title" class="modal-h2">' + p.title + '</h2>';
        html += '<p class="modal-role">Role: ' + p.role + '</p>';

        html += '<h3 class="modal-h3">Overview</h3>';
        html += '<p class="modal-p">' + p.overview + '</p>';

        if (p.applications) {
            html += '<h3 class="modal-h3">Applications Supported</h3>';
            html += '<ul class="modal-ul">';
            p.applications.forEach(function (a) {
                html += '<li>' + a + '</li>';
            });
            html += '</ul>';
        }

        if (p.highlights) {
            html += '<h3 class="modal-h3">Highlights</h3>';
            html += '<ul class="modal-ul">';
            p.highlights.forEach(function (h) {
                html += '<li>' + h + '</li>';
            });
            html += '</ul>';
        }

        html += '<h3 class="modal-h3">Responsibilities</h3>';
        html += '<ul class="modal-ul">';
        p.responsibilities.forEach(function (r) {
            html += '<li>' + r + '</li>';
        });
        html += '</ul>';

        html += '<h3 class="modal-h3">Technical Stack</h3>';
        html += '<div class="modal-badges">';
        p.stack.forEach(function (s) {
            html += '<span class="tech-badge tech-badge-core">' + s + '</span>';
        });
        html += '</div>';

        html += '<h3 class="modal-h3">Architecture / Engineering Areas</h3>';
        html += '<div class="modal-badges">';
        p.focus.forEach(function (f) {
            html += '<span class="tech-badge">' + f + '</span>';
        });
        html += '</div>';

        return html;
    }

    // Modal DOM refs
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close');
    let lastFocusedBeforeModal = null;

    function openModal(key, triggerEl) {
        lastFocusedBeforeModal = triggerEl || document.activeElement;
        if (modalBody) modalBody.innerHTML = renderProjectBody(key);
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        if (triggerEl) triggerEl.setAttribute('aria-expanded', 'true');
        // Focus first focusable in modal
        setTimeout(function () {
            if (modalCloseBtn) modalCloseBtn.focus();
        }, 20);
    }

    function closeModal(triggerEl) {
        modal.hidden = true;
        modalBody.innerHTML = '';
        document.body.style.overflow = '';
        if (triggerEl) triggerEl.setAttribute('aria-expanded', 'false');
        if (lastFocusedBeforeModal) {
            try { lastFocusedBeforeModal.focus(); } catch (e) { /* ignore */ }
        }
    }

    // Bind project detail buttons
    document.querySelectorAll('.project-detail-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const key = btn.getAttribute('data-project');
            openModal(key, btn);
        });
    });

    // Close button
    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener('click', function () {
            const trigger = document.querySelector('.project-detail-btn[aria-expanded="true"]');
            closeModal(trigger);
        });
    }

    // Click on backdrop closes modal
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                const trigger = document.querySelector('.project-detail-btn[aria-expanded="true"]');
                closeModal(trigger);
            }
        });
    }

    // ESC key closes modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.hidden) {
            const trigger = document.querySelector('.project-detail-btn[aria-expanded="true"]');
            closeModal(trigger);
        }
    });

    /* --------------------------------------------------------
     * 5. SMOOTH ANCHOR SCROLL (native fallback if CSS off)
     * -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                // Let CSS smooth-scroll work natively, but ensure focus for a11y
                setTimeout(function () {
                    try { target.focus({ preventScroll: true }); } catch (err) { /* ignore */ }
                }, 500);
            }
        });
    });

    /* --------------------------------------------------------
     * 6. REDUCED MOTION: disable ScrollReveal if user prefers
     * -------------------------------------------------------- */
    try {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches && typeof ScrollReveal !== 'undefined') {
            ScrollReveal().destroy();
        }
    } catch (_) { /* ignore */ }

})();