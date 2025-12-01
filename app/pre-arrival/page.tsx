// app/pre-arrival/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Card } from "@/components/ui/Card";

type StudentTypeKey = "undergraduate" | "graduate" | "phd" | "exchange" | "default";

type MeResponse = {
  student: {
    id: string;
    fullName: string;
    email: string;
    studentType?: string | null;
    program?: string | null;
  } | null;
};

type PreArrivalContent = {
  label: string;
  subtitle: string;
  heroTag: string;
  visaFocus: string;
  checklistColumns: {
    title: string;
    items: string[];
  }[];
  docsRequired: string[];
  docsRecommended: string[];
  timeline: {
    phase: string;
    when: string;
    items: string[];
  }[];
};

/**
 * 🔧 Content per student type.
 * You can tweak bullets to match exact IIT phrasing later.
 */
const PRE_ARRIVAL_CONTENT: Record<StudentTypeKey, PreArrivalContent> = {
  undergraduate: {
    label: "Undergraduate",
    heroTag: "New international undergraduate at IIT",
    subtitle:
      "As a new international undergraduate, your pre-arrival focuses on final transcripts, housing, health forms, and orientation.",
    visaFocus:
      "Make sure your I-20 information matches your passport, pay the SEVIS fee, and schedule your F-1 visa appointment early.",
    checklistColumns: [
      {
        title: "Before your visa interview",
        items: [
          "Activate your IIT admissions portal and email account.",
          "Review your I-20 carefully (name, date of birth, program, funding).",
          "Pay the SEVIS I-901 fee and keep the receipt.",
          "Collect financial documents that match the I-20 funding.",
          "Book a U.S. embassy/consulate appointment in your country.",
          "Prepare to explain your study plan and intended major at IIT."
        ]
      },
      {
        title: "After visa approval & before departure",
        items: [
          "Confirm on-campus or off-campus housing near Mies Campus.",
          "Submit required immunization/health forms to IIT.",
          "Upload your passport and visa copy to IIT’s international portal (if required).",
          "Register for New Student & International Student Orientation.",
          "Review IIT’s academic calendar and key arrival deadlines.",
          "Plan arrival in Chicago no earlier than 30 days before program start."
        ]
      }
    ],
    docsRequired: [
      "Valid passport (at least 6 months beyond your program end date).",
      "Original I-20 issued by Illinois Institute of Technology.",
      "F-1 visa (in your passport) for entry to the U.S.",
      "SEVIS I-901 fee payment receipt.",
      "IIT admission letter and scholarship/award letters (if any).",
      "Final high school/secondary school transcripts and exam results.",
      "Proof of required vaccinations or official immunization record."
    ],
    docsRecommended: [
      "Copies (printed + digital) of all important documents.",
      "Emergency contact list for family and IIT support offices.",
      "Housing confirmation (lease, residence hall assignment, or hotel).",
      "Bank cards, small amount of U.S. currency, and backup payment method.",
      "Prescription medications plus doctor’s note (if needed)."
    ],
    timeline: [
      {
        phase: "2–4 months before arrival",
        when: "Immediately after admission",
        items: [
          "Review I-20 and pay SEVIS fee.",
          "Schedule your visa interview.",
          "Explore IIT housing options and submit applications."
        ]
      },
      {
        phase: "1–2 months before arrival",
        when: "Visa approved",
        items: [
          "Book flights to Chicago (ORD or MDW).",
          "Finalize housing and roommates.",
          "Complete immunization and health documentation.",
          "Register for orientation and review pre-arrival webinars."
        ]
      },
      {
        phase: "2–3 weeks before arrival",
        when: "Final prep",
        items: [
          "Print and organize all travel documents in one folder.",
          "Plan transportation from airport to IIT campus.",
          "Save campus maps and emergency numbers offline.",
          "Pack for Chicago weather (including winter gear if starting in fall)."
        ]
      }
    ]
  },

  graduate: {
    label: "Graduate",
    heroTag: "International graduate student at IIT",
    subtitle:
      "Graduate students typically juggle program requirements, funding, and research interests. This checklist keeps your pre-arrival organized.",
    visaFocus:
      "Verify that your I-20 or DS-2019 reflects your correct degree level, major, and funding. Coordinate with your department if you have an assistantship.",
    checklistColumns: [
      {
        title: "Before your visa interview",
        items: [
          "Confirm your program and term of entry with Graduate Admissions.",
          "Review your I-20 (F-1) or DS-2019 (J-1) for accuracy.",
          "Pay the SEVIS fee and print the receipt.",
          "Gather proof of funding (assistantship offer, scholarship, bank statements).",
          "Collect degree certificates and official transcripts (with English translation).",
          "Prepare to explain your research/academic goals and ties to home country."
        ]
      },
      {
        title: "After visa approval & before departure",
        items: [
          "Coordinate with your academic department/advisor about course selection.",
          "If you have a TA/RA, confirm start dates and onboarding requirements.",
          "Submit immunization and health forms as required by IIT.",
          "Review IIT graduate orientation and international orientation schedules.",
          "Look into short-term and long-term housing options around Mies Campus.",
          "Plan arrival in time for any mandatory placement tests or department meetings."
        ]
      }
    ],
    docsRequired: [
      "Passport valid at least 6 months beyond your program end date.",
      "I-20 (F-1) or DS-2019 (J-1) issued by Illinois Institute of Technology.",
      "F-1/J-1 visa in passport and SEVIS I-901 fee receipt.",
      "Official university transcripts and degree certificates for all previous degrees.",
      "Proof of funding as listed on your I-20/DS-2019 (assistantship, sponsor, personal funds).",
      "IIT offer/admission letter and (if applicable) assistantship letter.",
      "Required health/immunization documents."
    ],
    docsRecommended: [
      "Curriculum vitae (CV) and copies of publications or project summaries.",
      "Contact information for your graduate program director/advisor.",
      "Copies of housing arrangements, lease, or temporary stay.",
      "Digital and printed copies of all visa and academic documents.",
      "Backup credit card and emergency funds."
    ],
    timeline: [
      {
        phase: "3–5 months before arrival",
        when: "After admission",
        items: [
          "Confirm intent to enroll and program start term.",
          "Review I-20/DS-2019 and pay SEVIS fee.",
          "Schedule visa interview and gather financial documentation."
        ]
      },
      {
        phase: "1–2 months before arrival",
        when: "Visa issued",
        items: [
          "Discuss course registration with your department or advisor.",
          "Arrange housing (short-term or long-term) near campus.",
          "Complete immunization and health clearance requirements.",
          "Register for graduate and international student orientation."
        ]
      },
      {
        phase: "2–3 weeks before arrival",
        when: "Final steps",
        items: [
          "Save syllabi, course catalog links, and academic calendar.",
          "Organize documents for travel and port-of-entry inspection.",
          "Plan arrival transportation to IIT and nearby neighborhoods.",
          "If you have an assistantship, confirm onboarding dates with your department."
        ]
      }
    ]
  },

  phd: {
    label: "Doctoral / PhD",
    heroTag: "Doctoral-level international student",
    subtitle:
      "As a doctoral student, you’ll coordinate closely with your research advisor and department before arrival.",
    visaFocus:
      "Ensure your funding and assistantship details on the I-20/DS-2019 match your official offer. Keep faculty and department contacts handy.",
    checklistColumns: [
      {
        title: "Advisor & program coordination",
        items: [
          "Confirm your primary faculty advisor and research area.",
          "Review assistantship/fellowship offer details and duties.",
          "Discuss expected arrival dates and any early lab onboarding.",
          "Clarify qualifying exam timelines and first-year milestones."
        ]
      },
      {
        title: "Immigration & arrival",
        items: [
          "Check I-20/DS-2019 for correct program and funding.",
          "Pay SEVIS fee and schedule visa appointment.",
          "Complete immunization requirements and submit forms.",
          "Arrange short-term housing if research starts before classes.",
          "Register for orientation and departmental welcome sessions."
        ]
      }
    ],
    docsRequired: [
      "Passport and valid F-1/J-1 visa.",
      "I-20 or DS-2019 with doctoral program details.",
      "SEVIS fee receipt.",
      "Official transcripts and degree certificates for bachelor’s and master’s degrees.",
      "Funding/assistantship offer letters.",
      "Immunization and health records as required by IIT."
    ],
    docsRecommended: [
      "Research proposal or statement of purpose.",
      "Copies of publications or thesis abstracts.",
      "Contact list for advisor, department, and graduate college.",
      "Laptop with backups of research data (if allowed by your previous institution)."
    ],
    timeline: [
      {
        phase: "3–6 months before arrival",
        when: "Planning stage",
        items: [
          "Finalize advisor and research alignment.",
          "Review funding/assistantship package.",
          "Pay SEVIS fee and schedule visa interview."
        ]
      },
      {
        phase: "1–2 months before arrival",
        when: "Visa issued",
        items: [
          "Coordinate with advisor about lab access and expectations.",
          "Complete all health/immunization and insurance requirements.",
          "Arrange housing convenient for late-night lab or research work."
        ]
      },
      {
        phase: "Final 2–3 weeks",
        when: "Pre-departure",
        items: [
          "Organize research materials and essential equipment.",
          "Confirm orientation and department welcome events.",
          "Prepare questions for your first meetings with advisor and committee."
        ]
      }
    ]
  },

  exchange: {
    label: "Exchange / Visiting",
    heroTag: "Exchange or visiting international student",
    subtitle:
      "If you’re coming to IIT for one or two terms as an exchange or visiting student, your pre-arrival emphasizes nomination, learning agreements, and housing.",
    visaFocus:
      "Most exchange students use J-1 visas. Coordinate closely with your home university and IIT’s exchange office for DS-2019 and course approvals.",
    checklistColumns: [
      {
        title: "Before your DS-2019 and visa",
        items: [
          "Confirm nomination from your home university’s international office.",
          "Submit required application documents to IIT by the stated deadlines.",
          "Work on your learning agreement or course preference list.",
          "Provide proof of funding that meets J-1 requirements."
        ]
      },
      {
        title: "Before departure",
        items: [
          "Pay the SEVIS fee and schedule your visa appointment.",
          "Arrange housing for the length of your exchange period.",
          "Review which IIT courses have been approved by your home university.",
          "Register for exchange & international orientation programs."
        ]
      }
    ],
    docsRequired: [
      "Passport and J-1 visa.",
      "DS-2019 issued for exchange/visiting study at IIT.",
      "SEVIS fee receipt.",
      "Proof of funding for the full exchange period.",
      "Learning agreement or course approval form (if required by home university)."
    ],
    docsRecommended: [
      "Transcript from home university.",
      "Contact information for home and host coordinators.",
      "Travel insurance details (if separate from IIT’s health plan)."
    ],
    timeline: [
      {
        phase: "Before nomination & application",
        when: "Home university stage",
        items: [
          "Discuss exchange with your advisor at your home university.",
          "Confirm available terms and course compatibility.",
          "Complete nomination/application steps with your home institution."
        ]
      },
      {
        phase: "After acceptance to IIT",
        when: "Pre-visa stage",
        items: [
          "Submit documents to receive DS-2019.",
          "Pay SEVIS fee and arrange visa interview.",
          "Research housing options and travel plans."
        ]
      },
      {
        phase: "Pre-departure",
        when: "2–4 weeks before arrival",
        items: [
          "Finalize course selections in conversation with IIT coordinators.",
          "Attend pre-departure orientations (if offered by home or host institution).",
          "Organize documents and arrival logistics to Chicago and IIT campus."
        ]
      }
    ]
  },

  default: {
    label: "International student",
    heroTag: "International student at IIT",
    subtitle:
      "This general pre-arrival guide covers core immigration, housing, health, and orientation steps for studying at IIT.",
    visaFocus:
      "Always verify your I-20/DS-2019 matches your personal and program details, and pay your SEVIS fee before scheduling a visa interview.",
    checklistColumns: [
      {
        title: "Immigration & documentation",
        items: [
          "Check I-20/DS-2019 information against your passport.",
          "Pay the SEVIS I-901 fee and save the receipt.",
          "Schedule your visa interview and review required documents.",
          "Know your program start date and earliest entry date."
        ]
      },
      {
        title: "Arrival & settling in",
        items: [
          "Arrange housing near Mies Campus.",
          "Submit immunization and health forms.",
          "Register for orientation and arrival sessions.",
          "Plan airport-to-campus transportation and first-night stay."
        ]
      }
    ],
    docsRequired: [
      "Passport, visa, I-20/DS-2019, SEVIS fee receipt.",
      "Admission letter and financial documentation.",
      "Health/immunization records."
    ],
    docsRecommended: [
      "Emergency contacts, housing confirmations, and copies of important documents."
    ],
    timeline: [
      {
        phase: "Visa stage",
        when: "Immediately after admission",
        items: [
          "Review documents and pay SEVIS fee.",
          "Schedule visa interview."
        ]
      },
      {
        phase: "Pre-departure",
        when: "1–2 months before arrival",
        items: [
          "Finalize housing.",
          "Complete health documentation.",
          "Register for orientation."
        ]
      },
      {
        phase: "Final prep",
        when: "2–3 weeks before arrival",
        items: [
          "Organize travel documents.",
          "Plan airport arrival and local transport.",
          "Review academic calendar and key dates."
        ]
      }
    ]
  }
};

