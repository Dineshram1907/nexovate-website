import { describe, it, expect } from "vitest";
import { FAQ_ITEMS } from "./NexovateFaqSection";

describe("Nexovate FAQ Data & Schema Validation", () => {
  it("should contain exactly 12 verified search-intent questions", () => {
    expect(FAQ_ITEMS).toHaveLength(12);
  });

  it("should have unique IDs and non-empty questions and answers", () => {
    const ids = new Set<string>();
    for (const item of FAQ_ITEMS) {
      expect(item.id).toBeTruthy();
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);

      expect(item.question.trim().length).toBeGreaterThan(5);
      expect(item.answer.trim().length).toBeGreaterThan(20);
    }
  });

  it("should generate valid Schema.org FAQPage JSON-LD", () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://nexovate.org.in/#faq",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const jsonString = JSON.stringify(schema);
    const parsed = JSON.parse(jsonString);

    expect(parsed["@type"]).toBe("FAQPage");
    expect(parsed.mainEntity).toHaveLength(12);
    expect(parsed.mainEntity[0]["@type"]).toBe("Question");
    expect(parsed.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });
});
