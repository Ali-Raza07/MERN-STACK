
const slides = [
  {
    tag:"MERN Stack",
    title:"E-Commerce\nPlatform",
    desc:"Full-stack shopping platform with real-time inventory, payment gateway, and admin dashboard.",
    cta:"View Project",
    img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    color:"#c8f55a"
},
  {
    tag:"AI Integration",
    title:"AI Analytics\nDashboard",
    desc:"Machine learning-powered business intelligence tool with live data visualization.",
    cta:"See Demo",
    img:"https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
    color:"#7c6ff7"
},
  {
    tag:"Mobile App",
    title:"Social\nConnect App",
    desc:"Cross-platform React Native app with real-time messaging, stories, and media sharing.",
    cta:"Learn More",
    img:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    color:"#ff6b35"
},
  {
    tag:"SaaS Product",
    title:"Project\nManagement Tool",desc:"Kanban-based team collaboration platform with real-time updates via WebSockets.",
    cta:"View Project",
    img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80",
    color:"#c8f55a"
},
  {
    tag:"Web Design",
    title:"Brand Identity\n& Web Presence",
    desc:"Complete brand identity system with responsive marketing website and CMS integration.",
    cta:"Explore",
    img:"https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=80",
    color:"#7c6ff7"
}
];

let teamMembers = [
  {
    name:"Ahmed Raza",
    role:"Developer",
    bio:"Full-stack MERN developer with 4 years building scalable web apps. Loves clean architecture.",
    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    linkedin:"#",
    github:"#"
},
  {
    name:"Sara Khan",
    role:"Designer",
    bio:"UI/UX designer crafting pixel-perfect interfaces. Figma expert with a passion for motion.",
    img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    linkedin:"#",
    github:"#"
},
  {
    name:"Ali Hassan",
    role:"Developer",
    bio:"Backend Node.js engineer focused on REST APIs, microservices, and database optimization.",
    img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    linkedin:"#",
    github:"#"
},
  {
    name:"Fatima Malik",
    role:"Manager",
    bio:"Product manager with agile methodologies and cross-functional team leadership.",
    img:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    linkedin:"#",
    github:"#"
},
  {
    name:"Bilal Akhtar",role:"DevOps",
    bio:"Cloud infrastructure engineer. AWS certified, Docker & Kubernetes expert, CI/CD pipeline builder.",
    img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    linkedin:"#",
    github:"#"
},
  {
    name:"Zainab Mir",
    role:"Designer",
    bio:"Brand designer and illustrator. Creates design systems that scale beautifully.",
    img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    linkedin:"#",
    github:"#"
}
];

let current = 0, autoTimer, DURATION = 4500;

function buildSlides() {
  document.getElementById('totalNum').textContent = String(slides.length).padStart(2,'0');
  document.getElementById('slidesWrap').innerHTML = slides.map((s,i) =>
    `<article class="slide" aria-label="${s.tag}">
      <div class="slide-bg" style="background-image:url('${s.img}')"></div>
      <div class="slide-overlay"></div>
      <div class="slide-content">
        <span class="slide-tag">${s.tag}</span>
        <h1 class="slide-title">${s.title.replace('\n','<br>')}</h1>
        <p class="slide-desc">${s.desc}</p>
        <div class="slide-actions">
          <button class="btn-primary" onclick="showToast('Opening: ${s.tag}')">${s.cta} →</button>
          <button class="btn-outline" onclick="showPage('about')">About Us</button>
        </div>
      </div>
    </article>`
  ).join('');
  document.getElementById('dots').innerHTML = slides.map((_,i) =>
    `<button class="dot${i===0?' active':''}" onclick="goTo(${i})" aria-label="Slide ${i+1}"></button>`
  ).join('');
}

function goTo(n) {
  current = ((n % slides.length) + slides.length) % slides.length;
  document.getElementById('slidesWrap').style.transform = `translateX(-${current*100}%)`;
  document.querySelectorAll('.dot').forEach((d,i) => d.classList.toggle('active', i===current));
  document.getElementById('currNum').textContent = String(current+1).padStart(2,'0');
  resetProgress();
}
function nextSlide() { goTo(current+1); }
function prevSlide() { goTo(current-1); }

function resetProgress() {
  clearTimeout(autoTimer);
  const bar = document.getElementById('progressBar');
  bar.style.transition = 'none'; bar.style.width = '0%';
  setTimeout(() => {
    bar.style.transition = `width ${DURATION}ms linear`;
    bar.style.width = '100%';
  }, 30);
  autoTimer = setTimeout(nextSlide, DURATION);
}

