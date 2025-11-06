# TechStacks Codebase Comprehensive Analysis

## Project Overview
TechStacks is a full-stack .NET Core + Nuxt/Vue application that serves as a community platform for discovering and sharing technology stacks. The site features technologies, tech stacks, organizations with collaborative posting capabilities, and user engagement through voting, comments, and favorites.

**Current Tech Stack:**
- Frontend: Nuxt 1.4.5, Vue 2, Vuetify, Tailwind CSS
- Backend: .NET Core (ASP.NET Core), ServiceStack
- Database: PostgreSQL (OrmLite)
- Authentication: ASP.NET Core Identity + GitHub OAuth

---

## 1. PROJECT STRUCTURE

```
TechStacksCode/
├── TechStacks/                          # Main web app (.NET Core)
│   ├── src/                             # Frontend (Nuxt/Vue)
│   │   ├── pages/                       # Nuxt pages (routes)
│   │   ├── components/                  # Vue components
│   │   ├── layouts/                     # Layout components
│   │   ├── plugins/                     # Nuxt plugins
│   │   ├── middleware/                  # Nuxt middleware
│   │   ├── store/                       # Vuex store
│   │   ├── shared/                      # Shared utilities & DTOs
│   │   └── static/                      # Static assets
│   ├── Areas/Identity/                  # ASP.NET Identity pages (Razor)
│   ├── Pages/                           # Shared Razor pages
│   ├── Migrations/                      # EF Core migrations
│   ├── wwwroot/                         # Static files (CSS, JS)
│   ├── Program.cs                       # Application entry point
│   ├── Configure.*.cs                   # Configuration modules
│   ├── appsettings.json                 # Config (includes OAuth secrets)
│   └── package.json                     # Node dependencies

├── TechStacks.ServiceInterface/         # ServiceStack services
│   ├── Admin/                           # Admin services
│   ├── Auth/                            # Auth services & providers
│   ├── Data/                            # DB context
│   ├── DataModel/                       # Custom models (Notification, etc.)
│   ├── Html/                            # Server-side rendering
│   ├── Messaging/                       # Background services
│   ├── Notifications/                   # Email & notification providers
│   ├── Validations/                     # Request validators
│   └── *.cs files                       # Service implementations

├── TechStacks.ServiceModel/             # Service request/response DTOs
│   ├── Types/                           # Database entities & enums
│   └── *.cs files                       # Service contracts

└── TechStacks.Tests/                    # Unit tests
```

---

## 2. FRONTEND STRUCTURE (NUXT/VUE)

### 2.1 Pages (Routes)
Located in `/TechStacks/src/pages/` - File-based routing:

```
pages/
├── index.vue                            # Home/News page
├── top/index.vue                        # Top technologies page
├── favorites/index.vue                  # User favorites
├── login/
│   └── _provider.vue                    # OAuth login handler
├── news/
│   └── index.vue                        # News/posts page
├── organizations/
│   ├── index.vue                        # Organizations list
│   └── _slug/index.vue                  # Organization detail
├── posts/
│   └── _id/_postslug.vue                # Post detail with comments
├── comments/
│   └── _postid/_id.vue                  # Comment page
├── stacks/
│   ├── index.vue                        # Tech stacks list
│   ├── new.vue                          # Create new stack
│   └── _slug/
│       ├── index.vue                    # Stack detail
│       └── edit.vue                     # Edit stack
├── tech/
│   ├── index.vue                        # Technologies list
│   ├── new.vue                          # Create technology
│   └── _slug/
│       ├── index.vue                    # Tech detail
│       └── edit.vue                     # Edit technology
├── _slug/
│   ├── index.vue                        # Organization home
│   └── _category.vue                    # Category posts view
└── users/
    └── _id.vue                          # User profile
```

### 2.2 Vue Components
Located in `/TechStacks/src/components/`:

**Entity Management:**
- `TechnologyEdit.vue` - Create/edit technologies
- `TechStackEdit.vue` - Create/edit tech stacks
- `OrganizationEdit.vue` - Edit organization
- `OrganizationAdd.vue` - Create organization
- `OrganizationInfo.vue` - Display org info
- `MemberEdit.vue` - Member management
- `MembersInfo.vue` - Display members list
- `CategoryEdit.vue` - Category CRUD
- `LabelEdit.vue` - Label CRUD

