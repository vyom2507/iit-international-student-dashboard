"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STUDENT_TYPES = [
  "Undergraduate",
  "Graduate",
  "Exchange",
  "Visiting Scholar",
  "Other"
];

// Read Cloudinary config from env (must start with NEXT_PUBLIC_)
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [studentType, setStudentType] = useState("");
  const [program, setProgram] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatarToCloudinary = async (): Promise<string | null> => {
    if (!avatarFile) return null;
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      console.error("Missing Cloudinary env vars");
      return null;
    }

    setAvatarUploading(true);
    try {
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
        setError("Failed to upload profile image. Please try again.");
        return null;
      }

      return data.secure_url as string;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      setError("Failed to upload profile image. Please try again.");
      return null;
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password || !studentType || !program) {
      setError(
        "Full name, email, password, student type, and program are required."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // 1) Upload avatar if selected
      let avatarUrl: string | null = null;
      if (avatarFile) {
        avatarUrl = await uploadAvatarToCloudinary();
        if (!avatarUrl) {
          // upload failed and error already set
          setLoading(false);
          return;
        }
      }

      // 2) Call your register API with avatarUrl (if any)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          studentType,
          program,
          avatarUrl
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed.");
      }

      // 3) After successful registration, go to login
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-8">
      <div className="mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
          iStudentsHub · IIT
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Create your student account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign up with your IIT details so we can personalize your onboarding.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl bg-white p-5 shadow-sm shadow-slate-300/80"
      >
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        {/* Full name */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Full name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="Aisha Mensah"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            IIT email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="you@hawk.iit.edu"
          />
        </div>

        {/* Password + Confirm */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Confirm password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Student type */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Student type<span className="text-red-500">*</span>
          </label>
          <select
            value={studentType}
            onChange={(e) => setStudentType(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
          >
            <option value="">Select your student type</option>
            {STUDENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Program */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Program / Major<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            placeholder="M.S. Cyber Forensics & Security"
          />
        </div>

        {/* Avatar upload */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">
            Profile photo (optional)
          </label>
          <div className="flex items-center gap-3">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-red-500/60"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-500">
                No photo
              </div>
            )}
            <div className="flex-1 text-xs text-slate-600">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-xs text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-red-500"
              />
              <p className="mt-1 text-[10px] text-slate-500">
                Square images work best (e.g., 400x400). You can update this
                later in your profile.
              </p>
              {avatarUploading && (
                <p className="mt-0.5 text-[10px] text-red-600">
                  Uploading image…
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || avatarUploading}
          className="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-red-300 hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300"
        >
          {loading ? "Creating your account..." : "Create account"}
        </button>

        <p className="pt-1 text-center text-xs text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-600 hover:text-red-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
