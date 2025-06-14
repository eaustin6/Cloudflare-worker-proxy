// Dynamic Cloudflare Proxy with Enhanced Anime-Themed UI

const BRAND_NAME = "Sito Cloud Proxies"; 

const DEFAULT_CSS = `
  /* --- FONT (No Change) --- */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

  /* --- KEYFRAME ANIMATIONS (Updated & New) --- */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 15px 5px rgba(236, 72, 153, 0.4), 0 0 5px 2px rgba(236, 72, 153, 0.6);
    }
    50% {
      box-shadow: 0 0 25px 8px rgba(236, 72, 153, 0.6), 0 0 10px 4px rgba(236, 72, 153, 0.9);
    }
  }

  @keyframes starryNight {
    0% { transform: translateY(0); }
    100% { transform: translateY(-2000px); }
  }

  /* NEW: Keyframe for the button's loading spinner */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* NEW: Keyframe for the title's glitch effect */
  @keyframes glitch {
    0%, 20%, 24%, 100% {
      transform: none;
      opacity: 1;
    }
    21% {
      transform: skewX(-15deg) translateX(5px);
      opacity: 0.8;
    }
    22% {
      transform: skewX(10deg) translateX(-5px);
      opacity: 0.8;
    }
    23% {
      transform: skewX(0deg) translateX(0px);
      opacity: 0.8;
    }
  }


  /* --- CORE STYLES (Updated) --- */
  body {
    font-family: 'Orbitron', 'Segoe UI', system-ui, sans-serif;
    margin: 0;
    min-height: 100vh;
    background-color: #0d061f;
    color: #e5e7eb;
    overflow: hidden;
    display: grid;
    place-items: center;
    /* NEW: Add perspective for the 3D effect */
    perspective: 1000px;
  }

  .stars-container {
    position: absolute;
    top: -10%; left: -10%;
    width: 120%; height: 120%;
    z-index: -1;
    transition: transform 0.1s linear; /* For parallax effect */
  }

  .stars {
    width: 100%;
    height: calc(100% + 2000px); /* Ensure stars cover the animated distance */
    background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000"><circle cx="100" cy="100" r="1.5" fill="white"/><circle cx="350" cy="420" r="1" fill="white"/><circle cx="650" cy="220" r="1.2" fill="white"/><circle cx="950" cy="880" r="1.8" fill="white"/><circle cx="1100" cy="620" r="1.1" fill="white"/><circle cx="1350" cy="400" r="1.6" fill="white"/><circle cx="1600" cy="950" r="1.3" fill="white"/><circle cx="1850" cy="150" r="1" fill="white"/><circle cx="250" cy="950" r="1.5" fill="white"/><circle cx="450" cy="720" r="1" fill="white"/><circle cx="800" cy="550" r="1.2" fill="white"/><circle cx="1150" cy="80" r="1.8" fill="white"/><circle cx="1200" cy="920" r="1.1" fill="white"/><circle cx="1450" cy="1100" r="1.6" fill="white"/><circle cx="1700" cy="1450" r="1.3" fill="white"/><circle cx="1950" cy="1250" r="1" fill="white"/></svg>') repeat;
    animation: starryNight 120s linear infinite;
  }

  .container {
    width: min(90%, 500px);
    animation: fadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 1;
  }

  .card {
    background: rgba(29, 21, 58, 0.75);
    backdrop-filter: blur(8px);
    border-radius: 20px;
    border: 1px solid rgba(236, 72, 153, 0.5);
    padding: 2.5rem;
    position: relative;
    /* NEW: Transition for the 3D tilt effect */
    transition: transform 0.1s linear;
    transform-style: preserve-3d; /* Important for 3D effect */
  }
  
  /* NEW: Enhanced "Glass Edge" Glow */
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: inherit;
    z-index: -1;
    box-shadow: 0 0 40px -10px #EC4899;
    transition: box-shadow 0.3s ease;
  }
  .card:hover::before {
    box-shadow: 0 0 60px -10px #EC4899;
  }


  h1 {
    text-align: center;
    margin: 0 0 2rem 0;
    background: linear-gradient(45deg, #EC4899, #8B5CF6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.8rem;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
    /* NEW: Glitch animation */
    animation: glitch 5s infinite steps(1);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  input {
    width: 100%;
    padding: 1rem 1.5rem;
    background: rgba(13, 6, 31, 0.7);
    border: 2px solid #a78bfa;
    border-radius: 12px;
    font-size: 1.1rem;
    color: #e5e7eb;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  input:focus {
    outline: none;
    border-color: #EC4899;
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
  }

  button {
    background: linear-gradient(45deg, #8B5CF6, #EC4899);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: bold;
    font-family: inherit;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: pulseGlow 3s infinite ease-in-out;
    display: flex; /* For aligning spinner */
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  button:hover {
    transform: scale(1.05) translateY(-2px);
  }

  button:disabled {
    cursor: not-allowed;
    filter: brightness(0.7);
    animation: none;
  }

  /* NEW: Spinner for the button's loading state */
  .spinner {
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  .watermark {
    text-align: center;
    margin-top: 1.5rem;
    color: rgba(229, 231, 235, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    transform: translateZ(50px); /* Push watermark forward in 3D space */
  }
`;

