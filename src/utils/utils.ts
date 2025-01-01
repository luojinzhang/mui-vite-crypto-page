/**
 * Determine the range of pages to show in the pagination
 * @param page current page
 * @param totalPages total pages
 * @returns 
 */
export const getPageNumbers = (page: number, totalPages: number): number[] => {
    const pageNumbers = [];

    // Show pages near the current page
    // Near first page
    if (page < 4) {
        for (let i = 1; i <= 4; i++) {
            pageNumbers.push(i);
        }
    }
    // In the middle
    else if (page < totalPages - 4) {
        pageNumbers.push(page - 1, page, page + 1);
    }
    // Near last page
    else {
        for (let i = 1; i <= 4; i++) {
            pageNumbers.push(totalPages - 1 - i);
        }
    }

    // Ensure the page numbers are sorted and no duplicates
    return Array.from(new Set(pageNumbers)).sort((a, b) => a - b);
};