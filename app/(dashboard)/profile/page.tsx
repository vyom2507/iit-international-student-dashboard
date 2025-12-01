// app/(dashboard)/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

type StudentProfile = {
  id: string;
  fullName: string;
  email: string;
  studentType: string;
  program: string;
  avatarUrl: string | null;
  isAdmin?: boolean;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [fullName, setFullName] = useState("");
  const [program, setProgram] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to load profile.");
          return;
        }
        const student = data.student as StudentProfile;
        setProfile(student);
        setFullName(student.fullName);
        setProgram(student.program);
        setAvatarPreview(student.avatarUrl || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatarToCloudinary = async (): Promise<string | null> => {
    if (!avatarFile) return profile?.avatarUrl || null;
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      console.error("Missing Cloudinary env vars");
      return profile?.avatarUrl || null;
    }

    const formData = new FormData();
    formData.append("file", avatarFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error("Cloudinary upload error:", data);
      setError("Failed to upload profile image.");
      return profile?.avatarUrl || null;
    }

    return data.secure_url as string;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName || !program) {
      setError("Full name and program are required.");
      return;
    }

    setSaving(true);
    try {
      const avatarUrl = await uploadAvatarToCloudinary();

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          program,
          avatarUrl
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile.");
      }

      setProfile(data.student);
      setSuccess("Profile updated successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-200">Loading profile…</p>;
  }

  if (!profile) {
    return (
      <p className="text-sm text-red-300">
        Could not load profile. Please log in again.
      </p>
    );
  }

  return (
    <div className="max-w-xl space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
          Profile
        </p>
        <h1 className="mt-1 text-xl font-semibold text-slate-50">
          Your IIT student profile
        </h1>
        <p className="text-xs text-slate-400">
          Keep your name, program, and profile photo up to date so your
          experience across the dashboard feels personal.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="space-y-4 rounded-2xl bg-slate-950/80 p-4 ring-1 ring-slate-800"
      >
        {error && (
          <div className="rounded-lg border border-red-500/60 bg-red-950/50 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-lg border border-emerald-500/60 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-100">
            {success}
          </div>
        )}

        {/* Avatar */}
        <div className="flex items-center gap-3">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-red-500/70"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-400">
              No photo
            </div>
          )}
          <div className="flex-1 text-[11px] text-slate-300">
            <label className="mb-1 block text-[11px] font-semibold text-slate-200">
              Profile photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block w-full text-[11px] text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:text-[11px] file:font-semibold file:text-white hover:file:bg-red-500"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              A clear, square image works best (e.g., 400×400).
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-slate-200">
            Full name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Email (read-only) */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-slate-200">
            IIT email
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-400"
          />
        </div>

        {/* Student type (read-only for now) */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-slate-200">
            Student type
          </label>
          <input
            value={profile.studentType}
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-400"
          />
        </div>

        {/* Program */}
        <div className="space-y-1">
          <label className="block text-[11px] font-semibold text-slate-200">
            Program / Major
          </label>
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-red-900/40 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {saving ? "Saving changes…" : "Save profile"}
        </button>
      </form>
    </div>
  );
}
