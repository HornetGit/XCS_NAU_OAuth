// shared/types/auth.d.ts
declare module '#auth-utils' {
  interface User {
    // Add your own fields
    id: integer;
    name: string;
  }

  interface UserSession {
    // Add your own fields
    lastLoggedIn: Date;

  }

  interface SecureSessionData {
    // Add your own fields
    // apiKey : string
  }
}

export {}