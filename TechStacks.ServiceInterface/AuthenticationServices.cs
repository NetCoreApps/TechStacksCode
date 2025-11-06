using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using ServiceStack;
using System.Threading.Tasks;

namespace TechStacks.ServiceInterface;

[Route("/auth/github", "GET")]
public class GitHubAuthRequest : IReturn<GitHubAuthResponse>
{
    public string? RedirectUrl { get; set; }
}

public class GitHubAuthResponse
{
    public string RedirectUrl { get; set; }
}

public class AuthenticationServices : Service
{
    /// <summary>
    /// Initiates GitHub OAuth authentication flow
    /// </summary>
    public async Task<object> Get(GitHubAuthRequest request)
    {
        var redirectUrl = request.RedirectUrl ?? "/auth/callback";

        // Store the redirect URL in temp data or query string
        var properties = new AuthenticationProperties
        {
            RedirectUri = redirectUrl
        };

        // Initiate the GitHub authentication challenge
        var httpReq = Request.GetOriginalRequest<ServiceStack.Host.NetCore.NetCoreRequest>();
        await httpReq.HttpContext.ChallengeAsync("GitHub", properties);

        return new GitHubAuthResponse
        {
            RedirectUrl = redirectUrl
        };
    }
}