**Post & Comments:**
- `PostEdit.vue` - Create/edit posts
- `PostsList.vue` - Display posts list
- `PostInfo.vue` - Post details
- `PostComments.vue` - Comment threads
- `PostComment.vue` - Single comment
- `PostAlerts.vue` - Notification alerts

**Technology Related:**
- `TechnologyComments.vue` - Tech discussion comments
- `TechnologyPost.vue` - Tech-related posts

**Utilities:**
- `FileInput.vue` - File upload component
- `ReportDialog.vue` - Report content dialog
- `Shortcuts.vue` - Keyboard shortcuts dialog
- `DebugInfo.vue` - Debug info display
- `NewsPosts.vue` - News feed
- `CommentEdit.vue` - Comment editing

### 2.3 Layout
- `/layouts/default.vue` - Main navigation layout with Vuetify toolbar

### 2.4 Store (Vuex)
- `/store/index.js` - Centralized state management with:
  - State: sessionInfo, technologies, stacks, organizations, posts, user activity
  - Mutations: Update state
  - Actions: API calls and data loading
  - Getters: Computed state access

### 2.5 Shared Utilities
- `/shared/routes.js` - Route definitions and URL builders
- `/shared/gateway.js` - ServiceStack API client calls
- `/shared/dtos.js` - Generated DTOs from backend
- `/shared/utils.js` - Helper functions
- `/shared/post.js` - Post-specific utilities

### 2.6 Plugins
- `/plugins/vuetify.js` - Vuetify configuration
- `/plugins/ga.js` - Google Analytics
- `/plugins/nuxt-client-init.js` - App initialization

---

## 3. BACKEND STRUCTURE (SERVICSTACK)

### 3.1 Service Implementations
Located in `TechStacks.ServiceInterface/`:

**Core Services:**
- `TechnologyServices.cs` - GET/Search technologies
- `TechnologyServicesAdmin.cs` - Admin: Create/Update/Delete technologies
- `TechnologyStackServices.cs` - GET/Search tech stacks
- `TechnologyStackServicesAdmin.cs` - Admin: Create/Update/Delete stacks
- `OrganizationServices.cs` - Org CRUD, members, labels, categories
- `PostServices.cs` - Post CRUD operations
- `PostUserServices.cs` - User-specific post operations
- `PostPublicServices.cs` - Public post operations
- `UserFavoriteServices.cs` - User favorites management
- `UserStackServices.cs` - User tech stack operations

**Authentication & Session:**
- `CustomAuthUserSession.cs` - Custom session object
- `Auth/DiscourseAuthProvider.cs` - External auth provider
- `SessionInfoServices.cs` - Get current user session

**Admin/Management:**
- `Admin/AdminServices.cs` - Admin operations
- `Admin/NotificationServices.cs` - Notification management
- `Admin/EmailServices.cs` - Email sending
- `TechExtensions.cs` - Tech-related extensions
- `ClientRoutesService.cs` - Route configuration for client

**Utilities & Features:**
- `SubscriptionServices.cs` - Org/post subscriptions
- `EmailServices.cs` - Email provider integration
- `IMarkdownProvider.cs` - Markdown rendering
- `ImgurExtensions.cs` - Image upload integration
- `PreRenderService.cs` - Pre-rendered HTML caching
- `Validations/*.cs` - Request validators

### 3.2 Service Models (DTOs)
Located in `TechStacks.ServiceModel/`:

**Request DTOs:**
- `Technologies.cs` - Find/Query/Get/Create/Update/Delete technologies
- `TechnologyStacks.cs` - Find/Query/Get/Create/Update/Delete stacks
- `Organizations.cs` - CRUD org, members, labels, categories
- `Posts.cs` - CRUD posts, voting, comments, reporting
- `Users.cs` - Session info, user profile, favorites, karma
- `App.cs` - Config, overview, pre-render
- `Admin.cs` - Admin operations
- `Tags.cs` - Tag operations

**Data Entity Types (in Types/):**
- `TechnologyStack.cs` - Technology & TechnologyStack entities
- `Organizations.cs` - Organization, Category, Label, Member entities
- `Posts.cs` - Post, PostComment, PostVote, PostFavorite, PostReport entities
- `UserActivity.cs` - User activity tracking
- `PageStats.cs` - Page view statistics

