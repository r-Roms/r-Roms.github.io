export const parseBrand = (s) => {
    s.scanner.shiftUntilNonWhitespace();
    const brandName = s.scanner.shiftUntilNextTerminator();
    s.root = s.root.brand(brandName);
};
