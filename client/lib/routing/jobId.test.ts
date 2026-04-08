import { isUuidV4, normalizeJobId } from "./jobId";

describe("normalizeJobId", () => {
    it("returns trimmed job id when valid", () => {
        expect(normalizeJobId("  abc123  ")).toBe("abc123");
    });

    it("returns null for empty string", () => {
        expect(normalizeJobId("")).toBeNull();
        expect(normalizeJobId("   ")).toBeNull();
    });

    it("returns null for nullish non-string values", () => {
        expect(normalizeJobId(null)).toBeNull();
        expect(normalizeJobId(undefined)).toBeNull();
    });

    it("returns null for literal 'undefined'/'null'", () => {
        expect(normalizeJobId("undefined")).toBeNull();
        expect(normalizeJobId("null")).toBeNull();
    });
});

describe("isUuidV4", () => {
    it("returns true for a UUID v4", () => {
        expect(isUuidV4("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    });

    it("returns false for non-UUID values", () => {
        expect(isUuidV4("abc123")).toBe(false);
        expect(isUuidV4("550e8400-e29b-11d4-a716-446655440000")).toBe(false);
    });
});
