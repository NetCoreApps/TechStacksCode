import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
    getConfig,
    getOverview,
    getSessionInfo,
    getUserOrganizations,
    getUserPostActivity,
    getUserFeed,
    getTechnologyTiers,
} from '../services/api';

const statsKey = (type, slug) => `${type}:${slug}`;

// Helper function to update votes
const updateVotes = (userVotes, id, weight) => {
    let upVotes = 0;
    let downVotes = 0;
    const isUp = weight > 0;
    const isDown = weight < 0;
    const unVote = weight === 0;

    if (userVotes != null) {
        const upVotedIndex = userVotes.upVoted.indexOf(id);
        const downVotedIndex = userVotes.downVoted.indexOf(id);

        if (upVotedIndex >= 0) {
            if (isDown || unVote) {
                userVotes.upVoted.splice(upVotedIndex, 1);
                if (isDown) downVotes++;
                if (unVote) upVotes--;
            }
        } else {
            if (isUp) {
                userVotes.upVoted.push(id);
                upVotes++;
            }
        }

        if (downVotedIndex >= 0) {
            if (isUp || unVote) {
                userVotes.downVoted.splice(downVotedIndex, 1);
                if (isUp) upVotes++;
                if (unVote) downVotes--;
            }
        } else {
            if (isDown) {
                userVotes.downVoted.push(id);
                downVotes++;
            }
        }
    }
    return { upVotes, downVotes };
};