### 3.3 Plugins & Extensions
- `AppFeatureFlags.cs` - Feature flags

---

## 4. DATABASE MODELS

### 4.1 Core Entities

**Technology (TechnologyBase)**
- `Id`, `Name`, `VendorName`, `VendorUrl`, `ProductUrl`
- `LogoUrl`, `LogoApproved`, `Description`, `Slug`
- `Tier` (enum: ProgrammingLanguage, Client, Http, Server, Data, SoftwareInfrastructure, OperatingSystem, HardwareInfrastructure, ThirdPartyServices)
- `IsLocked`, `OwnerId`, `OrganizationId`, `CommentsPostId`
- `ViewCount`, `FavCount`
- `Created/LastModified` with user tracking
- **History**: `TechnologyHistory` tracks changes with `Operation`

**TechnologyStack (TechnologyStackBase)**
- `Id`, `Name`, `VendorName`, `Description`, `AppUrl`, `ScreenshotUrl`
- `Details`, `DetailsHtml`, `Slug`
- `IsLocked`, `OwnerId`, `OrganizationId`, `CommentsPostId`
- `ViewCount`, `FavCount`
- **History**: `TechnologyStackHistory` tracks changes
- **Relationship**: `TechnologyChoice` - Many-to-many link to technologies

**Organization**
- `Id`, `Name`, `Slug` (unique), `Description`, `DescriptionHtml`
- `Color`, `TextColor`, `LinkColor`, `BackgroundColor`, `BackgroundUrl`
- `LogoUrl`, `HeroUrl`, `Lang`
- `DefaultPostType`, `PostTypes[]`, `ModeratorPostTypes[]`, `DefaultSubscriptionPostTypes[]`
- `DisableInvites`, `DeletePostsWithReportCount`
- Stats: `UpVotes`, `DownVotes`, `Views`, `Favorites`, `Subscribers`, `PostsCount`, `CommentsCount`, `Score`, `Rank`
- `RefId`, `RefSource`, `RefUrn` - External references
- Status: `Hidden`, `Locked`, `Deleted` with user tracking

**Category** (within Organization)
- `Id`, `OrganizationId`, `Name`, `Slug`, `Description`, `Color`
- `TechnologyIds[]` - Associated technologies
- Stats: `PostsCount`, `CommentsCount`, `Score`, `Rank`

**OrganizationLabel**
- `Slug` (primary key), `OrganizationId`, `Description`, `Color`

**OrganizationMember**
- `Id`, `OrganizationId`, `UserId`, `UserName`
- Roles: `IsOwner`, `IsModerator`
- Permissions: `DenyAll`, `DenyPosts`, `DenyComments`, `Notes`

**OrganizationMemberInvite**
- `Id`, `OrganizationId`, `UserId`, `UserName`
- Status: `Approved`, `Dismissed`

**OrganizationSubscription**
- `Id`, `OrganizationId`, `UserId`, `UserName`
- `PostTypes[]` - Filter which post types to notify
- `FrequencyDays` - Notification frequency
- `LastSynced`, `LastSyncedId` - Tracking

### 4.2 Post-Related Entities

**Post**
- `Id`, `OrganizationId`, `UserId`, `Type` (enum: Announcement, Post, Showcase, Question, Request)
- `CategoryId`, `Title`, `Slug`, `Url`, `ImageUrl`
- `Content`, `ContentHtml`, `Location`
- `TechnologyIds[]`, `Labels[]`
- Voting: `UpVotes`, `DownVotes`, `Points`, `PointsModifier`
- Stats: `Views`, `Favorites`, `Subscribers`, `ReplyCount`, `CommentsCount`, `WordCount`, `ReportCount`, `LinksCount`, `LinkedToCount`, `Score`, `Rank`
- Discussion: `PinCommentId`, `LastCommentDate`, `LastCommentId`, `LastCommentUserId`
- Status: `Approved`, `Locked`, `Hidden`, `Deleted`, `Status`, `Archived`, `Bumped`
- `RefId`, `RefSource`, `RefUrn` - External references

**PostComment**
- `Id`, `PostId`, `UserId`, `ReplyId` (for threading)
- `Content`, `ContentHtml`
- Voting: `UpVotes`, `DownVotes`, `Favorites`
- Stats: `Score`, `Rank`, `WordCount`, `ReportCount`
- Status: `Deleted`, `Hidden`

