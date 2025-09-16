// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Chatbot (simulado)
const chatBtn = document.querySelector('.chatbot-trigger');
const chatWin = document.getElementById('chatWindow');
chatBtn.addEventListener('click', () => {
  chatWin.style.display = chatWin.style.display === 'block' ? 'none' : 'block';
  chatWin.innerHTML = '<p>🤖 Hola, ¿cuál es tu objetivo? <button onclick="startChat()">Empezar</button></p>';
});

function startChat() {
  chatWin.innerHTML = `
    <p>1. ¿Qué buscas? <button>Perder peso</button> <button>Ganar músculo</button></p>
    <p>2. ¿Días por semana? <button>3</button> <button>5</button></p>
    <p><em>Próximamente podrás descargar tu plan en PDF.</em></p>
  `;
}
