// DOM elements
const avatar = document.getElementById("avatar");
const displayName = document.getElementById("displayName");
const tagline = document.getElementById("tagline");
const customStatus = document.getElementById("customStatus");
const bio = document.getElementById("bio");
const memberSince = document.getElementById("memberSince");
const linksContainer = document.getElementById("links");
const messageBtn = document.getElementById("messageBtn");
const menuBtn = document.getElementById("menuBtn");
const vibeLink = document.getElementById("vibeLink");
const tabs = document.querySelectorAll(".tab");
const tabContent = document.getElementById("tabContent");
const bannerGif = document.getElementById("bannerGif"); // New: banner element

// PROFILE DATA
const profile = {
  discordProfile: "https://discord.com/users/672737796699455492",
  name: "EinzzCookie",
  tagline: "einzzcookie · he/him 🇩🇪",
  avatar: "https://cdn.discordapp.com/avatars/672737796699455492/f8c826ce7535e796a5c5906375d6dc69.webp?size=256",
  banner: "https://media1.tenor.com/m/hpUREXpe6CYAAAAd/eyes-irises.gif",
  status: "I have entered heaven on earth",
  bio: "Every man has two lives – the second one starts when he finds out he has just one",
  vibe: "https://open.spotify.com/playlist/3O5t7YGOa036mDxVlJCbg1",
  memberSince: "January 31, 2020",  // Translated to English
  links: [
    { name:"GitHub",url:"https://github.com/TheEinzzCookie" },
    { name:"Spotify",url:"https://open.spotify.com/user/31gegnthboi67natez5okwj3n2li" },
    { name:"TikTok",url:"https://www.tiktok.com/@theeinzzcookie" }
  ],
  activity: [
    { title:"Ultraviolence", subtitle:"Lana Del Ray · Spotify" },
    { title:"Prison Life", subtitle:"Police · Roblox" },
    { title:"Minecraft", subtitle:"Diamonds · Minecraft" }
  ],
  projects:["Rust Malware","Robux Autostealer","Blocky Person"],
  servers:["Germany","WWW"]
};

// INITIAL RENDER
bannerGif.src = profile.banner; // Set GIF source
avatar.src = profile.avatar;
displayName.textContent = profileSettings.nameFormat(profile.name);
tagline.textContent = profileSettings.taglineFormat(profile.tagline);
customStatus.textContent = profile.status;
bio.textContent = profile.bio;
memberSince.textContent = profile.memberSince;

// Error handling for GIF
bannerGif.onerror = function() {
  console.error("Failed to load banner GIF");
  // Fallback to gradient background
  document.querySelector('.banner').style.background = 'linear-gradient(135deg, #5865F2, #43B581)';
  bannerGif.style.display = 'none';
};

profile.links.forEach(l=>{
  const a=document.createElement("a"); a.textContent=l.name; a.href=l.url; a.target="_blank"; linksContainer.appendChild(a);
});
vibeLink.href=profile.vibe; vibeLink.target="_blank";

// BUTTONS
messageBtn.onclick=()=>window.open(profile.discordProfile,"_blank");
menuBtn.onclick=()=>alert("Cookie");

// AVATAR HOVER
avatar.addEventListener("mouseenter",()=>{ 
  avatar.style.transform=`scale(${profileSettings.avatarEffect.scale})`; 
  if (profileSettings.avatarEffect.ring.enabled) {
    avatar.style.boxShadow=`0 0 0 ${profileSettings.avatarEffect.ring.thickness}px ${profileSettings.avatarEffect.ring.color}, 0 0 0 ${profileSettings.avatarEffect.shadowSize} ${profileSettings.avatarEffect.shadowColor}`;
  } else {
    avatar.style.boxShadow=`0 0 0 ${profileSettings.avatarEffect.shadowSize} ${profileSettings.avatarEffect.shadowColor}`;
  }
});