function showUrlForm() {
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${BRAND_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${DEFAULT_CSS}</style>
      </head>
      <body>
        <div class="stars-container">
          <div class="stars"></div>
        </div>
        <div class="container" id="container">
          <div class="card">
            <h1>${BRAND_NAME}</h1>
            <form onsubmit="handleSubmit(event)">
              <div class="input-group">
                <input 
                  type="url" 
                  id="urlInput" 
                  placeholder="https://example.com" 
                  required
                  autofocus
                >
              </div>
              <button type="submit" id="submitBtn">
                <span id="btnText">🚀 Warp to Site</span>
              </button>
            </form>
          </div>
          <div class="watermark">Interstellar Web Relay Service</div>
        </div>
        <script>
          /* --- NEW: Script for 3D Tilt & Submitting State --- */
          const container = document.getElementById('container');
          const card = container.querySelector('.card');
          const stars = document.querySelector('.stars-container');

          container.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = card.getBoundingClientRect();
            
            const xRotation = 20 * ((clientY - top - height / 2) / height);
            const yRotation = -20 * ((clientX - left - width / 2) / width);

            card.style.transform = \`rotateX(\${xRotation}deg) rotateY(\${yRotation}deg)\`;
            stars.style.transform = \`translateX(\${-yRotation * 0.5}px) translateY(\${-xRotation * 0.5}px)\`;
          });

          container.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
            stars.style.transform = 'translateX(0) translateY(0)';
          });
          
          function handleSubmit(e) {
            e.preventDefault();
            const urlInput = document.getElementById('urlInput');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            
            const url = urlInput.value;
            if (!/^https?:\\/\\//i.test(url)) {
              alert("Please enter a full URL (e.g., https://example.com)");
              return;
            }

            // Set submitting state
            submitBtn.disabled = true;
            btnText.textContent = "Engaging Warp Drive...";
            const spinner = document.createElement('div');
            spinner.className = 'spinner';
            submitBtn.prepend(spinner);

            const encodedUrl = encodeURIComponent(url);
            window.location.pathname = '/' + encodedUrl;
          }
        </script>
      </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}


// ... (The rest of your handleRequest and fetch event listener logic remains the same)
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.substring(1);

  if (!path) {
    return showUrlForm();
  }

  try {
    const targetUrlString = decodeURIComponent(path);
    const targetUrl = new URL(targetUrlString);

    const response = await fetch(targetUrl.toString(), {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });

    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    // In a real-world scenario, you would need more robust content rewriting here.
    return newResponse;

  } catch (error) {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Error - ${BRAND_NAME}</title>
          <style>${DEFAULT_CSS}</style>
        </head>
        <body>
          <div class="stars-container"><div class="stars"></div></div>
          <div class="container">
            <div class="card">
              <h1>⚠️ Warp Drive Failure</h1>
              <p style="text-align: center; color: #fca5a5;">There was an error processing your request: ${error.message}</p>
              <a href="/" style="text-decoration: none;">
                <button>← Return to Base</button>
              </a>
            </div>
          </div>
        </body>
      </html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