let activeFilter = 'All';

function renderTeam(members) {
  document.getElementById('teamGrid').innerHTML = members.length
    ? members.map((m,i) =>
        `<div class="team-card animate-in" style="transition-delay:${i*60}ms">
          <div class="team-card-img" style="background-image:url('${m.img}');width:100%;aspect-ratio:3/3.5;background-size:cover;background-position:top"></div>
          <div class="team-card-overlay">
            <a href="${m.linkedin||'#'}" class="social-btn" target="_blank">in</a>
            <a href="${m.github||'#'}" class="social-btn" target="_blank">GH</a>
          </div>
          <div class="team-card-body">
            <div class="team-name">${m.name}</div>
            <div class="team-role">${m.role}</div>
            <p class="team-bio">${m.bio}</p>
          </div>
        </div>`
      ).join('')
    : '<p style="color:var(--muted);grid-column:1/-1;padding:40px 0">No team members found.</p>';
  observeAnimate();
}

function filterTeam() {
  const q = document.getElementById('teamSearch').value.toLowerCase();
  renderTeam(teamMembers.filter(m => {
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q);
    const matchF = activeFilter === 'All' || m.role === activeFilter;
    return matchQ && matchF;
  }));
}

function renderAdmin() {
  document.getElementById('adminTableBody').innerHTML = teamMembers.map((m,i) =>
    `<tr>
      <td>
        <div class="admin-member-cell">
          <div class="admin-avatar" style="background-image:url('${m.img}');background-size:cover;background-position:top;border-radius:50%;width:36px;height:36px;flex-shrink:0"></div>
          <span>${m.name}</span>
        </div>
      </td>
      <td><span style="color:var(--accent);font-size:12px;font-weight:600">${m.role}</span></td>
      <td style="color:var(--muted);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.bio}</td>
      <td>
        <a href="${m.linkedin||'#'}" style="color:var(--accent3);font-size:12px;text-decoration:none" target="_blank">LI</a>
        &nbsp;
        <a href="${m.github||'#'}" style="color:var(--muted2);font-size:12px;text-decoration:none" target="_blank">GH</a>
      </td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="action-btn edit-btn" onclick="editMember(${i})">Edit</button>
          <button class="action-btn delete-btn" onclick="deleteMember(${i})">Delete</button>
        </div>
      </td>
    </tr>`
  ).join('');
}

function handleImageUpload(file) {
  if (!file) return;
  if (file.size > 5*1024*1024) { showToast('Image too large! Max 5MB'); return; }
  const preview = document.getElementById('imgPreview');
  preview.innerHTML = '<div class="upload-spinner"></div><span style="font-size:12px;color:var(--muted);margin-top:8px">Loading...</span>';
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById('f-img').value = dataUrl;
    preview.className = 'img-upload-preview has-img';
    preview.innerHTML = `<img src="${dataUrl}" alt="Preview"><div class="img-change-overlay"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Change Image</div>`;
  };
  reader.readAsDataURL(file);
}

function resetImgPreview(existingUrl) {
  document.getElementById('f-img-file').value = '';
  const preview = document.getElementById('imgPreview');
  if (existingUrl) {
    document.getElementById('f-img').value = existingUrl;
    preview.className = 'img-upload-preview has-img';
    preview.innerHTML = `<img src="${existingUrl}" alt="Preview"><div class="img-change-overlay"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Change Image</div>`;
  } else {
    document.getElementById('f-img').value = '';
    preview.className = 'img-upload-preview';
    preview.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><span>Click to upload image</span><span style="font-size:11px;color:var(--muted);margin-top:2px">JPG, PNG, WEBP — max 5MB</span>`;
  }
}


function openModal(idx) {
  idx = (idx === undefined) ? -1 : idx;
document.getElementById('editIndex').value = idx;
document.getElementById('modalTitle').textContent = idx >= 0 ? 'Edit Member' : 'Add Team Member';
  if (idx >= 0) {
    const m = teamMembers[idx];
    document.getElementById('f-name').value = m.name;
    document.getElementById('f-role').value = m.role;
    document.getElementById('f-bio').value = m.bio;
    document.getElementById('f-linkedin').value = m.linkedin || '';
    document.getElementById('f-github').value = m.github || '';
    resetImgPreview(m.img);
  } else {
    ['f-name','f-bio','f-linkedin','f-github'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('f-role').value = '';
    resetImgPreview(null);
  }
  document.getElementById('memberModal').classList.add('open');
}

function closeModal() {
  document.getElementById('memberModal').classList.remove('open');
}

async function saveMember() {
  const name = document.getElementById('f-name').value.trim();
  const role = document.getElementById('f-role').value;
  if (!name || !role) { showToast('Name and role are required!'); return; }
  const imgVal = document.getElementById('f-img').value;
  const imgFile = document.getElementById('f-img-file').files[0] || null;
  const member = {
    name, role,
    img: imgVal || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
    bio: document.getElementById('f-bio').value || 'Team member at DevPortfolio.',
    linkedin: document.getElementById('f-linkedin').value || '#',
    github: document.getElementById('f-github').value || '#'
  };
  // Try backend API
  try {
    const fd = new FormData();
    Object.entries({name:member.name,role:member.role,bio:member.bio,linkedin:member.linkedin,github:member.github})
      .forEach(([k,v]) => fd.append(k,v));
    if (imgFile) fd.append('image', imgFile);
    const idx = +document.getElementById('editIndex').value;
    const url = idx >= 0 ? `http://localhost:5000/api/team/${teamMembers[idx]._id}` : 'http://localhost:5000/api/team';
    const res = await fetch(url, {method: idx>=0?'PUT':'POST', body: fd});
    if (res.ok) {
      const data = await res.json();
      if (data.data?.img) member.img = data.data.img;
      if (data.data?._id) member._id = data.data._id;
    }
  } catch(e) { /* backend offline */ }
  const idx = +document.getElementById('editIndex').value;
  if (idx >= 0) { teamMembers[idx] = member; showToast('Member updated ✓'); }
  else { teamMembers.push(member); showToast('Member added ✓'); }
  closeModal(); renderAdmin(); renderTeam(teamMembers);
}