const useAppStore = create(
    devtools((set, get) => ({
        // State
        hasData: false,
        loading: false,
        sessionInfo: null,
        sessionFeed: null,
        userActivity: null,
        userOrganizations: null,
        favoriteTechnologies: [],
        favoriteTechStacks: [],
        allTiers: [],
        allPostTypes: [],
        allFlagTypes: [],
        overview: {},
        organization: null,
        allOrganizations: [],
        orgSlugMap: {},
        organizationIdMap: {},
        allTechnologies: [],
        allTechnologiesTotal: 0,
        allTechStacks: [],
        allTechStacksTotal: 0,
        technologyMap: {},
        techstacksMap: {},
        pageStatsMap: {},
        userInfoMap: {},
        postsMap: {},
        userKarmaMap: {},
        hidePostIds: JSON.parse(localStorage.getItem('hidePostIds') || '[]'),
        latestOrganizationPosts: {},
        latestOrganizationPostsQuery: {},
        latestNewsPosts: [],
        technologyTiers: [],
        userPostActivity: null,
        userPostCommentVotes: null,
        showDialog: false,

        // Mutations (setters)
        setHasData: (hasData) => set({ hasData }),
        setLoading: (loading) => set({ loading }),
        setShowDialog: (showDialog) => set({ showDialog }),

        setSessionInfo: (sessionInfo) => {
            set({
                sessionInfo,
                favoriteTechnologies: sessionInfo?.favoriteTechnologies || [],
                favoriteTechStacks: sessionInfo?.favoriteTechStacks || [],
                userActivity: sessionInfo?.userActivity,
                userOrganizations: sessionInfo ? {
                    members: sessionInfo.members,
                    memberInvites: sessionInfo.memberInvites,
                    subscriptions: sessionInfo.subscriptions,
                } : null,
            });
        },

        setSessionFeed: (sessionFeed) => set({ sessionFeed }),

        setUserOrganizations: (userOrganizations) => set({ userOrganizations }),

        setUserPostActivity: (userPostActivity) => {
            set({
                userPostActivity: {
                    upVoted: userPostActivity.upVotedPostIds || [],
                    downVoted: userPostActivity.downVotedPostIds || [],
                    favorited: userPostActivity.favoritePostIds || [],
                },
            });
        },

        setUserPostCommentVotes: (userPostCommentVotes) => {
            set({
                userPostCommentVotes: {
                    upVoted: userPostCommentVotes.upVotedCommentIds || [],
                    downVoted: userPostCommentVotes.downVotedCommentIds || [],
                },
            });
        },

        setConfig: (config) => {
            set({
                allTiers: config.allTiers,
                allPostTypes: config.allPostTypes,
                allFlagTypes: config.allFlagTypes,
            });
        },

        setOverview: (overview) => {
            const orgSlugMap = {};
            for (const org of overview.allOrganizations) {
                orgSlugMap[org.slug] = org.id;
            }
            set({
                overview,
                allOrganizations: overview.allOrganizations,
                orgSlugMap,
            });
        },

        setOrganization: (organizationResponse) => {
            const organization = organizationResponse.organization;
            organization.owners = organizationResponse.owners;
            organization.moderators = organizationResponse.moderators;
            organization.labels = organizationResponse.labels;
            organization.categories = organizationResponse.categories;
            organization.membersCount = organizationResponse.membersCount;
            organization.full = true;

            set((state) => ({
                organization,
                organizationIdMap: {
                    ...state.organizationIdMap,
                    [organization.id]: organization,
                },
            }));
        },

        setOrgById: (orgId) => {
            const state = get();
            const org = state.organizationIdMap[orgId] || state.allOrganizations.find(x => x.id === orgId);
            set({ organization: org });
        },

        setOrgBySlug: (slug) => {
            const state = get();
            const orgInfo = state.allOrganizations.find(x => x.slug === slug);
            if (orgInfo) {
                const org = state.organizationIdMap[orgInfo.id];
                set({ organization: org });
            }
        },

        setAllTechnologies: (allTechnologies) => {
            set({
                allTechnologies: allTechnologies.results,
                allTechnologiesTotal: allTechnologies.total,
            });
        },

        setAllTechStacks: (allTechStacks) => {
            set({
                allTechStacks: allTechStacks.results,
                allTechStacksTotal: allTechStacks.total,
            });
        },

        setTechnology: (technology) => {
            set((state) => ({
                technologyMap: {
                    ...state.technologyMap,
                    [technology.slug]: technology,
                },
            }));
        },

        setTechnologyStack: (techstack) => {
            set((state) => ({
                techstacksMap: {
                    ...state.techstacksMap,
                    [techstack.slug]: techstack,
                },
            }));
        },

        setPageStats: (pageStats) => {
            set((state) => ({
                pageStatsMap: {
                    ...state.pageStatsMap,
                    [statsKey(pageStats.type, pageStats.slug)]: pageStats,
                },
            }));
        },

        setUserInfo: (userInfo) => {
            set((state) => ({
                userInfoMap: {
                    ...state.userInfoMap,
                    [userInfo.id]: userInfo,
                },
            }));
        },

        setPost: (post) => {
            set((state) => ({
                postsMap: {
                    ...state.postsMap,
                    [post.id]: post,
                },
            }));
        },

        setUsersKarma: (usersKarma) => {
            set((state) => ({
                userKarmaMap: {
                    ...state.userKarmaMap,
                    ...usersKarma,
                },
            }));
        },

        setTechnologyTiers: (technologyTiers) => set({ technologyTiers }),

        setLatestNewsPosts: (latestNewsPosts) => set({ latestNewsPosts }),

        setLatestOrganizationPosts: (organizationId, posts) => {
            set((state) => ({
                latestOrganizationPosts: {
                    ...state.latestOrganizationPosts,
                    [organizationId]: posts,
                },
            }));
        },

        setLatestOrganizationPostsQuery: (query) => {
            set({ latestOrganizationPostsQuery: query });
        },

        hidePost: (postId) => {
            const state = get();
            const newHidePostIds = [...state.hidePostIds, postId];
            localStorage.setItem('hidePostIds', JSON.stringify(newHidePostIds));
            set({ hidePostIds: newHidePostIds });
        },

        votePost: (postId, weight) => {
            const state = get();
            const { upVotes, downVotes } = updateVotes(state.userPostActivity, postId, weight);

            // Update all posts with this ID
            const updatePost = (post) => {
                if (post.id === postId) {
                    post.upVotes += upVotes;
                    post.downVotes += downVotes;
                    post.points += upVotes + downVotes;
                }
            };

            // Update in latestOrganizationPosts
            const newLatestOrganizationPosts = { ...state.latestOrganizationPosts };
            for (let orgId in newLatestOrganizationPosts) {
                newLatestOrganizationPosts[orgId] = newLatestOrganizationPosts[orgId].map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            upVotes: post.upVotes + upVotes,
                            downVotes: post.downVotes + downVotes,
                            points: post.points + upVotes + downVotes,
                        };
                    }
                    return post;
                });
            }

            // Update in latestNewsPosts
            const newLatestNewsPosts = state.latestNewsPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        upVotes: post.upVotes + upVotes,
                        downVotes: post.downVotes + downVotes,
                        points: post.points + upVotes + downVotes,
                    };
                }
                return post;
            });

            // Update in postsMap
            const newPostsMap = { ...state.postsMap };
            if (newPostsMap[postId]) {
                newPostsMap[postId] = {
                    ...newPostsMap[postId],
                    upVotes: newPostsMap[postId].upVotes + upVotes,
                    downVotes: newPostsMap[postId].downVotes + downVotes,
                    points: newPostsMap[postId].points + upVotes + downVotes,
                };
            }

            set({
                latestOrganizationPosts: newLatestOrganizationPosts,
                latestNewsPosts: newLatestNewsPosts,
                postsMap: newPostsMap,
            });
        },

        votePostComment: (postId, commentId, weight) => {
            const state = get();
            const { upVotes, downVotes } = updateVotes(state.userPostCommentVotes, commentId, weight);

            // Update comment votes in posts
            const updateCommentInPost = (post) => {
                if (post.id === postId && post.comments) {
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if (comment.id === commentId) {
                                return {
                                    ...comment,
                                    upVotes: comment.upVotes + upVotes,
                                    downVotes: comment.downVotes + downVotes,
                                };
                            }
                            return comment;
                        }),
                    };
                }
                return post;
            };

            // Update in postsMap
            const newPostsMap = { ...state.postsMap };
            if (newPostsMap[postId]) {
                newPostsMap[postId] = updateCommentInPost(newPostsMap[postId]);
            }

            set({ postsMap: newPostsMap });
        },

        favoritePost: (postId) => {
            const state = get();
            if (state.userPostActivity && state.userPostActivity.favorited) {
                const hadFavPos = state.userPostActivity.favorited.indexOf(postId);
                const newFavorited = [...state.userPostActivity.favorited];
                if (hadFavPos >= 0) {
                    newFavorited.splice(hadFavPos, 1);
                } else {
                    newFavorited.push(postId);
                }
                set({
                    userPostActivity: {
                        ...state.userPostActivity,
                        favorited: newFavorited,
                    },
                });
            }
        },

        addFavoriteTechnology: (tech) => {
            set((state) => ({
                favoriteTechnologies: [...state.favoriteTechnologies, tech],
            }));
        },

        removeFavoriteTechnology: (id) => {
            set((state) => ({
                favoriteTechnologies: state.favoriteTechnologies.filter(x => x.id !== id),
            }));
        },

        addFavoriteTechStack: (stack) => {
            set((state) => ({
                favoriteTechStacks: [...state.favoriteTechStacks, stack],
            }));
        },

        removeFavoriteTechStack: (id) => {
            set((state) => ({
                favoriteTechStacks: state.favoriteTechStacks.filter(x => x.id !== id),
            }));
        },

        // Actions (async operations)
        loadConfig: async () => {
            const config = await getConfig();
            get().setConfig(config);
        },

        loadOverview: async () => {
            const overview = await getOverview();
            get().setOverview(overview);
        },

        loadSessionInfo: async () => {
            const sessionInfo = await getSessionInfo();
            get().setSessionInfo(sessionInfo);
            if (sessionInfo) {
                const [userOrganizations, userPostActivity, sessionFeed] = await Promise.all([
                    getUserOrganizations(),
                    getUserPostActivity(),
                    getUserFeed(),
                ]);
                get().setUserOrganizations(userOrganizations);
                get().setUserPostActivity(userPostActivity);
                get().setSessionFeed(sessionFeed);
            }
        },

        loadTechnologyTiers: async () => {
            const tiers = await getTechnologyTiers();
            get().setTechnologyTiers(tiers);
        },

        // Getters (computed values)
        getters: {
            isAuthenticated: () => get().sessionInfo != null,
            isAdmin: () => {
                const sessionInfo = get().sessionInfo;
                return sessionInfo && (sessionInfo.roles || []).indexOf("Admin") >= 0;
            },
            userId: () => {
                const sessionInfo = get().sessionInfo;
                return sessionInfo?.userAuthId ? parseInt(sessionInfo.userAuthId) : null;
            },
            userName: () => get().sessionInfo?.userName,
            isFavoriteTechnology: (slug) => {
                return get().favoriteTechnologies.some(x => x.slug === slug);
            },
            isFavoriteTechStack: (slug) => {
                return get().favoriteTechStacks.some(x => x.slug === slug);
            },
            getOrganizationId: (slug) => get().orgSlugMap[slug],
            getOrganizationSlug: (orgId) => {
                return (get().allOrganizations.find(x => x.id === orgId) || {}).slug;
            },
            getOrganization: (orgId) => {
                const state = get();
                return state.organizationIdMap[orgId] || state.allOrganizations.find(x => x.id === orgId);
            },
            getTechnology: (slug) => get().technologyMap[slug],
            getTechnologyStack: (slug) => get().techstacksMap[slug],
            getPageStats: (type, slug) => get().pageStatsMap[statsKey(type, slug)],
            getUserInfo: (id) => get().userInfoMap[id],
            getPost: (id) => get().postsMap[id],
            isOrganizationModerator: () => {
                const state = get();
                const org = state.organization;
                const userId = get().getters.userId();
                if (get().getters.isAdmin()) return true;
                if (!org || !org.members || !userId) return false;
                const member = org.members.find(x => x.userId === userId);
                return member?.isModerator || false;
            },
            isOrganizationOwner: () => {
                const state = get();
                const org = state.organization;
                const userId = get().getters.userId();
                if (get().getters.isAdmin()) return true;
                if (!org || !org.members || !userId) return false;
                const member = org.members.find(x => x.userId === userId);
                return member?.isOwner || false;
            },
        },
    }))
);

export default useAppStore;
