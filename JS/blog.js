// ============================
// blog.js — Modern Blog Logic + Parallax + Scroll Snapping
// ============================

// --- Your Existing Blog Logic (unchanged) ---

const posts = [
  {
    id: 1,
    title: 'Docker from scratch and Sample web App',
    kicker: 'Docker · Web-App',
    date: '2023-09-23',
    summary: 'Learn how to create a Docker image from scratch and deploy a simple Flask web application. This guide walks you through writing a Dockerfile, building the image, and running the app in a container, making it easy to deploy web applications efficiently.',
    image: 'https://images.unsplash.com/photo-1646627927863-19874c27316b?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Learn how to create a Docker image from scratch and deploy a simple Flask web application. This guide walks you through writing a Dockerfile, building the image, and running the app in a container, making it easy to deploy web applications efficiently.</p>`,
    external: "https://medium.com/@venkateshkumar9211/creating-docker-from-scratch-and-deploying-sample-web-app-c6ca3151a5b5"
  },
  {
    id: 2,
    title: 'Virtualization, Docker and Kubernetes in Google Cloud Platform',
    kicker: 'Google-Cloud · Container',
    date: '2023-10-12',
    summary: 'Explore how Virtualization, Docker, and Kubernetes work together in Google Cloud Platform.',
    image: 'https://images.unsplash.com/photo-1511296265581-c2450046447d?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Explore how Virtualization, Docker, and Kubernetes work together in Google Cloud Platform.
            This blog covers the fundamentals of each technology and 
            demonstrates how they enable scalable and efficient cloud-native application deployment.</p>`,
    external: "https://medium.com/@venkateshkumar9211/virtualization-docker-and-kubernetes-in-google-cloud-platform-b0a062939714"
  },
  {
    id: 3,
    title: 'ML(Kmeans and GMM)',
    kicker: 'ML · Basics',
    date: '2023-08-18',
    summary: 'Performing Kmeans using Cosine Similarity and Gmm on MNIST dataset.',
    image: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=1400&auto=format&fit=crop',
    content: `<p>Performing Kmeans using Cosine Similarity and Gmm on MNIST dataset.</p>`,
    external: '/Html/Blogs/ML/Assignment2/m23cse028_report.html'
  },
  {
    id: 4,
    title: 'Diffusion Models and Stories',
    kicker: 'Diffusion models · Image Synthesis',
    date: '2025-10-13',
    summary: 'What are diffusion models, ideas behind it.',
    image: 'https://images.unsplash.com/photo-1608054361605-1bfd5a2b31c7?q=80&w=1400&auto=format&fit=crop',
    content: `
    <p><strong>How does the magic of diffusion models actually work?</strong>  
    At their core, diffusion models are a mathematically principled way to learn how structure emerges from randomness—step by step.</p>
    
    <h2>🧠 What Are Diffusion Models?</h2>
    <p>
    Diffusion models are generative models that learn a data distribution by reversing a gradual stochastic corruption process.
    They define a forward noising process <span>q(x_t | x_0)</span> and a learned reverse denoising process <span>p_θ(x_{t-1} | x_t)</span>.
    </p>
    
    <p>
    Unlike adversarial methods, diffusion models optimize an explicit likelihood-based objective and exhibit remarkable training stability.
    </p>
    
    <h2>🌫️ Forward Diffusion Process (q)</h2>
    <p>
    The forward process incrementally adds Gaussian noise to the data over <em>T</em> timesteps:
    </p>
    
    <p>
    \\[
    q(x_t | x_{t-1}) = \\mathcal{N}(\\sqrt{1 - \\beta_t} \\, x_{t-1}, \\beta_t I)
    \\]
    </p>
    
    <p>
    By composition, we obtain a closed-form expression:
    </p>
    
    <p>
    \\[
    q(x_t | x_0) = \\mathcal{N}(\\sqrt{\\bar{\\alpha}_t} \\, x_0, (1 - \\bar{\\alpha}_t) I)
    \\]
    </p>
    
    <p>
    where \\( \\alpha_t = 1 - \\beta_t \\) and \\( \\bar{\\alpha}_t = \\prod_{i=1}^{t} \\alpha_i \\).
    As \\( t \\to T \\), the distribution converges to isotropic Gaussian noise.
    </p>
    
    <h3>🎞️ Animated SVG Diagram: Forward Process</h3>
    <p>
    An effective animation shows an image gradually dissolving into noise:
    </p>
    <ul>
      <li>Frame 1: Original image (x₀)</li>
      <li>Frames 2–N: Increasing noise opacity, decreasing signal</li>
      <li>Final frame: Pure Gaussian noise (x<sub>T</sub>)</li>
    </ul>
    <p>
    Each timestep animates a linear interpolation weighted by \\( \\sqrt{\\bar{\\alpha}_t} \\).
    </p>
    
    <h2>🔁 Reverse Diffusion Process (p)</h2>
    <p>
    The generative process learns to invert the forward diffusion:
    </p>
    
    <p>
    \\[
    p_θ(x_{t-1} | x_t) = \\mathcal{N}(\\mu_θ(x_t, t), \\sigma_t^2 I)
    \\]
    </p>
    
    <p>
    Rather than predicting \\( x_0 \\) directly, modern diffusion models predict the noise term \\( \\epsilon \\):
    </p>
    
    <p>
    \\[
    \\epsilon_θ(x_t, t) \\approx \\epsilon
    \\]
    </p>
    
    <p>
    This reparameterization improves numerical stability and simplifies training.
    </p>
    
    <h3>🎞️ Animated SVG Diagram: Reverse Process</h3>
    <p>
    This animation runs backward in time:
    </p>
    <ul>
      <li>Start: Static noise field</li>
      <li>Each frame: Noise subtraction + structure emergence</li>
      <li>End: Fully formed image</li>
    </ul>
    <p>
    Arrows are animated with easing functions to emphasize gradual refinement rather than abrupt changes.
    </p>
    
    <h2>📉 Training Objective (Variational Perspective)</h2>
    <p>
    Diffusion models optimize a variational lower bound on the negative log-likelihood.
    In practice, this reduces to a denoising score-matching loss:
    </p>
    
    <p>
    \\[
    \\mathcal{L} = \\mathbb{E}_{x_0, \\epsilon, t}
    \\left[
    \\lVert
    \\epsilon - \\epsilon_θ(\\sqrt{\\bar{\\alpha}_t} x_0 + \\sqrt{1 - \\bar{\\alpha}_t} \\epsilon, t)
    \\rVert^2
    \\right]
    \\]
    </p>
    
    <p>
    This objective scales cleanly with data dimensionality and avoids adversarial instability.
    </p>
    
    <h2>🚀 Advanced Mechanisms in Modern Diffusion Models</h2>
    
    <h3>⚡ DDPM vs DDIM</h3>
    <p>
    DDPM uses a fully stochastic reverse process.
    DDIM reformulates sampling as a deterministic mapping:
    </p>
    
    <p>
    \\[
    x_{t-1} = \\sqrt{\\bar{\\alpha}_{t-1}} \\hat{x}_0 +
    \\sqrt{1 - \\bar{\\alpha}_{t-1}} \\epsilon
    \\]
    </p>
    
    <p>
    This enables high-quality generation in far fewer steps.
    </p>
    
    <h3>🧭 Classifier-Free Guidance</h3>
    <p>
    Guidance is applied by interpolating conditional and unconditional predictions:
    </p>
    
    <p>
    \\[
    \\hat{\\epsilon} = (1 + w) \\epsilon_{cond} - w \\epsilon_{uncond}
    \\]
    </p>
    
    <p>
    The guidance scale \\( w \\) controls the trade-off between diversity and prompt fidelity.
    </p>
    
    <h3>🧩 Latent Diffusion Models</h3>
    <p>
    Latent diffusion performs the process in a compressed latent space \\( z \\):
    </p>
    
    <p>
    \\[
    x \\xrightarrow{Encoder} z \\xrightarrow{Diffusion} \\hat{z}
    \\xrightarrow{Decoder} \\hat{x}
    \\]
    </p>
    
    <p>
    This reduces computational cost by orders of magnitude without sacrificing perceptual quality.
    </p>
    
    <h2>📊 Mathematical Comparison: Diffusion vs GANs vs Flow Models</h2>
    
    <h3>Diffusion Models</h3>
    <p>
    Optimize an explicit variational objective.  
    Likelihood: approximate but well-defined.  
    Sampling: iterative, slow but stable.
    </p>
    
    <p>
    \\[
    \\text{Training: } \\min_θ \\; \\mathbb{E}[|| \\epsilon - \\epsilon_θ ||^2]
    \\]
    </p>
    
    <h3>GANs</h3>
    <p>
    Learn via a minimax game between generator and discriminator.  
    No explicit likelihood.  
    Fast sampling but unstable training.
    </p>
    
    <p>
    \\[
    \\min_G \\max_D \\; \\mathbb{E}_{x \\sim p_{data}}[\\log D(x)] +
    \\mathbb{E}_{z \\sim p(z)}[\\log(1 - D(G(z)))]
    \\]
    </p>
    
    <h3>Normalizing Flows</h3>
    <p>
    Learn exact likelihoods via invertible transformations.  
    Efficient sampling and inference but limited architectural flexibility.
    </p>
    
    <p>
    \\[
    \\log p(x) = \\log p(z) + \\sum_i \\log
    \\left| \\det \\frac{\\partial f_i}{\\partial x} \\right|
    \\]
    </p>
    
    <h3>Summary Table (Conceptual)</h3>
    <ul>
      <li><strong>Diffusion:</strong> Stable, high quality, slow sampling</li>
      <li><strong>GANs:</strong> Fast, sharp images, unstable</li>
      <li><strong>Flows:</strong> Exact likelihoods, architectural constraints</li>
    </ul>
    
    <h2>🌍 Why Diffusion Models Matter</h2>
    <p>
    Diffusion models represent a convergence of probability theory, deep learning, and numerical simulation.
    They have become the backbone of modern image, video, audio, and multimodal generation systems.
    </p>
    
    <p>
    At a deeper level, diffusion models formalize a powerful idea:
    <strong>generation is not creation from nothing, but the controlled removal of uncertainty.</strong>
    </p>
    `,
    external: ''
  },

  {
    id: 5,
    title: 'TLS 1.3, Secure Communication, is it Https?',
    kicker: 'Https · TLS',
    date: '2025-12-18',
    summary: '',
    image: 'https://images.unsplash.com/photo-1667372283496-893f0b1e7c16',
    content: `
      <p><strong>Welcome to the in-depth exploration of TLS 1.3!</strong>  
      TLS 1.3 is the latest version of the Transport Layer Security protocol, designed to provide robust security, faster handshakes, and simplified cryptographic suites.</p>
      
      <h2>🔒 Why TLS 1.3?</h2>
      <p>TLS 1.2 had several limitations:</p>
      <ul>
        <li>Multiple round trips required for handshake (slower).</li>
        <li>Optional forward secrecy – not enforced.</li>
        <li>Complex cipher suite negotiation.</li>
        <li>Vulnerable to downgrade and other attacks.</li>
      </ul>
      <p>TLS 1.3 addresses these by enforcing forward secrecy, reducing handshake latency, and simplifying cryptographic options.</p>
      
      <h2>📝 Threat Model & Security Goals</h2>
      <p>TLS 1.3 assumes:</p>
      <ul>
        <li>Passive eavesdroppers</li>
        <li>Active MITM attackers</li>
        <li>Replay attackers</li>
        <li>Downgrade attackers</li>
      </ul>
      <p>Goals:</p>
      <ul>
        <li>Confidentiality and integrity</li>
        <li>Forward secrecy (mandatory)</li>
        <li>Authentication of the server (and optionally client)</li>
        <li>Transcript integrity</li>
      </ul>
      
      <h2>🌐 High-Level Architecture</h2>
      <p>TLS 1.3 always uses ephemeral key exchanges and encrypts almost all handshake messages. Handshake flow:</p>
      <pre>
      ClientHello → ServerHello → EncryptedExtensions → Certificate → CertificateVerify → Finished
      </pre>
      
      <p>Inline SVG placeholder for handshake flow:</p>
      <svg width="100%" height="120">
        <rect x="0" y="40" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="10" y="65">ClientHello</text>
        <rect x="140" y="40" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="150" y="65">ServerHello</text>
        <rect x="280" y="40" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="290" y="65">EncryptedExt</text>
      </svg>
      
      <h2>🤝 Handshake Protocol</h2>
      
      <h3>ClientHello</h3>
      <p>The client sends:</p>
      <ul>
        <li>Supported cipher suites (AEAD only)</li>
        <li>Key shares (ECDHE)</li>
        <li>Supported groups & signature algorithms</li>
        <li>PSK identities (for 0-RTT)</li>
      </ul>
      <p>Key share example:</p>
      <p>\\[
      \text{ClientKeyShare} = g^a \mod p
      \\]</p>
      
      <h3>ServerHello</h3>
      <p>The server selects:</p>
      <ul>
        <li>Cipher suite</li>
        <li>Key share</li>
        <li>Protocol version</li>
      </ul>
      <p>Shared secret computation:</p>
      <p>\\[
      \text{SharedSecret} = (g^b)^a = g^{ab} \mod p
      \\]</p>
      
      <h2>🗝 Key Schedule</h2>
      <p>TLS 1.3 uses <strong>HKDF</strong> everywhere:</p>
      
      <p>Early Secret (optional PSK):</p>
      <p>\\[
      \text{EarlySecret} = \text{HKDF-Extract}(0, \text{PSK})
      \\]</p>
      
      <p>Handshake Secret:</p>
      <p>\\[
      \text{HandshakeSecret} = \text{HKDF-Extract}(\text{EarlySecret}, g^{ab})
      \\]</p>
      
      <p>Application Secret:</p>
      <p>\\[
      \text{ApplicationSecret} = \text{HKDF-Extract}(\text{HandshakeSecret}, 0)
      \\]</p>
      
      <p>From these secrets, TLS 1.3 derives:</p>
      <ul>
        <li>Client/server handshake keys</li>
        <li>Client/server application keys</li>
      </ul>
      
      <h2>🔐 Encrypted Handshake</h2>
      <p>All handshake messages after ServerHello are encrypted:</p>
      <ul>
        <li>Certificate</li>
        <li>CertificateVerify</li>
        <li>Finished</li>
      </ul>
      
      <h3>Finished Message</h3>
      <p>Ensures integrity of the transcript:</p>
      <p>\\[
      \text{verify\_data} = \text{HMAC}(\text{finished\_key}, \text{TranscriptHash})
      \\]</p>
      
      <h2>⚡ 0-RTT Handshake (Optional)</h2>
      <p>Allows sending application data in first flight using PSK.</p>
      <p>Risks:</p>
      <ul>
        <li>No forward secrecy</li>
        <li>Replay attacks</li>
      </ul>
      
      <h2>🛡 Cipher Suites in TLS 1.3</h2>
      <p>Simpler than TLS 1.2:</p>
      <table>
      <tr><th>TLS 1.2</th><th>TLS 1.3</th></tr>
      <tr><td>TLS_RSA_WITH_AES_128_CBC_SHA</td><td>TLS_AES_128_GCM_SHA256</td></tr>
      <tr><td>TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384</td><td>TLS_AES_256_GCM_SHA384</td></tr>
      </table>
      
      <h2>🧾 Authentication & Certificates</h2>
      <p>Certificates use X.509. CertificateVerify signs transcript:</p>
      <p>\\[
      \sigma = \text{Sign}_{sk}(\text{TranscriptHash})
      \\]</p>
      
      <h2>⚖ Comparison TLS 1.3 vs TLS 1.2</h2>
      <table>
      <tr><th>Feature</th><th>TLS 1.2</th><th>TLS 1.3</th></tr>
      <tr><td>Forward Secrecy</td><td>Optional</td><td>Mandatory</td></tr>
      <tr><td>Handshake RTT</td><td>2</td><td>1</td></tr>
      <tr><td>Encryption</td><td>Partial</td><td>Almost all messages</td></tr>
      <tr><td>Crypto Options</td><td>Complex</td><td>Simplified AEAD only</td></tr>
      </table>
      
      <h2>🚨 Common Attacks & Mitigations</h2>
      <ul>
        <li>Downgrade attacks → SupportedVersions field</li>
        <li>Padding oracle → CBC removed, AEAD only</li>
        <li>Replay attacks → 0-RTT precautions</li>
        <li>Renegotiation → Removed entirely</li>
      </ul>
      
      <h2>🌍 Real-World TLS 1.3</h2>
      <p>Browsers: Chrome, Firefox, Edge</p>
      <p>Servers: OpenSSL, BoringSSL, Cloudflare</p>
      <p>HTTP/3 (QUIC) requires TLS 1.3 handshake.</p>
      
      <h2>📊 TLS 1.3 Flow Diagram</h2>
      <svg width="100%" height="150">
        <rect x="0" y="20" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="10" y="45">ClientHello</text>
        <rect x="140" y="20" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="150" y="45">ServerHello</text>
        <rect x="280" y="20" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="290" y="45">EncryptedExtensions</text>
        <rect x="420" y="20" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="430" y="45">Certificate</text>
        <rect x="560" y="20" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="570" y="45">Finished</text>
      </svg>
      
      <h2>🏁 Conclusion</h2>
      <p>TLS 1.3 is faster, safer, and simpler than its predecessors.  
      It enforces forward secrecy, reduces round trips, and modernizes cryptography for the web.</p>
      <p>Using TLS 1.3 ensures both <strong>performance</strong> and <strong>security guarantees</strong> for modern applications.</p>
      `,

    external: ''
  },

  {
    id: 6,
    title: 'Oicd, hey can you Auth & Authz him for me',
    kicker: 'Oicd · Auth-C · Auth-Z ',
    date: '2025-12-19',
    summary: '',
    image: 'https://images.unsplash.com/photo-1651235732694-0d057ace2f30',
    content: `
        <p><strong>Welcome to the comprehensive guide on OpenID Connect (OIDC)!</strong>  
        OpenID Connect is an identity layer on top of OAuth 2.0 that allows clients to verify the identity of end-users and obtain basic profile information in a secure and standardized way.</p>
        
        <h2>🔑 What is OpenID Connect?</h2>
        <p>OpenID Connect (OIDC) is a modern authentication protocol:</p>
        <ul>
          <li>It standardizes user authentication over OAuth 2.0</li>
          <li>It issues <strong>ID Tokens</strong> (JWTs) that prove user identity</li>
          <li>It allows Single Sign-On (SSO) across multiple applications</li>
        </ul>
        <p>Unlike OAuth 2.0, which is primarily for authorization, OIDC is focused on <strong>authentication and identity verification</strong>.</p>
        
        <h2>🌍 Where is OIDC used?</h2>
        <ul>
          <li>Social login (Google, Facebook, Microsoft, Apple)</li>
          <li>Enterprise SSO solutions</li>
          <li>API authentication with ID Tokens</li>
          <li>Mobile apps and web applications requiring secure identity</li>
        </ul>
        
        <h2>📝 OIDC Actors & Roles</h2>
        <ul>
          <li><strong>End-User / Resource Owner:</strong> The human user</li>
          <li><strong>Client / Relying Party (RP):</strong> Application requesting identity</li>
          <li><strong>Authorization Server / OpenID Provider (OP):</strong> Issues tokens and authenticates users</li>
        </ul>
        
        <h2>🔄 OIDC Flows</h2>
        <p>There are three main flows:</p>
        <ul>
          <li><strong>Authorization Code Flow (most secure)</strong> – recommended for server-side apps</li>
          <li><strong>Implicit Flow</strong> – deprecated for new apps, used in SPA</li>
          <li><strong>Hybrid Flow</strong> – combination of code and token delivery</li>
        </ul>
        
        <h2>1️⃣ Authorization Code Flow (Step-by-Step)</h2>
        <p>This is the most commonly used and secure flow:</p>
        
        <ol>
          <li><strong>Client redirects user to OP Authorization Endpoint</strong>  
          URL includes:
            <ul>
              <li>client_id</li>
              <li>response_type=code</li>
              <li>scope=openid profile email</li>
              <li>redirect_uri</li>
              <li>state (to prevent CSRF)</li>
              <li>nonce (to prevent replay attacks)</li>
            </ul>
          </li>
        
          <li><strong>User authenticates at OP</strong> – username/password, SSO, or MFA</li>
        
          <li><strong>Authorization Code returned to Client via redirect</strong>  
          Example URL:
          <pre>https://client.com/callback?code=abc123&state=xyz</pre>
          </li>
        
          <li><strong>Client exchanges code for tokens</strong> at the Token Endpoint using POST request:
          <pre>
        POST /token
        grant_type=authorization_code
        code=abc123
        redirect_uri=https://client.com/callback
        client_id=CLIENT_ID
        client_secret=CLIENT_SECRET
          </pre>
          Response:
          <pre>
        {
          "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
          "access_token": "ya29.a0ARrdaM...",
          "refresh_token": "1//0g...",
          "token_type": "Bearer",
          "expires_in": 3600
        }
          </pre>
          </li>
        
          <li><strong>Client verifies ID Token</strong> using the <strong>nonce</strong> and public key of OP</li>
        </ol>
        
        <h2>🧮 ID Token Verification (JWT)</h2>
        <p>ID Token is a JWT signed by OP. Verification involves:</p>
        <ul>
          <li>Signature validation:  
          \\[
          \text{signature} = \text{Sign}_{OP\_private}(header \| payload)
          \\]</li>
          <li>Nonce validation (prevent replay)</li>
          <li>Expiration check (exp claim)</li>
          <li>Audience check (aud claim must match client_id)</li>
        </ul>
        
        <h2>🛠 Claims in ID Token</h2>
        <ul>
          <li><strong>sub</strong>: unique user identifier</li>
          <li><strong>name</strong>: full name</li>
          <li><strong>email</strong>: user email</li>
          <li><strong>iat, exp</strong>: issued at, expiration timestamps</li>
          <li>Custom claims possible</li>
        </ul>
        
        <h2>🔗 OIDC vs OAuth 2.0</h2>
        <table>
        <tr><th>Feature</th><th>OAuth 2.0</th><th>OIDC</th></tr>
        <tr><td>Purpose</td><td>Authorization</td><td>Authentication & Identity</td></tr>
        <tr><td>Token Type</td><td>Access Token</td><td>ID Token (JWT) + Access Token</td></tr>
        <tr><td>Flow</td><td>Authorization / Implicit</td><td>Authorization Code, Hybrid, Implicit</td></tr>
        <tr><td>Profile Info</td><td>No standard claims</td><td>Standard claims: name, email, etc.</td></tr>
        </table>
        
        <h2>📊 Typical OpenID Connect Flow Diagram</h2>
        <svg width="100%" height="150">
          <rect x="0" y="20" width="100" height="40" fill="#32cd32" opacity="0.2"/><text x="10" y="45">User → Client</text>
          <rect x="120" y="20" width="140" height="40" fill="#32cd32" opacity="0.2"/><text x="130" y="45">Client → OP Auth Endpoint</text>
          <rect x="280" y="20" width="140" height="40" fill="#32cd32" opacity="0.2"/><text x="290" y="45">User Authentication</text>
          <rect x="440" y="20" width="120" height="40" fill="#32cd32" opacity="0.2"/><text x="450" y="45">Authorization Code → Client</text>
          <rect x="580" y="20" width="140" height="40" fill="#32cd32" opacity="0.2"/><text x="590" y="45">Token Exchange</text>
        </svg>
        
        <h2>🔐 Security Features of OIDC</h2>
        <ul>
          <li>Replay protection via <strong>nonce</strong></li>
          <li>CSRF protection via <strong>state</strong></li>
          <li>JWT signature verification ensures integrity</li>
          <li>Optional Multi-Factor Authentication (MFA) support</li>
        </ul>
        
        <h2>🛠 Use Cases</h2>
        <ul>
          <li>Single Sign-On (SSO) for multiple web apps</li>
          <li>Mobile app login via Google / Apple / Microsoft</li>
          <li>API authentication using ID tokens</li>
          <li>Enterprise identity federation</li>
        </ul>
        
        <h2>🏁 Conclusion</h2>
        <p>OpenID Connect provides a standardized, secure, and flexible way to authenticate users across applications.  
        It builds on OAuth 2.0 for authorization, adds identity verification via ID Tokens, and supports SSO, MFA, and enterprise scenarios.  
        By understanding its flows, claims, and verification steps, developers can implement OIDC correctly for secure and modern applications.</p>
        `
        ,
    external: ""
  },
];

// Elements
const grid = document.getElementById('grid');
const countEl = document.getElementById('count');
const searchInput = document.getElementById('search');
const backdrop = document.getElementById('backdrop');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalMeta = document.getElementById('modalMeta');
const modalContent = document.getElementById('modalContent');
const externalOpen = document.getElementById('externalOpen');

let activePost = null;

// Render posts grid
function renderCards(list) {
  grid.innerHTML = '';
  list.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card fade-up';
    card.style.animationDelay = `${i * 60}ms`;

    card.innerHTML = `
      <div class="thumb" style="background-image:linear-gradient(180deg, rgba(7,12,20,0.12), rgba(2,6,23,0.35)), url(${p.image})"></div>
      <div class="kicker">${p.kicker}</div>
      <h3>${p.title}</h3>
      <p class="summary">${p.summary}</p>
      <div class="meta">
        <div style="color:var(--muted);font-size:13px">${new Date(p.date).toLocaleDateString()}</div>
        <div class="tags"><span class="tag">${p.kicker.split('·')[0].trim()}</span></div>
      </div>
      <div class="readrow">
        <button class="btn" onclick="openInModal(${p.id})">Read</button>
        <button class="close" onclick="${p.external ? `window.open('${p.external}', '_blank')` : `sharePost(${p.id})`}">${p.external ? 'Open externally' : 'Share'}</button>
      </div>
    `;

    grid.appendChild(card);
  });
  countEl.textContent = list.length;
}

// Generate tags dynamically
function generatePopularTags() {
  const tagCount = {};
  
  posts.forEach(post => {
    const tags = post.kicker.split('·').map(t => t.trim());
    tags.forEach(tag => tagCount[tag] = (tagCount[tag] || 0) + 1);
  });

  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  const tagListContainer = document.querySelector('.taglist');
  tagListContainer.innerHTML = '';

  sortedTags.forEach(([tag]) => {
    const btn = document.createElement('button');
    btn.className = 'tag';
    btn.textContent = tag;
    btn.onclick = () => filterByTag(tag);
    tagListContainer.appendChild(btn);
  });
}

function filterByTag(tag) {
  const filtered = posts.filter(post => post.kicker.includes(tag));
  renderCards(filtered);
}

// Modal handling
function openInModal(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  activePost = p;
  modalTitle.textContent = p.title;
  modalKicker.textContent = p.kicker;
  modalMeta.textContent = `Published on ${new Date(p.date).toLocaleDateString()}`;
  modalContent.innerHTML = `
    <div style="margin-bottom:12px;border-radius:10px;overflow:hidden;height:300px;background-size:cover;background-position:center;background-image:linear-gradient(180deg,rgba(0,0,0,0.25),transparent), url(${p.image})"></div>
    ${p.content}
  `;
  externalOpen.style.display = p.external ? 'inline-block' : 'none';
  externalOpen.onclick = () => { if (p.external) window.open(p.external, '_blank'); };
  backdrop.style.display = 'flex';
  
  // 🔥 THIS LINE FIXES LATEX
  if (window.MathJax) MathJax.typesetPromise();
}

document.getElementById('closeModal').onclick = () => {
  backdrop.style.display = 'none';
  activePost = null;
};
backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) backdrop.style.display = 'none';
});

// Share handler
function sharePost(id) {
  const link = `${window.location.href.split('#')[0]}#post=${id}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard');
  }
}

// Search functionality
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.summary.toLowerCase().includes(q) ||
    p.kicker.toLowerCase().includes(q)
  );
  renderCards(filtered);
});

// Initial render
renderCards(posts);
generatePopularTags();

// Open post from URL hash
(function openFromHash() {
  const m = location.hash.match(/post=(\d+)/);
  if (m) openInModal(parseInt(m[1], 10));
})();