**PostVote**, **PostCommentVote**
- Track user votes with `Weight` (positive/negative)

**PostFavorite**, **PostCommentFavorite**
- Track user favorited items

**PostReport**, **PostCommentReport**
- `FlagType` (enum: Violation, Spam, Abusive, Confidential, OffTopic, Other)
- `ReportNotes`, `Created`, `Acknowledged`, `Dismissed`

**PostChangeHistory**
- `Id`, `PostId`, `ChangedName`, `ChangedValue`, `ChangedReason`

### 4.3 User-Related Entities

**UserActivity**
- `Id`, `UserName`, `Karma`, `TechnologyCount`, `TechStacksCount`, `PostsCount`
- `PostUpVotes`, `PostDownVotes`, `CommentUpVotes`, `CommentDownVotes`
- `PostCommentsCount`, `PinnedCommentCount`
- `PostReportCount`, `PostCommentReportCount`

**UserFavoriteTechnology**, **UserFavoriteTechnologyStack**
- Track user favorites

**ApplicationUser** (ASP.NET Core Identity)
- `Id`, `UserName`, `Email`, `DisplayName`, `FirstName`, `LastName`, `PhoneNumber`
- `ProfileUrl`, `DefaultProfileUrl`
- `RefSource`, `RefUrn` - OAuth provider info
- Status: `Banned`, `DisableEmails`, `CreatedBy`

---

## 5. API ENDPOINTS & SERVICES

### 5.1 Technology Endpoints

**Query/Search:**
- `GET /technology/search` - Find technologies with filters
- `GET /technology/query` - Query technologies
- `GET /technology/{Slug}` - Get single technology with stacks
- `GET /technology/{Slug}/previous-versions` - Version history
- `GET /technology/{Slug}/favorites` - Favorite details

**CRUD:**
- `POST /technology` - Create technology (authenticated)
- `PUT /technology/{Id}` - Update technology
- `DELETE /technology/{Id}` - Delete technology

**Admin:**
- `PUT /admin/technology/{TechnologyId}/logo` - Approve logo
- `PUT /admin/technology/{TechnologyId}/lock` - Lock/unlock tech

### 5.2 Technology Stack Endpoints

**Query/Search:**
- `GET /techstacks/search` - Find stacks
- `GET /techstacks/query` - Query stacks
- `GET /techstacks/{Slug}` - Get stack details
- `GET /techstacks/{Slug}/previous-versions` - Version history
- `GET /techstacks/{Slug}/favorites` - Favorites info

**CRUD:**
- `POST /techstacks` - Create stack
- `PUT /techstacks/{Id}` - Update stack
- `DELETE /techstacks/{Id}` - Delete stack

**Admin:**
- `PUT /admin/techstacks/{TechnologyStackId}/lock` - Lock/unlock stack

### 5.3 Organization Endpoints

**Get:**
- `GET /organizations/{Slug}` - Get by slug
- `GET /orgs/{Id}` - Get by ID
- `GET /orgs/{Id}/admin` - Admin view (members, invites, reports)
- `GET /orgs/{Id}/members` - Get members
- `GET /orgs/{Id}/invites` - Get invites
- `GET /orgs/{OrganizationId}/categories` - Categories

**Create/Update:**
- `POST /orgs` - Create organization
- `POST /orgs/posts/new` - Create for technology
- `PUT /orgs/{Id}` - Update organization
- `DELETE /orgs/{Id}` - Delete organization
- `PUT /orgs/{Id}/lock` - Lock organization

**Members:**
- `POST /orgs/{OrganizationId}/members` - Add member
- `PUT /orgs/{OrganizationId}/members/{Id}` - Update member
- `DELETE /orgs/{OrganizationId}/members/{UserId}` - Remove member
- `POST /orgs/{OrganizationId}/members/set` - Bulk set members

**Invites:**
- `POST /orgs/{OrganizationId}/invites` - Request invite
- `PUT /orgs/{OrganizationId}/invites/{UserId}` - Approve/Dismiss invite

**Categories:**
- `POST /orgs/{OrganizationId}/categories` - Add category
- `PUT /orgs/{OrganizationId}/categories/{Id}` - Update category
- `DELETE /orgs/{OrganizationId}/categories/{Id}` - Delete category