export default function PreArrivalPage() {
  const [me, setMe] = useState<MeResponse["student"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadMe = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (mounted) setLoading(false);
          return;
        }
        const data: MeResponse = await res.json();
        if (mounted) {
          setMe(data.student);
        }
      } catch (err) {
        console.error("Error loading student profile:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadMe();
    return () => {
      mounted = false;
    };
  }, []);

  const normalizedType = (me?.studentType || "").toLowerCase().trim();
  const key: StudentTypeKey =
    normalizedType === "undergraduate"
      ? "undergraduate"
      : normalizedType === "graduate"
      ? "graduate"
      : normalizedType === "phd" || normalizedType === "doctoral"
      ? "phd"
      : normalizedType === "exchange" || normalizedType === "visiting"
      ? "exchange"
      : "default";

  const content = PRE_ARRIVAL_CONTENT[key];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side: navbar + content */}
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-6">
          <div className="space-y-6">
            {/* Hero */}
            <Card className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 text-slate-50">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200">
                    Pre-arrival · {content.label}
                  </p>
                  <h1 className="text-xl font-semibold md:text-2xl">
                    Pre-Arrival Guide for {content.label} Students at IIT
                  </h1>
                  <p className="text-xs text-red-100/90">{content.subtitle}</p>
                  <p className="text-[11px] text-red-100/80">{content.visaFocus}</p>

                  {me && (
                    <p className="mt-1 text-[11px] text-slate-50">
                      Profile detected:{" "}
                      <span className="font-semibold">
                        {me.fullName} ·{" "}
                        {me.studentType
                          ? me.studentType.charAt(0).toUpperCase() +
                            me.studentType.slice(1)
                          : "International student"}
                      </span>
                      {me.program ? ` · ${me.program}` : ""}
                    </p>
                  )}
                </div>

                {!me && !loading && (
                  <div className="rounded-xl bg-black-800/40 p-3 text-[11px] text-red-100/90 ring-1 ring-red-500/40">
                    <p className="font-semibold">
                      Log in or register to see a fully personalized checklist.
                    </p>
                    <p className="mt-1">
                      We&apos;ll tailor your pre-arrival steps to your student type
                      (undergraduate, graduate, PhD, or exchange).
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Link
                        href="/login"
                        className="rounded-lg bg-red-500 px-3 py-1 font-semibold text-white hover:bg-red-400"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="rounded-lg border border-red-300 px-3 py-1 font-semibold text-red-100 hover:bg-red-800/40"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Checklist + Timeline */}
            <section className="grid gap-4 xl:grid-cols-[2fr,1.5fr]">
              {/* Checklist board */}
              <Card className="bg-slate-200/80 text-slate-800">
                <h2 className="mb-2 text-sm font-semibold text-slate-800">
                  Key pre-arrival steps for {content.label} students
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {content.checklistColumns.map((col) => (
                    <div key={col.title} className="space-y-1 rounded-xl bg-slate-350/80 p-3 ring-1 ring-slate-700/70">
                      <p className="text-[12px] font-semibold text-slate-800">
                        {col.title}
                      </p>
                      <ul className="mt-1 space-y-1 text-[11px] text-slate-800">
                        {col.items.map((item) => (
                          <li key={item} className="flex gap-1.5">
                            <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Timeline */}
              <Card className="bg-slate-950/80 text-slate-50">
                <h2 className="mb-2 text-sm font-semibold text-slate-50">
                  Suggested pre-arrival timeline
                </h2>
                <ol className="space-y-3 text-[11px]">
                  {content.timeline.map((phase) => (
                    <li
                      key={phase.phase}
                      className="rounded-xl bg-slate-900/80 p-3 ring-1 ring-slate-700/70"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="text-[11px] font-semibold text-red-200">
                          {phase.phase}
                        </p>
                        <p className="text-[10px] text-slate-400">{phase.when}</p>
                      </div>
                      <ul className="mt-1 space-y-1 text-[11px] text-slate-200">
                        {phase.items.map((item) => (
                          <li key={item} className="flex gap-1.5">
                            <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </Card>
            </section>

            {/* Document center (dynamic by type) */}
            <Card className="bg-slate-200/80 text-slate-50">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">
                    Documents to organize before you travel
                  </h2>
                  <p className="text-[11px] text-slate-800">
                    Keep both printed and digital copies of everything. Store them in
                    your carry-on bag — not in checked luggage.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-200/80 p-3 ring-1 ring-slate-700/70">
                  <p className="text-[12px] font-bold text-red-950">
                    Required documents for {content.label} students
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-800">
                    {content.docsRequired.map((doc) => (
                      <li key={doc} className="flex gap-1.5">
                        <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-200/80 p-3 ring-1 ring-slate-700/70">
                  <p className="text-[12px] font-semibold text-red-950">
                    Strongly recommended to bring
                  </p>
                  <ul className="mt-2 space-y-1 text-[11px] text-slate-800">
                    {content.docsRecommended.map((doc) => (
                      <li key={doc} className="flex gap-1.5">
                        <span className="mt-[3px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-3 text-[10px] font-semibold text-red-700">
                NB: Always double-check IIT&apos;s official communications, your
                admission portal, and international office emails for the latest
                requirements, as immigration and health policies can change.
              </p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
