interface workerCRUD {
  signup: ( resource: {mobileToken?: any; emailToken?: any; myRefId?: any; password: any; email?: any; mobile?: any} ) => Promise<object>,
  verifyAccount: (resource: { mobileToken: any; emailToken: any }) => Promise<any>,
  updateById: (resourceId: any) => Promise<string>,
  resendToken: (userId: string) => Promise<any>,
  login: (resourceId: any) => Promise<string>,
  updateProfile: (resourceId: any) => Promise<string>,
  getWorker: (resourceId: any) => Promise<string>,
  forgotPassword: (resourceId: any) => Promise<string>,
  resetPassword: (resourceId: any) => Promise<string>,
  googleDetails: (resourceId: any) => Promise<string>,
  getGoogleURL: (resourceId: any) => Promise<string>,
}