# TechStacks: React/Vite/Tailwind Migration Overview

## Executive Summary

**TechStacks** is a comprehensive community platform for discovering and sharing technology stacks. The application is being migrated from Nuxt/Vue to React with Vite and Tailwind CSS, while maintaining the ASP.NET Core backend with ServiceStack.

---

## What You're Building

A full-featured SPA with:
- **23 unique page routes** (technologies, stacks, organizations, posts, profiles)
- **23 reusable Vue components** to convert to React
- **100+ ServiceStack API endpoints** for backend integration
- **Complex state management** with user authentication, voting, favorites, and subscriptions
- **Real-time features**: notifications, member invitations, content reporting

---

## Quick Statistics

| Metric | Count |
|--------|-------|
| Frontend Pages | 20 |
| Vue Components | 23 |
| Service Models (DTOs) | 14+ |
| API Endpoints | 100+ |
| Database Tables | 20+ |
| Core Entities | 8 |
| Post Types | 5 |
| Technology Tiers | 9 |
| User Roles | 2 (Admin, User) |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│          React/Vite Frontend (NEW)              │
│    (Replace Nuxt 1.4.5 + Vue 2 + Vuetify)       │
│  - React Router (replacing Nuxt file routing)   │
│  - Zustand/Context (replacing Vuex)             │
│  - Tailwind CSS (keep as-is)                    │
│  - React Query/SWR (API client)                 │
└────────────────────┬────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────▼────────────────────────────┐
│     .NET Core Backend (UNCHANGED)               │
│                                                  │
│  ServiceStack Framework                         │
│  ├─ TechnologyServices                          │
│  ├─ OrganizationServices                        │
│  ├─ PostServices                                │
│  ├─ UserFavoriteServices                        │
│  └─ Admin Services                              │
│                                                  │
│  ASP.NET Core Identity                          │
│  └─ GitHub OAuth 2.0                            │
└────────────────────┬────────────────────────────┘
                     │ SQL
