import React, { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FALLBACK_INSIGHTS, InsightPost } from "@/types/insights";
import "./InsideNexovate.css";

/* ─── CORNER BRACKETS COMPONENT ─────────────────────────────────────────── */

const CornerBrackets = memo(() => (
  <>
    <span className="inx-bracket inx-bracket-tl" aria-hidden="true" />
    <span className="inx-bracket inx-bracket-tr" aria-hidden="true" />
    <span className="inx-bracket inx-bracket-bl" aria-hidden="true" />
    <span className="inx-bracket inx-bracket-br" aria-hidden="true" />
  </>
));
CornerBrackets.displayName = "CornerBrackets";

/* ─── HOVER OVERLAY & INTERACTION CIRCLE ────────────────────────────────── */

const VideoInteractionOverlay = memo(() => (
  <>
    <div className="inx-overlay" aria-hidden="true" />
    <div className="inx-plus-circle" aria-hidden="true">
      <span>+</span>
    </div>
  </>
));
VideoInteractionOverlay.displayName = "VideoInteractionOverlay";

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */

export const InsideNexovate: React.FC = () => {
  const reducedMotion = useReducedMotion() ?? false;

  const featuredPost = FALLBACK_INSIGHTS.find((p) => p.type === "featured") || FALLBACK_INSIGHTS[0];
  const standardPosts = FALLBACK_INSIGHTS.filter((p) => p.type === "standard").sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="insights" className="inx-section" aria-label="Inside Nexovate Editorial Insights">
      <div className="inx-container">
        
        {/* ══ HEADER ══════════════════════════════════════════════════════ */}
        <header className="inx-header">
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inx-badge-wrap"
          >
            <span className="inx-eyebrow-badge">INSIGHTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="inx-heading"
          >
            Inside Nexovate
          </motion.h2>

          <div className="inx-header-bottom">
            <motion.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="inx-subtitle"
            >
              Explore the ideas, skills, projects, and career insights shaping the next generation of technology professionals.
            </motion.p>

            <motion.button
              type="button"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="inx-cta-btn"
              onClick={() => {
                const el = document.getElementById("programs");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              aria-label="Explore all insights"
            >
              <span>Explore all insights</span>
              <ArrowUpRight className="inx-cta-icon" aria-hidden="true" />
            </motion.button>
          </div>
        </header>

        {/* ══ FEATURED STORY CARD (2-Column Grid) ═════════════════════════ */}
        {featuredPost && (
          <motion.article
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="inx-featured-card"
            tabIndex={0}
            role="article"
            aria-label={`Featured: ${featuredPost.title}`}
          >
            {/* Visual Container */}
            <div className="inx-featured-visual">
              <video
                src={featuredPost.media_url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="inx-video"
                aria-label={featuredPost.title}
              />
              <CornerBrackets />
              <VideoInteractionOverlay />
            </div>

            {/* Content Container */}
            <div className="inx-featured-content">
              {featuredPost.badge && (
                <span className="inx-featured-badge">{featuredPost.badge}</span>
              )}

              <h3 className="inx-featured-title">{featuredPost.title}</h3>

              {featuredPost.description && (
                <p className="inx-featured-desc">{featuredPost.description}</p>
              )}

              <footer className="inx-featured-footer">
                {featuredPost.author && (
                  <span className="inx-author">{featuredPost.author}</span>
                )}
                <span
                  className="inx-category-badge"
                  style={{ backgroundColor: featuredPost.category_color }}
                >
                  {featuredPost.category}
                </span>
              </footer>
            </div>
          </motion.article>
        )}

        {/* ══ 3-COLUMN SUPPORTING INSIGHT GRID ════════════════════════════ */}
        <div className="inx-grid">
          {standardPosts.map((post: InsightPost, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 + index * 0.08 }}
              className="inx-card"
              tabIndex={0}
              role="article"
              aria-label={post.title}
            >
              {/* Card Video Visual with Corner Brackets & Hover Overlay */}
              <div className="inx-card-visual">
                <video
                  src={post.media_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="inx-video"
                  aria-label={post.title}
                />
                <CornerBrackets />
                <VideoInteractionOverlay />
              </div>

              {/* Title & Category Badge Row */}
              <div className="inx-card-meta">
                <h3 className="inx-card-title">{post.title}</h3>
                <span
                  className="inx-category-badge"
                  style={{ backgroundColor: post.category_color }}
                >
                  {post.category}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InsideNexovate;
