const production = process.env.NODE_ENV === 'production';


export const SITE_URL = production ? "coursemonk.vercel.app" : "http://localhost:3000";




//prod-url