function editMember(i) { openModal(i); }

function deleteMember(i) {
  if (confirm(`Remove ${teamMembers[i].name}?`)) {
    teamMembers.splice(i, 1);
    renderAdmin(); renderTeam(teamMembers);
    showToast('Member removed');
  }
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
  if (name === 'about') renderTeam(teamMembers);
  if (name === 'admin') renderAdmin();
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navMap = {home:'nav-home',about:'nav-about',admin:'nav-admin'};
  if (navMap[name]) document.getElementById(navMap[name]).classList.add('active');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function observeAnimate() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold: 0.1});
  document.querySelectorAll('.animate-in').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', function() {
  // Nav links
document.getElementById('logoLink').addEventListener('click', () => showPage('home'));
document.getElementById('nav-home').addEventListener('click', () => showPage('home'));
document.getElementById('nav-about').addEventListener('click', () => showPage('about'));
document.getElementById('nav-team').addEventListener('click', () => { showPage('about'); setTimeout(() => document.getElementById('team-section').scrollIntoView({behavior:'smooth'}), 100); });
document.getElementById('nav-admin').addEventListener('click', () => showPage('admin'));
document.getElementById('nav-hire').addEventListener('click', () => showToast('Contact form coming soon!'));

document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('mobileNav').classList.toggle('open'));
document.getElementById('mnav-home').addEventListener('click', () => { showPage('home'); document.getElementById('mobileNav').classList.remove('open'); });
document.getElementById('mnav-about').addEventListener('click', () => { showPage('about'); document.getElementById('mobileNav').classList.remove('open'); });
document.getElementById('mnav-admin').addEventListener('click', () => { showPage('admin'); document.getElementById('mobileNav').classList.remove('open'); });
document.getElementById('mnav-close').addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open'));

document.getElementById('btnPrev').addEventListener('click', prevSlide);
document.getElementById('btnNext').addEventListener('click', nextSlide);

document.getElementById('aboutAdminBtn').addEventListener('click', () => showPage('admin'));

document.getElementById('addMemberBtn').addEventListener('click', () => openModal());

document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
document.getElementById('modalCancelBtn').addEventListener('click', closeModal);
document.getElementById('modalSaveBtn').addEventListener('click', saveMember);
document.getElementById('memberModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

document.getElementById('imgUploadWrap').addEventListener('click', () => document.getElementById('f-img-file').click());
document.getElementById('f-img-file').addEventListener('change', function() { handleImageUpload(this.files[0]); });

document.getElementById('teamSearch').addEventListener('input', filterTeam);

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      activeFilter = this.dataset.role;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterTeam();
    });
  });

  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      if (this.dataset.filterAdmin) showToast('Filter: ' + this.dataset.filterAdmin);
    });
  });

    window.addEventListener('scroll', () => {
    document.getElementById('mainNav').style.padding = window.scrollY > 60 ? '14px 5%' : '20px 5%';
   });

   document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
   });
  
  buildSlides();
  goTo(0);
  observeAnimate();
});