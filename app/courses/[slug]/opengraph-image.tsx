import { ImageResponse } from "next/og";
import { getCourse, levelNames } from "@/data/courses";

export const runtime = "edge";
export const alt = "Lingua course preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function CourseOpengraphImage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);

  const title = course ? course.title : "Language course";
  const meta = course
    ? `${course.language} · ${course.level} ${levelNames[course.level]} · ${course.durationWeeks} weeks · ${course.format === "online" ? "Online" : "In person"}`
    : "Lingua Language School";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1e1b4b",
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -100,
            width: 460,
            height: 460,
            borderRadius: 9999,
            backgroundColor: "#6366f1",
            opacity: 0.6,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 9999,
            backgroundColor: "#a855f7",
            opacity: 0.45,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: 9999,
              backgroundColor: "#4f46e5",
              fontSize: 24,
              fontWeight: 800,
              color: "#ffffff",
              display: "flex",
            }}
          >
            {course ? `${course.level} · ${levelNames[course.level]}` : "Lingua"}
          </div>
          <div style={{ fontSize: 26, color: "#c7d2fe", display: "flex" }}>Lingua Language School</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ fontSize: 84, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#e0e7ff", marginTop: 28 }}>{meta}</div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#a5b4fc" }}>
          <div style={{ display: "flex" }}>Free 45-minute trial lesson</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>lingua.example.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
