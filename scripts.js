// scripts.js — simple client-side blog storage and renderer (localStorage)

const STORAGE_KEY = 'blogi_posts';

const STATIC_POSTS = [
  {
    id: 'static-1',
    title: 'Esimerkkiartikkeli 1',
    author: 'Admin',
    date: '2025-10-24',
    excerpt: 'Lyhyt kuvaus ensimmäisestä esimerkkiartikkelista. Tämä on tiivis esittely.',
    url: 'posts/post1.html',
    static: true
  },
  {
    id: 'static-2',
    title: 'Esimerkkiartikkeli 2',
    author: 'Admin',
    date: '2025-10-23',
    excerpt: 'Toinen esimerkkikirjoitus — puhdas ja luettava asettelu.',
    url: 'posts/post2.html',
    static: true
  }
];

function getUserPosts(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }catch(e){
    console.error('Failed to parse posts from storage', e);
    return [];
  }
}

function saveUserPosts(posts){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Format a date (Date object or string) into Finnish dd/mm/YYYY
function formatDate(d){
  if(!d) return '';
  if(d instanceof Date){
    const day = String(d.getDate()).padStart(2,'0');
    const month = String(d.getMonth()+1).padStart(2,'0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const s = String(d).trim();
  // ISO YYYY-MM-DD
  if(/^\d{4}-\d{2}-\d{2}$/.test(s)){
    const [y,m,day] = s.split('-');
    return `${day}/${m}/${y}`;
  }
  // already dd/mm/YYYY
  if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)){
    return s;
  }
  // try Date parse
  const parsed = new Date(s);
  if(!isNaN(parsed)) return formatDate(parsed);
  return s;
}

function renderPosts(){
  const container = document.getElementById('posts');
  if(!container) return;

  // User posts (newest first)
  const userPosts = getUserPosts().slice().reverse();
  const posts = [...userPosts, ...STATIC_POSTS];

  container.innerHTML = '';

  if(posts.length === 0){
    container.innerHTML = '<p>Ei julkaisuja.</p>';
    return;
  }

  posts.forEach(p => {
    const article = document.createElement('article');
    article.className = 'post-card';

    const title = document.createElement('h2');
    const a = document.createElement('a');
    a.textContent = p.title;

    if(p.static){
      a.href = p.url;
    }else{
      a.href = `viewer.html?post=${encodeURIComponent(p.id)}`;
    }

    title.appendChild(a);
    article.appendChild(title);

  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = `${formatDate(p.date)} · Tekijä: ${p.author}`;
    article.appendChild(meta);

    const excerpt = document.createElement('p');
    excerpt.className = 'excerpt';
    excerpt.textContent = p.excerpt || '';
    article.appendChild(excerpt);

    const actions = document.createElement('p');
    const readMore = document.createElement('a');
    readMore.className = 'read-more';
    readMore.textContent = 'Lue lisää →';
    readMore.href = p.static ? p.url : `viewer.html?post=${encodeURIComponent(p.id)}`;
    actions.appendChild(readMore);

    if(!p.static){
      const tag = document.createElement('span');
      tag.className = 'tag-user';
      tag.textContent = 'Käyttäjän lisäämä';
      actions.appendChild(tag);
    }

    article.appendChild(actions);
    container.appendChild(article);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});

// Expose helpers for create/view pages
window.__blogi = {
  getUserPosts,
  saveUserPosts
};

// expose formatter
window.__blogi.formatDate = formatDate;
