using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;

namespace backend{

}
public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock)
        : base(options, logger, encoder, clock)
    {
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization")){
            return Task.FromResult(AuthenticateResult.Fail("Missing Authorization Header"));
        }
    
        string username = String.Empty;
        string password = String.Empty;
        try{
            var authHeader = System.Net.Http.Headers.AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            var credentials = System.Text.Encoding.UTF8.GetString(credentialBytes).Split(':');
            username = credentials[0];
            password = credentials[1];
        }catch{
            return Task.FromResult(AuthenticateResult.Fail("Error decrypting login"));
        }
    
        if (username == "eduro@depaul.edu" && password == "password"){
            var claims = new System.Security.Claims.Claim[]{
                new System.Security.Claims.Claim(ClaimTypes.Name, username)
            };
            var identity = new System.Security.Claims.ClaimsIdentity(claims, Scheme.Name);
            var principal = new System.Security.Claims.ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);
            return Task.FromResult(AuthenticateResult.Success(ticket));
            //return Task.FromResult(AuthenticateResult.Success(new AuthenticationTicket(
            //   new ClaimsPrincipal(), "BasicAuthentication")));
        }
    
        return Task.FromResult(AuthenticateResult.Fail("Failed authentication"));
    }
}