**Labels:**
- `POST /orgs/{OrganizationId}/labels` - Add label
- `PUT /orgs/{OrganizationId}/members/{Slug}` - Update label
- `DELETE /orgs/{OrganizationId}/labels/{Slug}` - Delete label

### 5.4 Post Endpoints

**Query/Read:**
- `GET /posts` - Query/search posts with filters
- `GET /posts/{Id}` - Get post with comments
- `GET /posts/comment` - Query post comments
- `GET /user/posts/activity` - User's voting/favorite activity
- `GET /user/comments/votes` - User's comment votes

**Create/Update:**
- `POST /posts` - Create post
- `PUT /posts/{Id}` - Update post
- `DELETE /posts/{Id}` - Delete post
- `POST /posts/{PostId}/comments` - Add comment
- `PUT /posts/{PostId}/comments/{Id}` - Update comment
- `DELETE /posts/{PostId}/comments/{Id}` - Delete comment

**Voting & Engagement:**
- `PUT /posts/{Id}/vote` - Vote on post (weight: 1/-1/0)
- `PUT /posts/{PostId}/comments/{Id}/vote` - Vote on comment
- `PUT /posts/{Id}/favorite` - Favorite post
- `PUT /posts/{Id}/report` - Report post
- `PUT /posts/{PostId}/comments/{Id}/report` - Report comment
- `PUT /posts/{PostId}/comments/{Id}/pin` - Pin/unpin comment

**Moderation:**
- `PUT /posts/{Id}/lock` - Lock/unlock post
- `PUT /posts/{Id}/hide` - Hide post
- `PUT /posts/{Id}/status/{Status}` - Change status

**Reports:**
- `POST /posts/{PostId}/report/{Id}` - Action on report
- `POST /posts/{PostId}/comments/{PostCommentId}/report/{Id}` - Action on comment report

### 5.5 User Endpoints

**Session & Info:**
- `GET /my-session` - Current user session (requires auth)
- `GET /my-feed` - User feed
- `GET /userinfo/{Id}` - User profile info
- `GET /users/karma` - Bulk user karma

**Favorites:**
- `GET /favorites/technology` - Get favorite techs
- `PUT /favorites/technology/{TechnologyId}` - Add favorite tech
- `DELETE /favorites/technology/{TechnologyId}` - Remove favorite tech
- `GET /favorites/techtacks` - Get favorite stacks
- `PUT /favorites/techtacks/{TechnologyStackId}` - Add favorite stack
- `DELETE /favorites/techtacks/{TechnologyStackId}` - Remove favorite stack

**Subscriptions:**
- `PUT /orgs/{OrganizationId}/subscribe` - Subscribe to org
- `DELETE /orgs/{OrganizationId}/subscribe` - Unsubscribe org
- `PUT /posts/{PostId}/subscribe` - Subscribe to post
- `DELETE /posts/{PostId}/subscribe` - Unsubscribe post

**Other:**
- `GET /user/organizations` - User's org memberships
- `GET /pagestats/{Type}/{Slug}` - Page view stats
- `GET /users/{UserId}/avatar` - User avatar
- `GET /users/by-email` - Find users by email

### 5.6 App/Config Endpoints

- `GET /config` - Tiers, post types, flag types
- `GET /overview` - Top technologies, stacks, users, organizations
- `GET /app-overview` - App configuration overview
- `GET /prerender/{Path}` - Get pre-rendered HTML
- `PUT /prerender/{Path}` - Store pre-rendered HTML

---

## 6. AUTHENTICATION & AUTHORIZATION

### 6.1 GitHub OAuth Setup

**Configuration (appsettings.json):**
```json
{
  "oauth.github.ClientId": "caa869a06686fe01ce36",
  "oauth.github.ClientSecret": "204c907f7df28443564fad0c2bef818077c8517f",
}
```

**ASP.NET Core Identity Setup:**
```csharp
.AddAuthentication()
  .AddGitHub(options => {
    options.ClientId = config["oauth.github.ClientId"];
    options.ClientSecret = config["oauth.github.ClientSecret"];
    options.CallbackPath = "/signin-oidc-github";
  })
  .AddIdentityCookies();
```

