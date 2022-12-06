export const baseUrl = new URL("","http://localhost:5000/");
//-------------------------------------------------------------------------
export const urlRegistration = new URL("api/user/registration", baseUrl);
export const urlLogin       =  new URL("api/user/login", baseUrl);
export const urlCheck       =  new URL("api/user/auth", baseUrl);
//--------------------------------------------------------------------------
export const urlType       =    new URL("api/type",baseUrl);
//--------------------------------------------------------------------------
export const urlBrand     =     new URL("api/brand", baseUrl);
//--------------------------------------------------------------------------
export const createDeviceURL =  new URL("api/device", baseUrl);
export const deviceURLWithSerchPar = new URL("api/device", baseUrl);