┌────────────────────▼────────────────────────────┐
│         PostgreSQL Database                     │
│   (20+ tables, OrmLite mapped)                  │
└─────────────────────────────────────────────────┘
```

---

## Core Features Overview

### 1. Technology Management
- Search/filter technologies by tier
- View technology details
- Associate with tech stacks
- Admin: create, edit, delete, lock, approve logos
- Version history tracking

### 2. Tech Stack Management  
- Create and share tech stacks
- Search and filter
- Add technologies with justifications
- View previous versions
- Popularity metrics (views, favorites)

### 3. Organizations (Communities)
- Create collaborative spaces
- Organize posts by categories
- Role-based members (owner, moderator, member)
- Custom post types and labels
- Branded appearance (colors, logo, hero image)
- Member invitations and subscriptions
- Post notifications with frequency control

### 4. Posts & Discussions
- 5 post types: Announcement, Post, Showcase, Question, Request
- Comment threads with nesting
- Up/down voting on posts and comments
- Pin important comments
- Report inappropriate content
- Moderation: lock, hide, delete
- Favorites with statistics

### 5. User Engagement
- GitHub OAuth authentication
- User profiles with activity stats
- Reputation/Karma system
- Favorite technologies and stacks
- Organization memberships
- Post voting history
- Email subscriptions and notifications

### 6. Search & Discovery
- Technology search with 9 tier filters
- Tech stack search
- Post search with org/category filters
- Directory of organizations
- Top content by tier
- Category browsing

---

## Database Schema Highlights

### Core Tables

**Technology & Stack**
- `Technology` - Individual tech (9 tiers)
- `TechnologyStack` - Custom tech combinations
- `TechnologyChoice` - N:M relationship
- `TechnologyHistory`, `TechnologyStackHistory` - Audit trail

**Organization**
- `Organization` - Community spaces
- `Category` - Post categories within org
- `OrganizationLabel` - Custom labels for posts
- `OrganizationMember` - Role assignments
- `OrganizationMemberInvite` - Pending invites
- `OrganizationSubscription` - Email subscriptions

**Posts & Comments**
- `Post` - Main content (5 types)
- `PostComment` - Thread replies
- `PostVote`, `PostCommentVote` - User votes
- `PostFavorite` - User favorites
- `PostReport`, `PostCommentReport` - Flagged content
- `PostChangeHistory` - Edit audit trail

**Users**
- `ApplicationUser` - ASP.NET Identity + OAuth
- `UserActivity` - Stats (karma, counts)
- `UserFavoriteTechnology`, `UserFavoriteTechnologyStack` - Favorites
- `PreRender` - Cached HTML pages

---

## API Endpoints by Domain

### Technologies (8 endpoints)
```
GET    /technology/search
GET    /technology/query  
GET    /technology/{slug}
GET    /technology/{slug}/previous-versions
GET    /technology/{slug}/favorites
POST   /technology
PUT    /technology/{id}
DELETE /technology/{id}
```

### Tech Stacks (8 endpoints)
```
GET    /techstacks/search
GET    /techstacks/query
GET    /techstacks/{slug}
GET    /techstacks/{slug}/previous-versions
GET    /techstacks/{slug}/favorites
POST   /techstacks
PUT    /techstacks/{id}
DELETE /techstacks/{id}
```

### Organizations (25+ endpoints)
```
GET    /organizations/{slug}
GET    /orgs/{id}
GET    /orgs/{id}/admin
POST   /orgs
PUT    /orgs/{id}
DELETE /orgs/{id}
GET    /orgs/{id}/members
POST   /orgs/{id}/members
PUT    /orgs/{id}/members/{id}
DELETE /orgs/{id}/members/{userid}
GET    /orgs/{id}/categories
POST   /orgs/{id}/categories
PUT    /orgs/{id}/categories/{id}
DELETE /orgs/{id}/categories/{id}
GET    /orgs/{id}/labels
POST   /orgs/{id}/labels
DELETE /orgs/{id}/labels/{slug}
+ more...
```

### Posts & Comments (20+ endpoints)
```
GET    /posts
GET    /posts/{id}
POST   /posts
PUT    /posts/{id}
DELETE /posts/{id}
PUT    /posts/{id}/vote
PUT    /posts/{id}/favorite
PUT    /posts/{id}/report
PUT    /posts/{id}/lock
PUT    /posts/{id}/hide
POST   /posts/{id}/comments
PUT    /posts/{id}/comments/{id}
DELETE /posts/{id}/comments/{id}
PUT    /posts/{id}/comments/{id}/vote
PUT    /posts/{id}/comments/{id}/pin
PUT    /posts/{id}/comments/{id}/report
+ query/search variants...
```

### Users (15+ endpoints)
```
GET    /my-session
GET    /my-feed
GET    /userinfo/{id}
GET    /user/organizations
GET    /user/posts/activity
PUT    /favorites/technology/{id}
DELETE /favorites/technology/{id}
PUT    /favorites/techtacks/{id}
DELETE /favorites/techtacks/{id}
PUT    /orgs/{id}/subscribe
DELETE /orgs/{id}/subscribe
PUT    /posts/{id}/subscribe
DELETE /posts/{id}/subscribe
+ more...
```

### App Config (4 endpoints)
```
GET    /config
GET    /overview
GET    /app-overview
GET/PUT /prerender/{path}
```

---

## Key Frontend Components to Port

### Layout
- `default.vue` → Main navigation layout with toolbar

### Pages (Routes)
- Home/News (index.vue)
- Top Technologies (top/index.vue)
- Favorites (favorites/index.vue)
- Technologies List + Detail + Create/Edit (tech/*)
- Tech Stacks List + Detail + Create/Edit (stacks/*)
- Organizations List + Detail (organizations/*)
- Posts List + Detail (posts/*)
- User Profile (users/_id.vue)
- Login Handler (login/_provider.vue)

### Components (Conversion Priority)

**High Priority (Core Functionality):**
1. `TechnologyEdit.vue` - Form for tech creation/edit
2. `TechStackEdit.vue` - Form for stack creation/edit
3. `OrganizationEdit.vue` - Org management form
4. `PostEdit.vue` - Post creation/editing
5. `PostsList.vue` - Paginated post list
6. `PostComments.vue` - Comment threading
7. `OrganizationAdd.vue` - Org creation
8. `MemberEdit.vue` - Member management

**Medium Priority (Important Features):**
9. `PostComment.vue` - Single comment display
10. `OrganizationInfo.vue` - Org details display
11. `MembersInfo.vue` - Members list
12. `CategoryEdit.vue` - Category management
13. `LabelEdit.vue` - Label management
14. `ReportDialog.vue` - Content reporting
15. `CommentEdit.vue` - Comment editing

**Lower Priority (Utilities):**
16. `FileInput.vue` - File upload
17. `Shortcuts.vue` - Keyboard shortcuts help
18. `DebugInfo.vue` - Debug information
19. `NewsPosts.vue` - News feed
20. `PostInfo.vue` - Post details display
21. `PostAlerts.vue` - Alerts/notifications
22. `TechnologyComments.vue` - Tech discussions
23. `TechnologyPost.vue` - Tech-related posts

---

## State Management to Port

### Current: Vuex Store
```javascript
State: 
  - sessionInfo (current user)
  - loading, hasData flags
  - technologyMap, techstacksMap, postsMap
  - favoriteTechnologies, favoriteTechStacks
  - userActivity, userOrganizations
  - allOrganizations, allTechnologies, allTechStacks
  - latestNewsPosts, latestOrganizationPosts
  - userPostActivity, userPostCommentVotes