**Flow:**
1. User clicks "Sign in with GitHub"
2. Redirects to `/Identity/Account/Login`
3. GitHub OAuth callback to `/signin-oidc-github`
4. Creates/updates `ApplicationUser`
5. Sets authentication cookie
6. Redirects to referring page

### 6.2 Identity Pages (Razor/CSHTML)

Located in `TechStacks/Areas/Identity/Pages/Account/`:
- `Login.cshtml` - Login form
- `Register.cshtml` - Registration
- `ExternalLogin.cshtml` - External provider callback
- `ForgotPassword.cshtml` - Password reset request
- `ResetPassword.cshtml` - Password reset form
- `ConfirmEmail.cshtml` - Email verification
- `ResendEmailConfirmation.cshtml` - Resend verification
- `LoginWithRecoveryCode.cshtml` - Recovery code login
- `LoginWith2fa.cshtml` - Two-factor auth
- `ConfirmEmailChange.cshtml` - Email change confirmation
- `Logout.cshtml` - Logout confirmation
- `AccessDenied.cshtml` - 403 error page

### 6.3 Authorization

**Roles:**
- `Admin` - Full system access
- Default: Regular user

**Attributes:**
- `[ValidateIsAuthenticated]` - Require login
- `[ValidateNotEmpty]` - Require non-empty data
- `[ValidateGreaterThan(0)]` - Number validation

**Access Control:**
- Tech/Stack creation: Authenticated users
- Tech/Stack editing: Owner or Admin
- Organization member management: Owner or Admin
- Post moderation: Organization moderator/owner or Admin

---

## 7. ROUTES & NAVIGATION

### 7.1 Route Definitions (routes.js)

```javascript
{
  homeNews: '/',                          // News/posts home
  homeTop: '/top/',                       // Top technologies
  homeFavorites: '/favorites/',           // User favorites
  homeStacks: '/stacks/',                 // All stacks
  homeTech: '/tech/',                     // All technologies
  newStack: '/stacks/new',                // Create stack
  newTech: '/tech/new',                   // Create technology
  stack: (slug) => `/stacks/${slug}/`,    // Stack detail
  editStack: (slug) => `/stacks/${slug}/edit`,
  tech: (slug) => `/tech/${slug}/`,       // Tech detail
  editTech: (slug) => `/tech/${slug}/edit`,
  organization: (slug) => `/organizations/${slug}`,
  organizationNews: (slug) => `/${slug}`, // Org posts
  post: (id, slug) => `/posts/${id}/${slug}`,
  user: (id) => `/users/${id}`,           // User profile
  authGitHub: '/auth/github',             // GitHub login
}
```

### 7.2 Navigation Structure

**Main Toolbar (default.vue):**
- Logo/Home link
- Home button
- Top (2) - Keyboard shortcut
- Stacks (3) - Keyboard shortcut
- Technologies (4) - Keyboard shortcut
- Favorites (5) - If authenticated
- Sign In - If not authenticated
- User menu - If authenticated

**Keyboard Shortcuts:**
- `1` or `H` - Home
- `2` - Top Technologies
- `3` - Tech Stacks
- `4` - Technologies
- `5` - Favorites (if auth)
- `J` - Jump to organization
- `N` - Create new post
- Arrow keys - Navigate pages

---

## 8. STATE MANAGEMENT (VUEX)

### 8.1 State

```javascript
{
  // Loading & UI
  hasData, loading, showDialog,
  
  // Auth & Session
  sessionInfo,           // Current user
  userActivity,          // User stats
  userOrganizations,    // Org memberships
  userPostActivity,     // Voting history
  userPostCommentVotes, // Comment votes
  
  // Favorites
  favoriteTechnologies,
  favoriteTechStacks,
  
  // Configuration
  allTiers,
  allPostTypes,
  allFlagTypes,
  
  // Data Collections
  allOrganizations,
  allTechnologies,
  allTechStacks,
  technologyTiers,
  
  // Maps (lookup tables)
  technologyMap,        // By slug
  techstacksMap,        // By slug
  userInfoMap,          // By ID
  organizationIdMap,    // By ID
  orgSlugMap,           // Slug to ID
  pageStatsMap,         // View stats
  postsMap,             // By ID
  userKarmaMap,         // By user ID
  
  // Collections
  latestNewsPosts,
  latestOrganizationPosts, // By org ID
  
  // UI State
  hidePostIds,          // Hidden posts (localStorage)
}
```

