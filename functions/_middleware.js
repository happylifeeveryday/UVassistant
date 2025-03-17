// functions/_middleware.js

export async function onRequest(context) {
    const { request, next, env } = context;
  
    // Use an environment variable or fallback to a hardcoded password
    const PASSWORD = env.PASSWORD;
  
    // Check if the request has the authorized cookie
    const cookieHeader = request.headers.get("Cookie") || "";
    const hasAuthCookie = cookieHeader.includes("authorized=true");
  
    // Current request URL
    const url = new URL(request.url);
  
    // If the user is already authorized, proceed to the next handler 
    if (hasAuthCookie) {
      return next();
    }
  

    if (url.pathname === "/login" && request.method === "POST") {
      const formData = await request.formData();
      const inputPassword = formData.get("password");
  
      if (inputPassword === PASSWORD) {
        const headers = new Headers({
          "Set-Cookie": "authorized=true; Path=/; HttpOnly; Max-Age=3600",
          "Location": "/"
        });
        return new Response(null, { status: 302, headers });
      } else {
        return new Response("<h1>Incorrect password</h1><a href='/'>Return to Retry</a>", {
          headers: { "content-type": "text/html; charset=UTF-8" },
          status: 401
        });
      }
    }
  
    // If not authorized, show the password entry form
    return new Response(renderPasswordForm(), {
      headers: { "content-type": "text/html; charset=UTF-8" }
    });
  }
  
  /**
   * Renders a simple HTML page using Bootstrap for styling.
   * The user must submit the correct password to continue.
   */
  function renderPasswordForm() {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Required</title>
    <!-- Load Bootstrap (via CDN) -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      integrity="sha384-..."
      crossorigin="anonymous"
    />
  </head>
  <body class="bg-light">
    <div class="container d-flex flex-column align-items-center justify-content-center" style="height: 100vh;">
      <div class="card shadow" style="max-width: 400px; width: 100%;">
        <div class="card-body">
          <h1 class="card-title text-center mb-4">Access Required</h1>
          <form action="/login" method="post">
            <div class="mb-3">
              <label for="password" class="form-label">Enter Credential</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Credential"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  }