Actions: 
  - nuxtClientInit (app init)
  - loadTechnology, loadTechnologyStack
  - loadOrganizationBySlug
  - latestNewsPosts, latestOrganizationPosts
  - addFavorite, removeFavorite
  - votePost, votePostComment
  - loadPost, loadUserPostActivity
  
Getters:
  - isAuthenticated, isAdmin
  - user, userId, userName
  - favoriteTechnologies, favoriteTechStacks
  - organization, organizationMembers
  - getPageStats, getUserInfo
```

### Target: Zustand or Context API
- Need to maintain same state structure
- Similar action/dispatch pattern
- Can optimize with React Query for API caching

---

## Authentication Flow

### GitHub OAuth
1. User clicks "Sign in with GitHub"
2. Redirected to `/Identity/Account/Login`
3. GitHub callback to `/signin-oidc-github`
4. ApplicationUser created/updated
5. Authentication cookie set
6. Redirected to return URL
7. `GET /my-session` fetches session info
8. User object populated in store

### Session Management
- Server: ASP.NET Core Identity cookie
- Client: Fetch session on app load
- Maintain isAuthenticated flag in state
- Token conversion for cross-domain (JWT fallback)

---

## Keyboard Shortcuts

Current implementation to port:
```
1/H    → Home
2      → Top Technologies  
3      → Tech Stacks
4      → Technologies
5      → Favorites (if authenticated)
J      → Jump to organization selector
N      → Create new post
←/→    → Navigate pages
ESC    → Close dialogs
```

---

## Performance Considerations

### Caching Strategy
- Use React Query with stale-while-revalidate
- Cache API responses by endpoint
- Implement localStorage for UI state
- Consider pagination (default limit: 50 posts)

### Bundle Optimization
- Code-split by route
- Tree-shake unused components
- Optimize image assets
- Lazy load heavy components (markdown editor, etc.)

### API Optimization
- Batch user karma requests
- Selective field loading with `include` parameter
- Post pagination (POSTS_PER_PAGE = configurable)
- Cache organization/technology lookups

---

## Common Patterns to Implement

### URL Routing
From `routes.js`:
```javascript
/                              - Home/News
/top/                          - Top technologies
/favorites/                    - User favorites
/tech/                         - Technologies list
/tech/new                      - Create technology
/tech/{slug}/                  - Technology detail
/tech/{slug}/edit              - Edit technology
/stacks/                       - Tech stacks list
/stacks/new                    - Create stack
/stacks/{slug}/                - Stack detail
/stacks/{slug}/edit            - Edit stack
/organizations/{slug}          - Organization detail
/{slug}                        - Organization posts (homepage)
/{slug}/{category}             - Category posts view
/posts/{id}/{slug}             - Post detail
/comments/{postid}/{id}        - Comment detail
/users/{id}                    - User profile
/login/{provider}              - OAuth callback
```

### Form Patterns
- Validation on blur and submit
- Error display inline
- Success notifications
- Loading states during submission
- Image/file upload handling

### Post/Comment Voting
```javascript
weight: 1   → Up vote
weight: -1  → Down vote  
weight: 0   → Remove vote
```

### Organization Permissions
```javascript
isOwner       → Full control
isModerator   → Post moderation
Regular       → Create posts, comment
DenyAll       → No content access
DenyPosts     → Cannot post
DenyComments  → Cannot comment
```

---

## Critical Backend Integrations

### DTOs & Types
Generated from `TechStacks.ServiceModel`:
- Request DTOs for all operations
- Response DTOs with status codes
- Entity types with enums
- Custom validators with error messages

### Error Handling
- ResponseStatus object on all responses
- Error codes and messages from server
- Exception handling in API client
- Validation error display

### Timestamps & Dates
- ISO8601 format (configured in appsettings)
- Created/Modified/LastModified tracking
- User attribution (CreatedBy, ModifiedBy)
- DateTime comparison for soft deletes

---

## Testing Strategy

### Unit Tests
- Component rendering
- State management
- Utility functions

### Integration Tests
- API client calls
- Form submission flows
- Authentication flows

### E2E Tests
- User workflows (create tech → vote → comment)
- Navigation flows
- Permission checks

---

## Deployment Checklist

- [ ] Build optimization
- [ ] Environment variables configured
- [ ] GitHub OAuth credentials
- [ ] API base URL configuration
- [ ] Production API keys
- [ ] Database migrations complete
- [ ] Error logging setup
- [ ] Analytics configured
- [ ] Static asset CDN (if needed)
- [ ] Security headers
- [ ] CORS configuration
- [ ] Performance monitoring

---

## Files Saved for Reference

- `/CODEBASE_ANALYSIS.md` - Comprehensive 16-section technical analysis
- `/MIGRATION_OVERVIEW.md` - This file

---

## Next Steps

1. **Set up Vite project** with React template
2. **Configure Tailwind CSS** with existing design tokens
3. **Port authentication** (GitHub OAuth integration)
4. **Create API client** wrapper for ServiceStack
5. **Build state management** (Zustand/Context)
6. **Port core pages** (Home, Technologies, Stacks)
7. **Create form components** (reusable across pages)
8. **Implement post system** (CRUD + voting + comments)
9. **Organization management** (create, members, roles)
10. **Testing & optimization**

---

## Questions to Address

1. State management library preference? (Zustand vs Context vs Redux)
2. Form library? (React Hook Form vs Formik)
3. UI component library? (Build custom with Tailwind vs headless UI)
4. Data fetching? (React Query vs SWR vs vanilla fetch)
5. Testing framework? (Vitest vs Jest vs Playwright)
6. Deployment platform? (Same AWS LightSail vs other)

---

## References

- **Backend API**: OpenAPI/Swagger available at `/swagger-ui/`
- **Database**: PostgreSQL with OrmLite ORM
- **Authentication**: ASP.NET Core Identity with GitHub OAuth 2.0
- **API Documentation**: Available in `TechStacks.ServiceModel` DTOs