### 8.2 Key Actions

- `nuxtClientInit` - App initialization
- `loadOverview` - Get overview data
- `loadTechnology` - Load tech details
- `loadTechnologyStack` - Load stack details
- `loadOrganizationBySlug` - Load org with full details
- `latestNewsPosts` - Fetch news posts
- `latestOrganizationPosts` - Fetch org posts
- `addFavorite` / `removeFavorite` - Manage favorites
- `votePost` / `votePostComment` - Vote
- `loadPost` - Load post with comments
- `loadUserPostActivity` - Load user voting history

---

## 9. KEY FEATURES TO PORT

### 9.1 Core Features

1. **Technology Management**
   - List/search/filter technologies by tier
   - View technology details with associated stacks
   - Create/edit technologies (requires auth)
   - Add logo with approval workflow
   - Lock technology (owner/admin)
   - View version history

2. **Tech Stack Management**
   - List/search/filter tech stacks
   - Create/edit stacks (requires auth)
   - Associate technologies with justifications
   - Lock stack (owner/admin)
   - View version history
   - View all stacks that use a technology

3. **Organizations**
   - Create organizations for collaboration
   - Manage organization categories and labels
   - Member management (owners, moderators, regular members)
   - Invite members
   - Technology subscriptions
   - Post type customization per org
   - Organization branding (colors, background, logo, hero image)

4. **Posts & Discussions**
   - Create/edit posts in organizations
   - Multiple post types (Announcement, Post, Showcase, Question, Request)
   - Comment threads with nested replies
   - Vote on posts and comments (up/down)
   - Favorite posts
   - Pin important comments
   - Content moderation (lock, hide, delete)
   - Report inappropriate content
   - Emoji-based reactions (implied)

5. **User Engagement**
   - User profiles with activity
   - Favorited technologies and stacks
   - User karma/reputation system
   - Post voting history tracking
   - Organization subscriptions
   - Email notifications for org/post updates
   - Follow users

6. **Search & Discovery**
   - Technology search with filters
   - Stack search
   - Post search with organization filters
   - Organization directory
   - Top technologies by tier
   - Trending content
   - Category browsing

7. **Social Features**
   - GitHub OAuth login
   - User profiles with avatar
   - Following users
   - User activity stats
   - Community contributions tracking

### 9.2 Admin Features

- User administration
- Content moderation (lock, hide, delete)
- Report management
- Technology logo approval
- Batch operations

---

## 10. API AUTHENTICATION & AUTHORIZATION

### 10.1 Auth Flow

1. **Session-Based (Primary)**
   - User logs in via GitHub OAuth or email/password
   - ASP.NET Core Identity creates authenticated session
   - Cookie set for subsequent requests

2. **JWT Token (Fallback)**
   - For cross-domain requests
   - `ConvertSessionToToken()` converts session to JWT
   - JWT sent in Authorization header

3. **ServiceStack Auth**
   - Integrated with Identity via `IdentityAuth.For<ApplicationUser, ApplicationRole>`
   - Services use `[ValidateIsAuthenticated]` attribute
   - Auto-validates request context

### 10.2 Request Authorization

**Attributes on Services:**
- `[Route(...)]` - Defines HTTP endpoint
- `[Authenticate]` / `[ValidateIsAuthenticated]` - Requires login
- `[Authorize(Roles="Admin")]` - Role-based access
- Verb restrictions: `IGet`, `IPost`, `IPut`, `IDelete`

**Examples:**
```csharp
[ValidateIsAuthenticated]
[Route("/technology", Verbs = "POST")]
public class CreateTechnology : IReturn<CreateTechnologyResponse>, IPost

[Authorize(Roles="Admin")]
[Route("/admin/technology/{TechnologyId}/lock")]
public class LockTech : IReturn<LockStackResponse>, IPut
```

---

## 11. CONFIGURATION & SETTINGS

### 11.1 appsettings.json

