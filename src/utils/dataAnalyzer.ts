import type { FollowersData, FollowingData, NonFollower, AnalysisResult, InstagramUser } from '../types/instagram.types';

export const analyzeInstagramData = (followers: FollowersData, following: FollowingData): AnalysisResult => {
  try {
    // Extract follower usernames into a Set for fast lookup
    const followerUsernames = new Set<string>();
    
    // Process followers data - it's an array of items with string_list_data
    followers.forEach(item => {
      item.string_list_data.forEach(user => {
        followerUsernames.add(user.value);
      });
    });
    
    // Extract following data and find non-followers
    const nonFollowers: NonFollower[] = [];
    const followingUsers: InstagramUser[] = [];
    
    // Process following data - it has relationships_following array
    following.relationships_following.forEach(item => {
      item.string_list_data.forEach(user => {
        followingUsers.push(user);
        
        // If this user is not in our followers set, they don't follow us back
        if (!followerUsernames.has(user.value)) {
          nonFollowers.push({
            username: user.value,
            profileUrl: user.href,
            followedDate: new Date(user.timestamp * 1000), // Convert Unix timestamp to Date
          });
        }
      });
    });
    
    // Sort non-followers by follow date (most recent first)
    nonFollowers.sort((a, b) => b.followedDate.getTime() - a.followedDate.getTime());
    
    return {
      nonFollowers,
      totalNonFollowers: nonFollowers.length,
      totalFollowing: followingUsers.length,
      totalFollowers: followerUsernames.size,
    };
  } catch (error) {
    console.error('Error analyzing Instagram data:', error);
    throw new Error('Failed to analyze Instagram data. Please check your data format.');
  }
};