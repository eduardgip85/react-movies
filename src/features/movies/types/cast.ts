export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type MovieCreditsResponse = {
  cast: CastMember[];
};