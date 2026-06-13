import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  test("returns the API key from a valid authorization header", () => {
    const headers = { authorization: "ApiKey my-secret-key" };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization header has wrong scheme", () => {
    const headers = { authorization: "Bearer some-token" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header has no value after scheme", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header is empty", () => {
    const headers = { authorization: "" };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the key when extra spaces produce additional segments", () => {
    const headers = { authorization: "ApiKey key1 extra" };
    expect(getAPIKey(headers)).toBe("key1");
  });
});
