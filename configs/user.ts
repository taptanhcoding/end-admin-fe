export interface userData {
    firstName?: string ,
    lastName?: string ,
    fullname?:string,
    username?: string ,
    phoneNumber?: string ,
    address?: string ,
    email?: string ,
    birthday?: string ,
    coverImgUrl?: string 
  }

export interface userState {
  data : userData,
  isLogin :boolean
}