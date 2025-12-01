// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      password,
      studentType,
      program,
      avatarUrl
    } = body as {
      fullName?: string;
      email?: string;
      password?: string;
      studentType?: string;
      program?: string;
      avatarUrl?: string | null;
    };

    // Basic validation
    if (!fullName || !email || !password || !studentType || !program) {
      return NextResponse.json(
        {
          error:
            "Full name, email, password, student type, and program are required."
        },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if student already exists
    const existing = await prisma.student.findUnique({
      where: { email: normalizedEmail }
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await prisma.student.create({
      data: {
        fullName,
        email: normalizedEmail,
        password: hashedPassword, // 🔴 if your field is named `passwordHash`, change this
        studentType,
        program,
        avatarUrl: avatarUrl ?? null
        // isAdmin defaults to false from your Prisma schema
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        studentType: true,
        program: true,
        avatarUrl: true,
        isAdmin: true,
        createdAt: true
      }
    });

    return NextResponse.json(
      {
        message: "Student registered successfully.",
        student
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("⚠️ Register error:", error);
    return NextResponse.json(
      { error: "Failed to register student." },
      { status: 500 }
    );
  }
}
