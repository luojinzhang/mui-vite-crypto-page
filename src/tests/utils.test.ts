import { describe, expect, it } from "vitest";
import { utils } from "../utils";

describe("getPageNumbers functionality test", () => {
    const totalPages = 10;
    const firstIndex = 0;
    const lastIndex = totalPages - 1;

    it("should return correct pages numbers to show in pagination when current page is 1", async () => {
        const pages = utils.getPageNumbers(0, totalPages);
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
})