```json
{
  "DetailedErrors": true,
  "Logging": { "LogLevel": { "Default": "Information" } },
  "PublicBaseUrl": "https://techstacks.io",
  
  // GitHub OAuth
  "oauth.github.ClientId": "...",
  "oauth.github.ClientSecret": "...",
  
  // Email (SMTP)
  "smtp.Host": "email-smtp.us-east-1.amazonaws.com",
  "smtp.Port": 587,
  "smtp.Bcc": "techstacks@servicestack.net",
  
  // Admin emails
  "NotificationsFromEmail": "notifications@techstacks.io",
  "NotificationsCcEmail": "subscribed@noreply.techstacks.io",
  "SystemToEmail": "demis.bellot@gmail.com",
  
  // JWT
  "jwt.AuthKeyBase64": "..."
}
```

### 11.2 Environment Variables

- `TECHSTACKS_DB` - PostgreSQL connection string
- `GH_CLIENT_ID`, `GH_CLIENT_SECRET` - GitHub OAuth
- `TECHSTACKS_SMTP_USER`, `TECHSTACKS_SMTP_PASS` - Email credentials

---

## 12. BUILD & DEPLOYMENT

### 12.1 npm Scripts

```json
{
  "dev": "nuxt",
  "build": "shx cp wwwroot/css/app.css src/static/css/app.css && nuxt build",
  "ui:dev": "npx tailwindcss@v3 -i ./tailwind.input.css -o ./wwwroot/css/app.css --watch",
  "ui:build": "npx tailwindcss@v3 -i ./tailwind.input.css -o ./wwwroot/css/app.css --minify",
  "dtos": "cd src/shared && x ts && tsc -m ES6 dtos.ts",
  "publish": "nuxt build && dotnet publish -c Release",
  "deploy": "npm run publish && bash deploy.sh"
}
```

### 12.2 .NET Commands

```bash
dotnet run --AppTasks=migrate          # Run migrations
dotnet run --AppTasks=migrate.revert:last
dotnet publish -c Release
```

---

## 13. EXISTING BUGS/ISSUES

Based on code inspection:
- Some components have incomplete implementations
- Middleware/routing may need review for edge cases
- Client-side validation could be more comprehensive

---

## 14. MIGRATION CHECKLIST FOR REACT + VITE + TAILWIND

### High Priority
- [ ] Set up Vite project structure
- [ ] Create React component equivalents for all Vue components
- [ ] Port Vuex store to React Context/Redux or Zustand
- [ ] Configure Tailwind CSS
- [ ] Implement React Router (similar to Nuxt routing)
- [ ] Port all API client calls (gateway.js)
- [ ] Implement GitHub OAuth flow
- [ ] Set up authentication/session management
- [ ] Create reusable UI components (form inputs, buttons, cards)

### Medium Priority
- [ ] Implement all page layouts
- [ ] Port form components with validation
- [ ] Implement modals/dialogs
- [ ] Set up error handling/alerts
- [ ] Implement keyboard shortcuts
- [ ] Add loading states
- [ ] Implement search/filters

### Lower Priority
- [ ] Google Analytics integration
- [ ] Image optimization
- [ ] Performance optimization
- [ ] SEO optimization (meta tags)
- [ ] Accessibility improvements

---

## 15. TOOLS & LIBRARIES IN USE

### Frontend (Current)
- Nuxt 1.4.5
- Vue 2
- Vuetify 1.0
- Tailwind CSS v3
- ServiceStack Client

### Backend (Current)
- .NET Core (ASP.NET Core)
- ServiceStack
- OrmLite
- PostgreSQL
- Entity Framework Core (Identity)
- Markdown processors

### Frontend (Target)
- React 18+
- Vite
- Tailwind CSS v3
- React Router
- React Query or SWR (for API calls)
- Zustand or Context API (for state)

---

## 16. DATABASE

- **Type**: PostgreSQL
- **Connection**: OrmLite (for ServiceStack)
- **Migrations**: Entity Framework Core
- **Location**: Configured via `TECHSTACKS_DB` env var or `appsettings.json`

**Key Tables:**
- Technology, TechnologyHistory
- TechnologyStack, TechnologyStackHistory, TechnologyChoice
- Organization, Category, OrganizationLabel, OrganizationMember, OrganizationMemberInvite, OrganizationSubscription
- Post, PostComment, PostVote, PostCommentVote, PostFavorite, PostReport, PostCommentReport, PostChangeHistory
- UserActivity, UserFavoriteTechnology, UserFavoriteTechnologyStack
- ApplicationUser (ASP.NET Identity)
- PreRender (cached HTML)

