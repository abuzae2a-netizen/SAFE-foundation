// ============================================================
// MODAL CONTROLS
// ============================================================
function openModal(id) {
    document.getElementById(id).classList.add('open');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('open');
    }
}

// ============================================================
// MOBILE HAMBURGER MENU
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }

    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav) mainNav.classList.remove('open');
        });
    });
});

// ============================================================
// LOCKED CONTENT NAVIGATION
// ============================================================
function navigateToLockedSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!donationMade) {
        const lockContent = section.querySelector('.locked-content');
        if (lockContent) {
            lockContent.style.borderColor = '#cc7a00';
            lockContent.style.borderWidth = '3px';
            setTimeout(() => {
                lockContent.style.borderColor = '#d1d5db';
                lockContent.style.borderWidth = '2px';
            }, 2000);
        }
    }
}

// ============================================================
// DONATION & UNLOCK SYSTEM
// ============================================================
let donationMade = false;

function simulateDonation() {
    donationMade = true;
    closeModal('donateModal');

    document.querySelectorAll('.locked-content').forEach(el => {
        el.style.display = 'none';
    });

    const sections = ['manifesto', 'parenting', 'marriage', 'documents'];
    sections.forEach(id => {
        const contentDiv = document.getElementById(id + 'Content');
        if (contentDiv) {
            contentDiv.innerHTML = getFullContent(id + 'Content');
        }
        const badge = document.getElementById(id + 'Badge');
        if (badge) {
            badge.style.display = 'inline-block';
        }
        const section = document.getElementById(id);
        if (section) {
            section.style.display = 'block';
        }
    });

    alert('Thank you for your donation! All content is now unlocked.');
}

// ============================================================
// CONTENT GENERATOR
// ============================================================
function getFullContent(contentId) {
    if (contentId === 'manifestoContent') {
        return `
            <div class="doc-preview">
                <div class="doc-header">
                    <h2>SAFE COUNCIL MANIFESTO</h2>
                    <p class="motto">"A Safe Community is a Safe Nation"</p>
                </div>
                <div class="section">
                    <h3>PREAMBLE</h3>
                    <p>We, the undersigned delegates representing political parties, tertiary institutions, the formal economy, the informal sector, and civil society, do hereby establish the Sustainable Approach for Equity Council (SAFE Council).</p>
                </div>
                <div class="section">
                    <h3>MISSION STATEMENT</h3>
                    <p>To promote transparency, accountability, and good governance by mobilising a diverse, independent coalition of delegates.</p>
                </div>
                <div class="section">
                    <h3>CORE PRINCIPLES</h3>
                    <ol style="margin-left:20px;">
                        <li>Non-Partisanship</li>
                        <li>Independence</li>
                        <li>Evidence-Based Action</li>
                        <li>Inclusivity</li>
                        <li>Transparency</li>
                        <li>Constructive Engagement</li>
                    </ol>
                </div>
            </div>
        `;
    } else if (contentId === 'parentingContent') {
        return `
            <div class="doc-preview">
                <div class="doc-header">
                    <h2>SAFE FOUNDATION PARENTING CO-OP</h2>
                    <p class="motto">A Democratic Community Structure for Parents</p>
                </div>
                <div class="section">
                    <h3>CORE PRINCIPLE</h3>
                    <p><strong>One parent, one vote.</strong> Every parent has equal say in decisions affecting their children and community.</p>
                </div>
                <div class="section">
                    <h3>GOVERNANCE STRUCTURE</h3>
                    <ul style="margin-left:20px;">
                        <li>General Assembly of Parents</li>
                        <li>Executive Committee (5 members)</li>
                        <li>Women's Caucus</li>
                        <li>Community Watch Committee</li>
                        <li>Sanitation Committee</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (contentId === 'marriageContent') {
        return `
            <div class="doc-preview">
                <div class="doc-header">
                    <h2>SAFE FOUNDATION MARRIAGE COUNSELLING</h2>
                    <p class="motto">Strengthening Families, Building Safe Communities</p>
                </div>
                <div class="section">
                    <h3>PRE-MARITAL CURRICULUM (12 weeks)</h3>
                    <p>Week 1-12: Introduction, Communication, Conflict Resolution, Financial, Family Planning, In-Laws, Roles, Emotions, Intimacy, Crises, Parenting, Examination</p>
                </div>
                <div class="section">
                    <h3>POST-MARITAL CURRICULUM (12 weeks)</h3>
                    <p>Transition, Communication, In-Laws, Finance, Conflicts, Pregnancy, Work-Life, Safety, Intimacy, Family, Vision, Examination</p>
                </div>
            </div>
        `;
    } else if (contentId === 'documentsContent') {
        return `
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;">
                <div style="background:var(--white);padding:20px;border-radius:12px;box-shadow:var(--shadow);text-align:center;">
                    <i class="fas fa-file-pdf" style="font-size:2rem;color:var(--secondary);margin-bottom:10px;display:block;"></i>
                    <h4>Manifesto</h4>
                </div>
                <div style="background:var(--white);padding:20px;border-radius:12px;box-shadow:var(--shadow);text-align:center;">
                    <i class="fas fa-file-pdf" style="font-size:2rem;color:var(--secondary);margin-bottom:10px;display:block;"></i>
                    <h4>Parenting Guide</h4>
                </div>
                <div style="background:var(--white);padding:20px;border-radius:12px;box-shadow:var(--shadow);text-align:center;">
                    <i class="fas fa-file-pdf" style="font-size:2rem;color:var(--secondary);margin-bottom:10px;display:block;"></i>
                    <h4>Marriage Handbook</h4>
                </div>
                <div style="background:var(--white);padding:20px;border-radius:12px;box-shadow:var(--shadow);text-align:center;">
                    <i class="fas fa-file-pdf" style="font-size:2rem;color:var(--secondary);margin-bottom:10px;display:block;"></i>
                    <h4>Volunteer Manual</h4>
                </div>
            </div>
        `;
    }
    return '<p>Content loaded. Thank you for your support!</p>';
}

// ============================================================
// FORM SUBMISSION HANDLER
// ============================================================
function submitForm(e, type) {
    e.preventDefault();
    let responseDiv = document.getElementById(type + 'Response');
    if (responseDiv) {
        responseDiv.style.display = 'block';
        responseDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your application has been received. We will contact you within 48 hours.';
        e.target.reset();
        setTimeout(() => { 
            responseDiv.style.display = 'none'; 
        }, 8000);
    }
}

// ============================================================
// ESC KEY TO CLOSE MODAL
// ============================================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
    }
});