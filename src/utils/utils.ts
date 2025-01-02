import numeral from "numeral";
import { toast, ToastOptions } from "react-toastify";

/**
 * Determine the range of pages to show in the pagination,
 * @param page current page, 0-based.
 * @param totalPages total pages
 * @returns
 */
export const getPageNumbers = (page: number, totalPages: number): number[] => {
  if (totalPages < 1) {
    return [];
  }

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

/**
 * Return shorten date string
 * @param value
 * @returns
 */
export const getShortenDateString = (value: number) => {
  const date = new Date(value);

  // Extract day and month, and format the string as "DD MMM"
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return `${day} ${month}`;
};

/**
 * Return hh:mm
 * @param value
 * @returns
 */
export const getShortenTime = (value: number) => {
  const date = new Date(value);
  return date.toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit", hour12: false });
};

/**
 * Return shorten number notation formatted string.
 * @param value
 * @returns
 */
export const getShortNumberNotation = (value: number) => {
  // Check if the value is greater than or equal to a million
  if (value >= 1000000) {
    return numeral(value).format("0.00a").toLocaleString(); // Format as millions, billions
  }

  // If the value is very small, format it in scientific notation
  if (value < 0.0001) {
    return numeral(value).format("0.0e+0").toLocaleString();
  }

  // Otherwise, just return the value in normal format
  return value.toLocaleString();
};

/**
 * Encapsulated react-toastify's toast to show notification over application
 * @param content
 * @param type
 * @returns
 */
export const notify = (content: string, type: ToastOptions["type"]) => {
  return toast<string>(content, { type });
};
