// lib/auth.ts
// Small helper used by server components (like /marketplace/my)
// to get the current logged-in student by calling /api/auth/me.

export type CurrentStudent = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  studentType: string;
  program: string;
  isAdmin: boolean;
} | null;

export async function getCurrentStudent(): Promise<CurrentStudent> {
  try {
    // Relative URL so it works in dev and prod; Next will forward cookies
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/auth/me`,
      {
        cache: "no-store"
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    // api/auth/me is expected to return { student: {...} | null }
    return data.student ?? null;
  } catch (err) {
    console.error("getCurrentStudent error:", err);
    return null;
  }
}
