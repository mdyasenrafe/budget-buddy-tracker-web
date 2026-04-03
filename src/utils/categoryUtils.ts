/**
 * Sorts an array of objects containing a 'label' property alphabetically,
 * but ensures that the item with label "Other" is always at the end.
 *
 * @param categories - Array of categories to sort.
 * @returns A new sorted array.
 */
export const sortCategoriesWithOtherLast = <T extends { label: string }>(
  categories: T[]
): T[] => {
  return [...categories].sort((a, b) => {
    const isAOther = a.label.toLowerCase().includes("other");
    const isBOther = b.label.toLowerCase().includes("other");

    if (isAOther && !isBOther) return 1;
    if (!isAOther && isBOther) return -1;

    // Default alphabetical sorting
    return a.label.localeCompare(b.label);
  });
};
