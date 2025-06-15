const BRAND_NAME = "Sito Otaku Proxy 🌌";

// Injected Script to Intercept JS Requests
const INJECTED_SCRIPT = (proxiedOrigin) => `
<script>
  (function() {
    const PROXIED_ORIGIN = '${proxiedOrigin}';
    const PROXY_BASE_URL = location.origin + '/proxy?url=';

    const rewriteUrl = (url) => {
      if (!url) return url;
      try {
        const absoluteUrl = new URL(url, PROXIED_ORIGIN).href;
        if (absoluteUrl.startsWith(PROXIED_ORIGIN)) {
          return PROXY_BASE_URL + encodeURIComponent(absoluteUrl);
        }
      } catch (e) {}
      return url;
    };

    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      if (typeof input === 'string') {
        input = rewriteUrl(input);
      }
      return originalFetch.apply(this, arguments);
    };

    const originalXhrOpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function(method, url, ...args) {
      const rewrittenUrl = rewriteUrl(url);
      return originalXhrOpen.apply(this, [method, rewrittenUrl, ...args]);
    };
  })();
</script>`;

// Rewriter Classes
class AttributeRewriter {
  constructor(proxiedOrigin) {
    this.proxiedOrigin = proxiedOrigin;
  }
  element(element) {
    const attributesToRewrite = ['href', 'src', 'action', 'data-src'];
    for (const attr of attributesToRewrite) {
      const originalUrl = element.getAttribute(attr);
      if (originalUrl) {
        try {
          const absoluteUrl = new URL(originalUrl, this.proxiedOrigin).href;
          const proxiedUrl = `/proxy?url=${encodeURIComponent(absoluteUrl)}`;
          element.setAttribute(attr, proxiedUrl);
        } catch (e) {}
      }
    }
  }
}

class HeadRewriter {
  constructor(proxiedOrigin) {
    this.proxiedOrigin = proxiedOrigin;
  }
  element(element) {
    element.prepend(INJECTED_SCRIPT(this.proxiedOrigin), { html: true });
  }
}

// Worker Event
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith('/proxy')) {
    return handleProxyRequest(request);
  }
  return showUrlForm();
}

async function handleProxyRequest(request) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  if (!targetUrl) {
    return new Response('Missing URL', { status: 400 });
  }

  try {
    const fullTarget = new URL(targetUrl);
    const proxiedOrigin = fullTarget.origin;

    const headers = new Headers(request.headers);
    headers.set('Host', fullTarget.host);
    headers.set('Referer', proxiedOrigin);

    const originResponse = await fetch(fullTarget.toString(), {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: 'manual'
    });

    if (originResponse.status >= 300 && originResponse.status < 400) {
      const location = originResponse.headers.get('Location');
      if (location) {
        const absoluteRedirect = new URL(location, proxiedOrigin).href;
        const rewrittenLocation = `${url.origin}/proxy?url=${encodeURIComponent(absoluteRedirect)}`;
        return new Response(null, { status: 302, headers: { 'Location': rewrittenLocation } });
      }
    }

    const resHeaders = new Headers(originResponse.headers);
    resHeaders.delete('Content-Security-Policy');
    resHeaders.delete('Content-Encoding');
    resHeaders.delete('Strict-Transport-Security');
    resHeaders.set('Access-Control-Allow-Origin', '*');

    const contentType = resHeaders.get('content-type') || '';
    if (contentType.includes('html')) {
      const rewriter = new HTMLRewriter()
        .on('head', new HeadRewriter(proxiedOrigin))
        .on('a, link, script, img, form, iframe', new AttributeRewriter(proxiedOrigin))
        .on('base', { element: (el) => el.remove() });

      const transformed = rewriter.transform(originResponse);
      return new Response(transformed.body, {
        status: originResponse.status,
        headers: resHeaders
      });
    }

    return new Response(originResponse.body, {
      status: originResponse.status,
      headers: resHeaders
    });
  } catch (err) {
    return showErrorPage(err);
  }
}

// Anime-Themed UI Page
function showUrlForm() {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${BRAND_NAME}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Zen+Kurenaido&display=swap" rel="stylesheet">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Zen Kurenaido', sans-serif;
        overflow: hidden;
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        color: white;
      }
      .stars {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
      }
      .star {
        position: absolute;
        width: 2px;
        height: 100px;
        background: linear-gradient(45deg, #fff, rgba(255,255,255,0));
        animation: fall 2s linear infinite;
      }
      @keyframes fall {
        0% {
          transform: translateY(-100%) translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateY(110vh) translateX(50vw);
          opacity: 0;
        }
      }
      .container {
        position: relative;
        z-index: 1;
        background: rgba(0, 0, 0, 0.65);
        max-width: 600px;
        margin: 10vh auto;
        padding: 2em;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 25px #fff3;
      }
      h1 {
        font-size: 2.5em;
        margin-bottom: 0.5em;
        color: #ffccff;
      }
      input[type="url"] {
        width: 90%;
        padding: 12px;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        margin-bottom: 1em;
      }
      button {
        padding: 12px 24px;
        background: #ff6699;
        color: white;
        border: none;
        font-size: 1em;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 0 10px #ff99cc;
      }
      button:hover {
        background: #ff3385;
        transform: scale(1.05);
      }
      .music-toggle {
        position: fixed;
        bottom: 15px;
        right: 20px;
        background: rgba(255,255,255,0.15);
        padding: 6px 10px;
        border-radius: 8px;
        font-size: 0.8em;
        cursor: pointer;
        z-index: 2;
      }
    </style>
  </head>
  <body>
    <div class="stars" id="stars"></div>
    <div class="container">
      <h1>${BRAND_NAME}</h1>
      <p>Enter a URL to browse anonymously, otaku style 🌙</p>
      <form onsubmit="proxyUrl(event)">
        <input type="url" id="urlInput" placeholder="https://example.com" required>
        <br>
        <button type="submit">✨ Connect ✨</button>
      </form>
    </div>
    <div class="music-toggle" onclick="toggleMusic()">🎵 Toggle Music</div>
    <audio id="bgm" loop preload="auto" style="display:none;">
      <source src="https://files.catbox.moe/q0ckbf.mp3" type="audio/mpeg">
    </audio>
    <script>
      function proxyUrl(event) {
        event.preventDefault();
        const url = document.getElementById('urlInput').value;
        if (url) {
          window.location.href = '/proxy?url=' + encodeURIComponent(url);
        }
      }

      function toggleMusic() {
        const audio = document.getElementById('bgm');
        if (audio.paused) audio.play();
        else audio.pause();
      }

      function createStars() {
        const container = document.getElementById('stars');
        for (let i = 0; i < 30; i++) {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = Math.random() * 100 + 'vw';
          star.style.top = Math.random() * -100 + 'vh';
          star.style.animationDelay = Math.random() * 5 + 's';
          container.appendChild(star);
        }
      }

      createStars();
    </script>
  </body>
  </html>
  `;
  return new Response(html, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
}

// Error Page
function showErrorPage(error) {
  return new Response(`
    <!DOCTYPE html><html><body style="background:black;color:white;text-align:center;">
    <h1>⚠️ Proxy Error</h1>
    <p>${error.message}</p>
    <a href="/" style="color:#ffccff">Return to Proxy Home</a>
    </body></html>`, {
    status: 500,
    headers: { 'Content-Type': 'text/html' }
  });
}
