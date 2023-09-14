export interface IActivity{
  id: string;
  title: string;
  description: string;
  category: string ;
  date : Date;
  city: string;
  venue: string;
  hostId?: string;
  status: number;
  hostName?: string;
  avatar?: string;
  members?: MemberJoinInfo[];
}

export interface MemberJoinInfo {
  userId: string;
  displayName: string;
  avatar: string;
  followers: string[];
}