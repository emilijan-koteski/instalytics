import JSZip from 'jszip';
import type { FollowersData, FollowingData } from '../types/instagram.types';

export interface ParsedInstagramData {
  followers: FollowersData;
  following: FollowingData;
}

export const parseInstagramZip = async (file: File): Promise<ParsedInstagramData> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    
    // Find the followers and following JSON files
    const followersFile = zipContent.file(/followers_1\.json$/i)?.[0];
    const followingFile = zipContent.file(/following\.json$/i)?.[0];
    
    if (!followersFile || !followingFile) {
      throw new Error('Required Instagram data files not found in zip. Please ensure you have followers and following JSON files.');
    }
    
    // Read and parse the JSON files
    const followersContent = await followersFile.async('text');
    const followingContent = await followingFile.async('text');
    
    const followers: FollowersData = JSON.parse(followersContent);
    const following: FollowingData = JSON.parse(followingContent);
    
    return {
      followers,
      following,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse Instagram data: ${error.message}`);
    } else {
      throw new Error('Failed to parse Instagram data: Unknown error occurred');
    }
  }
};