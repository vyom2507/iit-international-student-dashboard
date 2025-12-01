// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "student_session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 🔍 Fetch the student (no select, we want all fields)
    const student = await prisma.student.findUnique({
      where: { email: normalizedEmail }
    });

    if (!student) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // ✅ Try multiple possible password fields, to be safe
    const storedHash =
      (student as any).password ||
      (student as any).passwordHash ||
      (student as any).hashedPassword;

    if (typeof storedHash !== "string" || storedHash.length === 0) {
      console.error(
        "Login error: student has no password hash stored. Keys:",
        Object.keys(student as any)
      );
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, storedHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.AUTH_JWT_SECRET;
    if (!jwtSecret) {
      console.error("Missing AUTH_JWT_SECRET env var");
      return NextResponse.json(
        { error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    // 🪪 Issue JWT
    const token = jwt.sign(
      {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        isAdmin: (student as any).isAdmin ?? false
      },
      jwtSecret,
      {
        expiresIn: "7d"
      }
    );

    // 🍪 Set cookie
    const cookieStore = cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      message: "Login successful.",
      student: {
        id: student.id,
        fullName: student.fullName,
        email: student.email,
        studentType: (student as any).studentType,
        program: (student as any).program,
        avatarUrl: (student as any).avatarUrl,
        isAdmin: (student as any).isAdmin
      }
    });
  } catch (error) {
    console.error("⚠️ Login error:", error);
    return NextResponse.json(
      { error: "Failed to login. Please try again." },
      { status: 500 }
    );
  }
}