avatar.addEventListener("mouseleave",()=>{ 
  avatar.style.transform=""; 
  if (profileSettings.avatarEffect.ring.enabled) {
    avatar.style.boxShadow=`0 0 0 ${profileSettings.avatarEffect.ring.thickness}px ${profileSettings.avatarEffect.ring.color}`;
  } else {
    avatar.style.boxShadow="";
  }
});

// STATUS PULSE
const statusEl = document.querySelector(".status");
if(profileSettings.statusEffect.pulse){ 
  statusEl.style.animation=`pulse ${profileSettings.statusEffect.pulseSpeed}s infinite, gentlePulse 2s infinite ease-in-out`; 
  statusEl.style.background=profileSettings.statusEffect.pulseColor; 
}

// AVATAR ORB
function applyAvatarOrb(){
  if(!profileSettings.avatarEffect.orb.enabled) return;
  const wrap=document.querySelector(".avatar-wrap");
  
  // Remove existing orb if any
  const existingOrb = wrap.querySelector(".avatar-orb");
  if (existingOrb) existingOrb.remove();
  
  const orbDiv=document.createElement("div");
  orbDiv.classList.add("avatar-orb");
  orbDiv.style.background=profileSettings.avatarEffect.orb.color;
  orbDiv.style.width=profileSettings.avatarEffect.orb.size+"px";
  orbDiv.style.height=profileSettings.avatarEffect.orb.size+"px";
  orbDiv.style.animation=`rotateOrb ${360/profileSettings.avatarEffect.orb.rotation}s linear infinite`;
  wrap.appendChild(orbDiv);
}

// AVATAR RING (always visible, not just on hover)
function applyAvatarRing(){
  if(!profileSettings.avatarEffect.ring.enabled) return;
  
  const wrap = document.querySelector(".avatar-wrap");
  
  // Remove existing ring if any
  const existingRing = wrap.querySelector(".avatar-ring");
  if (existingRing) existingRing.remove();
  
  // Create the ring element
  const ringDiv = document.createElement("div");
  ringDiv.classList.add("avatar-ring");
  ringDiv.style.width = (120 + profileSettings.avatarEffect.ring.thickness * 2) + "px";
  ringDiv.style.height = (120 + profileSettings.avatarEffect.ring.thickness * 2) + "px";
  ringDiv.style.border = `${profileSettings.avatarEffect.ring.thickness}px solid ${profileSettings.avatarEffect.ring.color}`;
  
  wrap.appendChild(ringDiv);
  
  // Also apply to avatar element for hover effects
  avatar.style.boxShadow = `0 0 0 ${profileSettings.avatarEffect.ring.thickness}px ${profileSettings.avatarEffect.ring.color}`;
}

applyAvatarOrb();
applyAvatarRing();

// CARDS HOVER
function attachCardHover(){ 
  document.querySelectorAll(".card").forEach(c=>{ 
    c.addEventListener("mouseenter",()=>{ 
      c.style.boxShadow=profileSettings.cardEffect.glow?`0 0 20px ${profileSettings.theme.accent}`:profileSettings.cardEffect.hoverShadow; 
    }); 
    c.addEventListener("mouseleave",()=>{ 
      c.style.boxShadow=profileSettings.cardEffect.hoverShadow; 
    }); 
  }); 
}

// TAB SYSTEM
function renderTab(tab){ 
  tabContent.innerHTML=""; 
  let data; 
  if(tab==="activity") data=profile.activity; 
  if(tab==="projects") data=profile.projects.map(f=>({title:f})); 
  if(tab==="servers") data=profile.servers.map(s=>({title:s})); 
  if(!data)return; 
  data.forEach(i=>{ 
    const div=document.createElement("div"); 
    div.className="card"; 
    div.innerHTML=`<strong>${i.title}</strong>${i.subtitle?`<br><span>${i.subtitle}</span>`:""}`; 
    tabContent.appendChild(div); 
  }); 
  attachCardHover(); 
}

tabs.forEach(tab=>tab.addEventListener("click",()=>{ 
  tabs.forEach(t=>t.classList.remove("active")); 
  tab.classList.add("active"); 
  renderTab(tab.dataset.tab); 
}));

renderTab("activity");