export interface CrewMember {
  adult: boolean;                 // Whether the person is marked as adult content
  gender: number;                 // 0 = unknown, 1 = female, 2 = male
  id: number;                     // Unique TMDB person ID
  known_for_department: string;   // Main department they are known for (e.g., "Production")
  name: string;                    // Display name
  original_name: string;           // Original name
  popularity: number;              // Popularity score
  profile_path: string | null;     // Path to profile image, nullable
  credit_id: string;               // Unique credit ID
  department: string;              // Department for this movie
  job: string;                     // Job title for this movie
}
