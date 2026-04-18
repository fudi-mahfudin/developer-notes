import { describe, it, expect } from "vitest";
import {
  canAttendAllMeetings,
  minMeetingRooms,
  mergeBusyIntervals,
  freeSlots,
  isValidIntervals,
} from "./meeting-rooms-schedule.js";

describe("Topik 80 — meeting rooms schedule", () => {
  it("canAttendAllMeetings", () => {
    expect(canAttendAllMeetings([[0, 5], [5, 8]])).toBe(true);
    expect(canAttendAllMeetings([[0, 5], [4, 8]])).toBe(false);
  });

  it("minMeetingRooms", () => {
    expect(minMeetingRooms([[0, 30], [5, 10], [15, 20]])).toBe(2);
  });

  it("merge & free slots", () => {
    expect(mergeBusyIntervals([[1, 3], [2, 4], [6, 7]])).toEqual([[1, 4], [6, 7]]);
    expect(freeSlots([[1, 3], [5, 6]], 0, 7)).toEqual([[0, 1], [3, 5], [6, 7]]);
  });

  it("valid intervals", () => {
    expect(isValidIntervals([[1, 2], [2, 2]])).toBe(true);
    expect(isValidIntervals([[3, 1]])).toBe(false);
  });
});

