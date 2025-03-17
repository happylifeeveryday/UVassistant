// functions/_middleware.js

export async function onRequest(context) {
    const { request, next, env } = context;
  
    const PASSWORD = env.PASSWORD || "my-secret";
  
    const cookieHeader = request.headers.get("Cookie") || "";
    const hasAuthCookie = cookieHeader.includes("authorized=true");
  
    const url = new URL(request.url);
    
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

        return new Response("<h1>incorrect password</h1><a href='/'>Return to Retry</a>", {
          headers: { "content-type": "text/html; charset=UTF-8" },
          status: 401
        });
      }
    }
  

    return new Response(renderPasswordForm(), {
      headers: { "content-type": "text/html; charset=UTF-8" }
    });
  }
  

  function renderPasswordForm() {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8"/>
    <title>Please enter your password</title>
  </head>
  <body>
    <h1>Please enter the access code</h1>
    <form action="/login" method="post">
      <input type="password" name="password" required />
      <button type="submit">提交</button>
    </form>
  </body>
  </html>
  `;
  }