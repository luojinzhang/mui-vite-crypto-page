import { describe, expect, it } from "vitest";
import { utils } from "../utils";

describe("getPageNumbers functionality test", () => {
  const totalPages = 10;
  const firstIndex = 0;
  const lastIndex = totalPages - 1;

  it("should return correct pages numbers to show in pagination when current page is 1", async () => {
    const pages = utils.getPageNumbers(firstIndex, totalPages);
    const expectedPages = [1, 2, 3, 4];
    expect(pages).toEqual(expectedPages);
  });

  it("should return correct pages numbers to show in pagination when current page is last page", async () => {
    const pages = utils.getPageNumbers(lastIndex, totalPages);
    const expectedPages = [5, 6, 7, 8];
    expect(pages).toEqual(expectedPages);
  });

  it("should return correct pages numbers to show in pagination when current page is in the middle", async () => {
    const pages = utils.getPageNumbers(4, totalPages);
    const expectedPages = [3, 4, 5];
    expect(pages).toEqual(expectedPages);
  });

  it("should return correct pages numbers to show in pagination when current page is in the near first", async () => {
    const pages = utils.getPageNumbers(3, totalPages);
    const expectedPages = [1, 2, 3, 4];
    expect(pages).toEqual(expectedPages);
  });

  it("should return correct pages numbers to show in pagination when current page is in the near last", async () => {
    const pages = utils.getPageNumbers(6, totalPages);
    const expectedPages = [5, 6, 7, 8];
    expect(pages).toEqual(expectedPages);
  });
});

describe("getShortenDateString functionality test", () => {
  it("should return correct shorten date in `dd mmm`", async () => {
    const time = new Date("2024-12-17T03:24:00");
    const expectedDate = "17 Dec";
    const timestamp = time.getTime();
    const actualDate = utils.getShortenDateString(timestamp);
    expect(actualDate).toEqual(expectedDate);
  });
});

describe("getShortenTime functionality test", () => {
  it("should return correct shorten time format in hh:mm", async () => {
    const time = new Date("2024-12-17T03:24:00");
    const expectedDate = "03:24";
    const timestamp = time.getTime();
    const actualDate = utils.getShortenTime(timestamp);
    expect(actualDate).toEqual(expectedDate);
  });
});

describe("getShortNumberNotation functionality test", () => {
  it("should return correct shorten number with notation for very big number", async () => {
    const bigNum = 1200000;
    const expectedResult = "1.20m";
    const actualResult = utils.getShortNumberNotation(bigNum);
    expect(actualResult).toEqual(expectedResult);
  });

  it("should return correct shorten number with notation for very small number", async () => {
    const smallNum = 0.00000016;
    const expectedResult = "1.6e-7";
    const actualResult = utils.getShortNumberNotation(smallNum);
    expect(actualResult).toEqual(expectedResult);
  });

  it("should return same (formatted) number for a normal length number", async () => {
    const normal = 12300;
    const expectedResult = "12,300";
    const actualResult = utils.getShortNumberNotation(normal);
    expect(actualResult).toEqual(expectedResult);
  });
});
